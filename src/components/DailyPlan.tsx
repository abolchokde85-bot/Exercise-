import React, { useState } from 'react';
import {
  StrictExerciseDef,
  ExerciseStatusState,
  UserFeedbackInput
} from '../types';
import { PROTOCOL_EXERCISES } from '../data/exercises';
import { ExerciseCard } from './ExerciseCard';
import { ExerciseModal } from './ExerciseModal';
import { FeedbackModal } from './FeedbackModal';
import { FeedbackEvaluationResult } from '../utils/adaptiveEngine';
import {
  Play,
  Sparkles,
  Calendar,
  Clock,
  Shield,
  Coffee,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Info
} from 'lucide-react';

interface Props {
  currentWeek: number;
  currentDay: number;
  statuses: Record<string, ExerciseStatusState>;
  completedTodayExerciseIds: string[];
  onChangeDay: (newDay: number) => void;
  onChangeWeek: (newWeek: number) => void;
  onStartWorkout: () => void;
  onSaveIndividualFeedback: (
    exerciseId: string,
    feedback: UserFeedbackInput,
    result: FeedbackEvaluationResult
  ) => void;
  onUpdateLevel: (exerciseId: string, newLevel: number) => void;
  onResetExclusion: (exerciseId: string) => void;
  onToggleSeatedHamstring: () => void;
}

export const DailyPlan: React.FC<Props> = ({
  currentWeek,
  currentDay,
  statuses,
  completedTodayExerciseIds,
  onChangeDay,
  onChangeWeek,
  onStartWorkout,
  onSaveIndividualFeedback,
  onUpdateLevel,
  onResetExclusion,
  onToggleSeatedHamstring
}) => {
  const [selectedForModal, setSelectedForModal] = useState<StrictExerciseDef | null>(null);
  const [feedbackDef, setFeedbackDef] = useState<StrictExerciseDef | null>(null);

  const isRestDay = currentDay === 7;

  // Active exercises are those not excluded
  const activeExercises = PROTOCOL_EXERCISES.filter((ex) => {
    const st = statuses[ex.id];
    return !st || !st.isExcluded;
  });

  const excludedExercises = PROTOCOL_EXERCISES.filter((ex) => {
    const st = statuses[ex.id];
    return st && st.isExcluded;
  });

  const completedCount = completedTodayExerciseIds.length;
  const totalActiveCount = activeExercises.length;
  const progressPercent = totalActiveCount > 0 ? Math.round((completedCount / totalActiveCount) * 100) : 0;

  return (
    <div className="space-y-6 text-right">
      {/* 12-Week & 6-Day Navigation Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                پروتکل تخصصی ۱۲ هفته‌ای کمردرد (۶ روز تمرین + ۱ روز استراحت)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              هفته {currentWeek} از ۱۲ | روز {currentDay === 7 ? 'استراحت' : `${currentDay} تمرین`}
            </h1>
          </div>

          {/* Week Selector */}
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shrink-0">
            <button
              onClick={() => onChangeWeek(Math.max(1, currentWeek - 1))}
              disabled={currentWeek <= 1}
              className="p-1.5 rounded-xl hover:bg-white text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
              title="هفته قبل"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-800 px-2">
              هفته {currentWeek}
            </span>
            <button
              onClick={() => onChangeWeek(Math.min(12, currentWeek + 1))}
              disabled={currentWeek >= 12}
              className="p-1.5 rounded-xl hover:bg-white text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
              title="هفته بعد"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 7 Days Selector Bar */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1">
          {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => {
            const isSelected = currentDay === dayNum;
            const isDayRest = dayNum === 7;
            return (
              <button
                key={dayNum}
                onClick={() => onChangeDay(dayNum)}
                className={`py-2 px-1 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? isDayRest
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs font-bold'
                      : 'bg-teal-700 text-white border-teal-700 shadow-xs font-bold'
                    : isDayRest
                    ? 'bg-amber-50/70 border-amber-200 text-amber-800 hover:bg-amber-100'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[10px] sm:text-xs">
                  {isDayRest ? 'استراحت' : `روز ${dayNum}`}
                </span>
                <span className="block text-[9px] sm:text-[10px] opacity-80 mt-0.5">
                  {isDayRest ? 'جمعه' : 'تمرین'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rest Day Screen */}
      {isRestDay ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-amber-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <Coffee className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">امروز روز استراحت هفتگی شماست</h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              طبق برنامه ۶ روز تمرین در هفته، روز هفتم مختص ریکاوری عضلات، التیام مفاصل ستون فقرات و آرامش است. تمرین فیزیکی امروز لازم نیست.
            </p>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl max-w-md mx-auto text-xs text-amber-900 border border-amber-200">
            توصیه: پیاده‌روی آرام روی سطح هموار و هیدراتاسیون مناسب (نوشیدن آب کافی).
          </div>
        </div>
      ) : (
        <>
          {/* Main Today Workout Trigger Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 text-white p-6 sm:p-8 shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs font-semibold text-teal-100 border border-white/10 flex items-center gap-1.5 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-teal-300" />
                  برنامه ۷ حرکت تخصصی
                </span>

                <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                  تمرین امروز: هفته {currentWeek} - روز {currentDay}
                </h2>

                <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-normal">
                  تعداد حرکات فعال امروز: <strong className="text-white">{totalActiveCount} حرکت</strong>.
                  پس از انجام هر حرکت ۲ بازخورد گرفته می‌شود: تشدید درد (جهت تصمیم‌گیری حذف یا جایگزینی) و نمره سختی (ارتقای سطح پس از ۳ روز زیر ۵).
                </p>

                {excludedExercises.length > 0 && (
                  <div className="p-2.5 bg-rose-500/20 border border-rose-300/30 rounded-xl text-xs text-rose-100 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-300 shrink-0" />
                    <span>
                      {excludedExercises.length} حرکت به علت ۲ روز متوالی درد شدید موقتاً در دوره استراحت ۷ روزه قرار دارد.
                    </span>
                  </div>
                )}
              </div>

              {/* Start Workout Card */}
              <div className="w-full md:w-72 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-lg text-center space-y-4 shrink-0">
                <div className="flex items-center justify-between text-xs text-teal-100">
                  <span>حرکات تکمیل شده امروز</span>
                  <span className="font-bold text-white">{completedCount} از {totalActiveCount}</span>
                </div>

                <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <button
                  onClick={onStartWorkout}
                  disabled={totalActiveCount === 0}
                  className="w-full py-3.5 px-5 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{completedCount > 0 ? 'ادامه تمرینات امروز' : 'شروع تمرین هوشمند امروز'}</span>
                </button>

                <p className="text-[11px] text-teal-200/80">
                  همراه با تایمر دقیق مکث و استراحت بین تکرارها
                </p>
              </div>
            </div>
          </div>

          {/* Clinical Rules Reminder Card */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block">قوانین سیستم انطباق بازخورد:</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                • ۲ روز متوالی «بله شدید» = حذف حرکت به مدت ۷ روز (در کشش همسترینگ: جایگزینی با حالت نشسته).
                <br />
                • ۳ روز متوالی نمره سختی زیر ۵ = ارتقای خودکار به سطح پیشرفت بالاتر.
              </p>
            </div>
          </div>

          {/* List of 7 Protocol Exercises */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800">
              فهرست ۷ حرکت ورزشی پروتکل بالینی:
            </h3>

            {PROTOCOL_EXERCISES.map((ex) => {
              const st = statuses[ex.id] || {
                exerciseId: ex.id,
                currentLevel: 1,
                consecutiveSeverePainDays: 0,
                consecutiveUnderFiveDifficultyDays: 0,
                isExcluded: false,
                isUsingAlternativeSeated: false,
                historyLogs: []
              };

              const isDone = completedTodayExerciseIds.includes(ex.id);

              return (
                <ExerciseCard
                  key={ex.id}
                  exerciseDef={ex}
                  status={st}
                  isCompletedToday={isDone}
                  onOpenDetails={() => setSelectedForModal(ex)}
                  onOpenFeedback={() => setFeedbackDef(ex)}
                />
              );
            })}
          </div>
        </>
      )}

      {/* Details Modal */}
      {selectedForModal && (
        <ExerciseModal
          exerciseDef={selectedForModal}
          status={statuses[selectedForModal.id]}
          isOpen={true}
          onClose={() => setSelectedForModal(null)}
          onSelectLevel={(lvl) => onUpdateLevel(selectedForModal.id, lvl)}
          onResetExclusion={() => onResetExclusion(selectedForModal.id)}
          onToggleSeatedHamstring={onToggleSeatedHamstring}
        />
      )}

      {/* 2-Question Feedback Modal */}
      {feedbackDef && (
        <FeedbackModal
          exerciseDef={feedbackDef}
          exerciseStatus={statuses[feedbackDef.id]}
          isOpen={true}
          currentWeek={currentWeek}
          currentDay={currentDay}
          onClose={() => setFeedbackDef(null)}
          onSubmitFeedback={(feedback, result) => {
            onSaveIndividualFeedback(feedbackDef.id, feedback, result);
            setFeedbackDef(null);
          }}
        />
      )}
    </div>
  );
};
