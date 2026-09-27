import { AppProtocolState, ExerciseId, ExerciseStatusState } from '../types';
import { PROTOCOL_EXERCISES } from './exercises';

export function createDefaultExerciseStatuses(): Record<ExerciseId, ExerciseStatusState> {
  const statuses: Partial<Record<ExerciseId, ExerciseStatusState>> = {};

  for (const ex of PROTOCOL_EXERCISES) {
    statuses[ex.id] = {
      exerciseId: ex.id,
      currentLevel: 1,
      consecutiveSeverePainDays: 0,
      consecutiveUnderFiveDifficultyDays: 0,
      isExcluded: false,
      exclusionDaysRemaining: 0,
      isUsingAlternativeSeated: false,
      historyLogs: []
    };
  }

  return statuses as Record<ExerciseId, ExerciseStatusState>;
}

export const INITIAL_PROTOCOL_STATE: AppProtocolState = {
  currentWeek: 1,
  currentDayInWeek: 1,
  totalSessionsCompleted: 4,
  startDate: new Date().toLocaleDateString('fa-IR'),
  exerciseStatuses: {
    deep_core: {
      exerciseId: 'deep_core',
      currentLevel: 2,
      consecutiveSeverePainDays: 0,
      consecutiveUnderFiveDifficultyDays: 2,
      isExcluded: false,
      exclusionDaysRemaining: 0,
      isUsingAlternativeSeated: false,
      historyLogs: [
        { date: '۱۴۰۳/۰۷/۰۱', dayNumber: 1, weekNumber: 1, painAggravation: 'no', difficultyScore: 3, levelUsed: 1 },
        { date: '۱۴۰۳/۰۷/۰۲', dayNumber: 2, weekNumber: 1, painAggravation: 'no', difficultyScore: 3, levelUsed: 1 },
        { date: '۱۴۰۳/۰۷/۰۳', dayNumber: 3, weekNumber: 1, painAggravation: 'no', difficultyScore: 4, levelUsed: 1 }
      ]
    },
    mcgill_curlup: {
      exerciseId: 'mcgill_curlup',
      currentLevel: 1,
      consecutiveSeverePainDays: 0,
      consecutiveUnderFiveDifficultyDays: 1,
      isExcluded: false,
      exclusionDaysRemaining: 0,
      isUsingAlternativeSeated: false,
      historyLogs: [
        { date: '۱۴۰۳/۰۷/۰۱', dayNumber: 1, weekNumber: 1, painAggravation: 'mild', difficultyScore: 6, levelUsed: 1 },
        { date: '۱۴۰۳/۰۷/۰۲', dayNumber: 2, weekNumber: 1, painAggravation: 'no', difficultyScore: 4, levelUsed: 1 }
      ]
    },
    bird_dog: {
      exerciseId: 'bird_dog',
      currentLevel: 1,
      consecutiveSeverePainDays: 0,
      consecutiveUnderFiveDifficultyDays: 2,
      isExcluded: false,
      exclusionDaysRemaining: 0,
      isUsingAlternativeSeated: false,
      historyLogs: [
        { date: '۱۴۰۳/۰۷/۰۱', dayNumber: 1, weekNumber: 1, painAggravation: 'no', difficultyScore: 3, levelUsed: 1 },
        { date: '۱۴۰۳/۰۷/۰۲', dayNumber: 2, weekNumber: 1, painAggravation: 'no', difficultyScore: 4, levelUsed: 1 }
      ]
    },
    side_plank: {
      exerciseId: 'side_plank',
      currentLevel: 1,
      consecutiveSeverePainDays: 0,
      consecutiveUnderFiveDifficultyDays: 0,
      isExcluded: false,
      exclusionDaysRemaining: 0,
      isUsingAlternativeSeated: false,
      historyLogs: [
        { date: '۱۴۰۳/۰۷/۰۱', dayNumber: 1, weekNumber: 1, painAggravation: 'mild', difficultyScore: 7, levelUsed: 1 }
      ]
    },
    cobra_pose: {
      exerciseId: 'cobra_pose',
      currentLevel: 1,
      consecutiveSeverePainDays: 0,
      consecutiveUnderFiveDifficultyDays: 3,
      isExcluded: false,
      exclusionDaysRemaining: 0,
      isUsingAlternativeSeated: false,
      historyLogs: [
        { date: '۱۴۰۳/۰۷/۰۱', dayNumber: 1, weekNumber: 1, painAggravation: 'no', difficultyScore: 2, levelUsed: 1 }
      ]
    },
    glute_stretch: {
      exerciseId: 'glute_stretch',
      currentLevel: 1,
      consecutiveSeverePainDays: 0,
      consecutiveUnderFiveDifficultyDays: 2,
      isExcluded: false,
      exclusionDaysRemaining: 0,
      isUsingAlternativeSeated: false,
      historyLogs: [
        { date: '۱۴۰۳/۰۷/۰۱', dayNumber: 1, weekNumber: 1, painAggravation: 'no', difficultyScore: 3, levelUsed: 1 }
      ]
    },
    hamstring_stretch: {
      exerciseId: 'hamstring_stretch',
      currentLevel: 1,
      consecutiveSeverePainDays: 0,
      consecutiveUnderFiveDifficultyDays: 1,
      isExcluded: false,
      exclusionDaysRemaining: 0,
      isUsingAlternativeSeated: false,
      historyLogs: [
        { date: '۱۴۰۳/۰۷/۰۱', dayNumber: 1, weekNumber: 1, painAggravation: 'no', difficultyScore: 4, levelUsed: 1 }
      ]
    }
  },
  workoutLogs: [
    {
      id: 'log-1',
      date: '۳ روز پیش',
      weekNumber: 1,
      dayNumber: 1,
      isRestDay: false,
      completedAt: '۱۴۰۳/۰۷/۰۱',
      exerciseFeedbacks: [
        { exerciseId: 'deep_core', painAggravation: 'no', difficultyScore: 3, levelUsed: 1, actionResult: 'ادامه عادی' },
        { exerciseId: 'mcgill_curlup', painAggravation: 'mild', difficultyScore: 6, levelUsed: 1, actionResult: 'ادامه عادی' }
      ]
    },
    {
      id: 'log-2',
      date: '۲ روز پیش',
      weekNumber: 1,
      dayNumber: 2,
      isRestDay: false,
      completedAt: '۱۴۰۳/۰۷/۰۲',
      exerciseFeedbacks: [
        { exerciseId: 'deep_core', painAggravation: 'no', difficultyScore: 3, levelUsed: 1, actionResult: 'ادامه عادی' }
      ]
    },
    {
      id: 'log-3',
      date: 'دیروز',
      weekNumber: 1,
      dayNumber: 3,
      isRestDay: false,
      completedAt: '۱۴۰۳/۰۷/۰۳',
      exerciseFeedbacks: [
        { exerciseId: 'deep_core', painAggravation: 'no', difficultyScore: 4, levelUsed: 1, actionResult: 'ارتقا به سطح ۲' }
      ]
    }
  ],
  patientProfile: {
    name: 'آنا کلر',
    age: 38,
    medicalHistory: 'سابقه بیرون‌زدگی خفیف دیسک مهره‌های L4-L5، احساس خشکی و گرفتگی در عضلات کمر هنگام نشستن طولانی‌مدت در محیط کار.',
    painLocation: 'ناحیه لومبار (پایین کمر)',
    notes: 'توصیه فیزیوتراپیست: تقویت عضلات عمقی شکم و ثبات‌دهنده‌های ستون فقرات بدون خم شدن شدید مهره‌ها.',
    startDate: '۱۴۰۳/۰۷/۰۱'
  },
  exerciseHistory: [
    {
      id: 'hist-1',
      timestamp: Date.now() - 3 * 86400000,
      date: '۱۴۰۳/۰۷/۰۱',
      time: '۰۹:۳۵',
      exerciseId: 'deep_core',
      exerciseTitleFa: 'فعال‌سازی عضلات عمقی شکم',
      level: 1,
      difficultyScore: 3,
      painLevel: 'no',
      painLevelFa: 'بدون درد',
      weekNumber: 1,
      dayNumber: 1,
      holdSeconds: 10,
      reps: 6
    },
    {
      id: 'hist-2',
      timestamp: Date.now() - 3 * 86400000 + 300000,
      date: '۱۴۰۳/۰۷/۰۱',
      time: '۰۹:۴۰',
      exerciseId: 'mcgill_curlup',
      exerciseTitleFa: 'کرل‌آپ مک‌گیل اصلاح‌شده',
      level: 1,
      difficultyScore: 6,
      painLevel: 'mild',
      painLevelFa: 'درد خفیف',
      weekNumber: 1,
      dayNumber: 1,
      holdSeconds: 8,
      reps: 4
    },
    {
      id: 'hist-3',
      timestamp: Date.now() - 2 * 86400000,
      date: '۱۴۰۳/۰۷/۰۲',
      time: '۱۰:۱۵',
      exerciseId: 'deep_core',
      exerciseTitleFa: 'فعال‌سازی عضلات عمقی شکم',
      level: 1,
      difficultyScore: 3,
      painLevel: 'no',
      painLevelFa: 'بدون درد',
      weekNumber: 1,
      dayNumber: 2,
      holdSeconds: 10,
      reps: 6
    },
    {
      id: 'hist-4',
      timestamp: Date.now() - 2 * 86400000 + 300000,
      date: '۱۴۰۳/۰۷/۰۲',
      time: '۱۰:۲۲',
      exerciseId: 'bird_dog',
      exerciseTitleFa: 'حرکت پرنده-سگ (سگ پرنده)',
      level: 1,
      difficultyScore: 4,
      painLevel: 'no',
      painLevelFa: 'بدون درد',
      weekNumber: 1,
      dayNumber: 2,
      holdSeconds: 8,
      reps: 4
    },
    {
      id: 'hist-5',
      timestamp: Date.now() - 86400000,
      date: '۱۴۰۳/۰۷/۰۳',
      time: '۰۹:۱۸',
      exerciseId: 'deep_core',
      exerciseTitleFa: 'فعال‌سازی عضلات عمقی شکم',
      level: 2,
      difficultyScore: 4,
      painLevel: 'no',
      painLevelFa: 'بدون درد',
      weekNumber: 1,
      dayNumber: 3,
      holdSeconds: 12,
      reps: 6
    },
    {
      id: 'hist-6',
      timestamp: Date.now() - 86400000 + 350000,
      date: '۱۴۰۳/۰۷/۰۳',
      time: '۰۹:۲۵',
      exerciseId: 'cobra_pose',
      exerciseTitleFa: 'کشش کبرا با دست‌های باز',
      level: 1,
      difficultyScore: 2,
      painLevel: 'no',
      painLevelFa: 'بدون درد',
      weekNumber: 1,
      dayNumber: 3,
      holdSeconds: 15,
      reps: 3
    }
  ]
};

const PROTOCOL_STORAGE_KEY = 'taskin_kamar_protocol_12w_v1';

export function loadProtocolState(): AppProtocolState {
  try {
    const raw = localStorage.getItem(PROTOCOL_STORAGE_KEY);
    if (!raw) return INITIAL_PROTOCOL_STATE;
    const parsed = JSON.parse(raw);
    // ensure all 7 exercises exist
    if (!parsed.exerciseStatuses || !parsed.exerciseStatuses.deep_core) {
      return INITIAL_PROTOCOL_STATE;
    }
    if (!parsed.patientProfile) {
      parsed.patientProfile = INITIAL_PROTOCOL_STATE.patientProfile;
    }
    if (!parsed.exerciseHistory) {
      parsed.exerciseHistory = INITIAL_PROTOCOL_STATE.exerciseHistory;
    }
    return parsed;
  } catch {
    return INITIAL_PROTOCOL_STATE;
  }
}

export function saveProtocolState(state: AppProtocolState) {
  try {
    localStorage.setItem(PROTOCOL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}
