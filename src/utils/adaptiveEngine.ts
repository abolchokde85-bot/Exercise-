import {
  ExerciseId,
  ExerciseStatusState,
  UserFeedbackInput,
  StrictExerciseDef
} from '../types';
import { PROTOCOL_EXERCISES } from '../data/exercises';

export interface FeedbackEvaluationResult {
  updatedState: ExerciseStatusState;
  actionSummaryFa: string;
  actionType: 'upgraded' | 'excluded_7_days' | 'switched_to_seated' | 'maintained';
  painAggravationMessage: string;
  difficultyMessage: string;
  alertBadge?: string;
  alertColor?: string;
}

export function evaluateExerciseFeedback(
  currentState: ExerciseStatusState,
  exerciseDef: StrictExerciseDef,
  feedback: UserFeedbackInput,
  currentWeek: number,
  currentDay: number
): FeedbackEvaluationResult {
  const { painAggravation, difficultyScore } = feedback;
  const maxLevels = exerciseDef.levels.length;

  let newConsecutiveSeverePain = currentState.consecutiveSeverePainDays || 0;
  let newConsecutiveUnderFive = currentState.consecutiveUnderFiveDifficultyDays || 0;
  let newLevel = currentState.currentLevel || 1;
  let isExcluded = currentState.isExcluded || false;
  let exclusionDaysRemaining = currentState.exclusionDaysRemaining || 0;
  let isUsingAlternativeSeated = currentState.isUsingAlternativeSeated || false;

  let actionType: 'upgraded' | 'excluded_7_days' | 'switched_to_seated' | 'maintained' = 'maintained';
  let actionSummaryFa = 'برنامه به روال عادی ادامه می‌یابد.';
  let painAggravationMessage = '';
  let difficultyMessage = '';
  let alertBadge = 'روال عادی';
  let alertColor = 'bg-teal-50 text-teal-800 border-teal-200';

  // --- RULE 1: سوال اول - تشدید درد ---
  // گزینه‌ها: ۱) خیر ۲) بله خفیف ۳) بله شدید
  if (painAggravation === 'severe') {
    newConsecutiveSeverePain += 1;
    if (newConsecutiveSeverePain >= 2) {
      if (exerciseDef.id === 'hamstring_stretch') {
        // Exception for hamstring stretch: switch to seated alternative
        isUsingAlternativeSeated = true;
        actionType = 'switched_to_seated';
        actionSummaryFa = 'با توجه به ثبت ۲ روز متوالی «بله شدید»، حرکت کشش همسترینگ با حالت نشسته جایگزین گردید.';
        painAggravationMessage = 'تغییر وضعیت به کشش نشسته همسترینگ جهت کاهش تنش روی عصب سیاتیک و گودی کمر.';
        alertBadge = 'جایگزینی با حالت نشسته';
        alertColor = 'bg-amber-50 text-amber-800 border-amber-300';
      } else {
        // Exercises 1-6: Excluded for 7 days
        isExcluded = true;
        exclusionDaysRemaining = 7;
        actionType = 'excluded_7_days';
        actionSummaryFa = `با توجه به ثبت ۲ روز متوالی «بله شدید»، این حرکت طبق پروتکل بالینی به مدت ۷ روز از برنامه روزانه شما حذف شد.`;
        painAggravationMessage = 'حذف موقت به مدت ۷ روز جهت التیام بافت و جلوگیری از تحریک مزمن ریشه‌های عصبی.';
        alertBadge = 'حذف موقت ۷ روزه';
        alertColor = 'bg-rose-50 text-rose-800 border-rose-300';
      }
    } else {
      actionSummaryFa = 'پاسخ «بله شدید» در ۱ روز ثبت شد؛ در صورت تکرار در روز بعد، قانون تعدیل اعمال خواهد شد.';
      painAggravationMessage = 'یک روز تشدید درد شدید ثبت شد. لطفاً به تنفس و قرارگیری صحیح دقت نمایید.';
    }
  } else {
    // Answer is 'no' or 'mild'
    newConsecutiveSeverePain = 0;
    painAggravationMessage = painAggravation === 'no'
      ? 'پاسخ «خیر» (بدون تشدید درد) ثبت شد. تمرین برای شما ایمن و مناسب است.'
      : 'پاسخ «بله خفیف» ثبت شد؛ طبق دستورالعمل برنامه بدون وقفه ادامه می‌یابد.';
  }

  // --- RULE 2: سوال دوم - نمره سختی از ۱ تا ۱۰ ---
  // «در صورتیکه پاسخ ۳ روز متوالی زیر ۵ باشد حرکت به سطح بالاتر ارتقا داده میشود»
  if (difficultyScore < 5) {
    newConsecutiveUnderFive = (currentState.consecutiveUnderFiveDifficultyDays || 0) + 1;

    if (newConsecutiveUnderFive >= 3) {
      if (exerciseDef.hasProgression && newLevel < maxLevels) {
        newLevel += 1;
        newConsecutiveUnderFive = 0; // Reset counter for new level
        if (actionType !== 'excluded_7_days' && actionType !== 'switched_to_seated') {
          actionType = 'upgraded';
          actionSummaryFa = `پاسخ ۳ روز متوالی زیر ۵ (نمره ${difficultyScore}) بود؛ حرکت به سطح ${newLevel} (${exerciseDef.levels[newLevel - 1].title}) ارتقا داده شد!`;
          alertBadge = `ارتقا به سطح ${newLevel}`;
          alertColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
        }
        difficultyMessage = `ارتقای سطح: انطباق کامل عضلانی و سهولت در اجرا تثبیت شد. سطح ${newLevel} برای جلسات بعد فعال شد.`;
      } else if (!exerciseDef.hasProgression) {
        difficultyMessage = `پاسخ ۳ روز متوالی زیر ۵ ثبت شد (این حرکت بدون پیشرفت طراحی شده و در همین سطح تثبیت می‌شود).`;
      } else {
        difficultyMessage = `شما در بالاترین سطح این حرکت با تسلط کامل هستید.`;
      }
    } else {
      difficultyMessage = `نمره سختی زیر ۵ (${newConsecutiveUnderFive} روز متوالی از ۳ روز مورد نیاز برای ارتقای سطح).`;
    }
  } else {
    // difficultyScore >= 5
    newConsecutiveUnderFive = 0;
    difficultyMessage = `نمره سختی ${difficultyScore} از ۱۰ ثبت شد؛ سطح حرکت تا تسلط بیشتر حفظ می‌شود.`;
  }

  const logEntry = {
    date: new Date().toLocaleDateString('fa-IR'),
    dayNumber: currentDay,
    weekNumber: currentWeek,
    painAggravation,
    difficultyScore,
    levelUsed: currentState.currentLevel
  };

  const updatedState: ExerciseStatusState = {
    ...currentState,
    currentLevel: newLevel,
    consecutiveSeverePainDays: newConsecutiveSeverePain,
    consecutiveUnderFiveDifficultyDays: newConsecutiveUnderFive,
    isExcluded,
    exclusionDaysRemaining,
    isUsingAlternativeSeated,
    historyLogs: [...(currentState.historyLogs || []), logEntry]
  };

  return {
    updatedState,
    actionSummaryFa,
    actionType,
    painAggravationMessage,
    difficultyMessage,
    alertBadge,
    alertColor
  };
}

export function decrementExclusionDaysForNewSession(
  statuses: Record<ExerciseId, ExerciseStatusState>
): Record<ExerciseId, ExerciseStatusState> {
  const updated: Record<ExerciseId, ExerciseStatusState> = { ...statuses };

  for (const id of Object.keys(updated) as ExerciseId[]) {
    const item = { ...updated[id] };
    if (item.isExcluded && item.exclusionDaysRemaining) {
      const remaining = item.exclusionDaysRemaining - 1;
      if (remaining <= 0) {
        item.isExcluded = false;
        item.exclusionDaysRemaining = 0;
        item.consecutiveSeverePainDays = 0; // reset pain counter
      } else {
        item.exclusionDaysRemaining = remaining;
      }
      updated[id] = item;
    }
  }

  return updated;
}
