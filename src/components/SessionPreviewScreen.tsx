import React from 'react';
import { StrictExerciseDef, ExerciseStatusState } from '../types';
import { PROTOCOL_EXERCISES } from '../data/exercises';
import { ExerciseIllustration } from './ExerciseIllustration';
import {
  Play,
  ArrowRight,
  Clock,
  Repeat,
  ShieldCheck,
  ChevronLeft,
  AlertTriangle
} from 'lucide-react';

interface Props {
  week: number;
  day: number;
  statuses: Record<string, ExerciseStatusState>;
  onBack: () => void;
  onPreviewExercise: (exerciseDef: StrictExerciseDef) => void;
  onStartSession: () => void;
}

export const SessionPreviewScreen: React.FC<Props> = ({
  week,
  day,
  statuses,
  onBack,
  onPreviewExercise,
  onStartSession
}) => {
  const isRestDay = day === 7;

  // Active exercises are those not excluded
  const activeExercises = PROTOCOL_EXERCISES.filter((ex) => {
    const st = statuses[ex.id];
    return !st || !st.isExcluded;
  });

  const excludedExercises = PROTOCOL_EXERCISES.filter((ex) => {
    const st = statuses[ex.id];
    return st && st.isExcluded;
  });

  return (
    <div className="max-w-xl mx-auto space-y-5 text-right animate-in fade-in duration-200 pb-10">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="بازگشت به خانه"
          >
            <ArrowRight className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <span className="text-[10px] font-black text-[#008ba3] bg-[#f0f9ff] px-2.5 py-0.5 rounded-full uppercase">
              پیش‌نمایش جلسه تمرین
            </span>
            <h1 className="text-lg sm:text-xl font-black text-[#0f2824] mt-0.5">
              حرکات درمانی جلسه امروز
            </h1>
            <span className="text-xs text-slate-500 font-semibold block">
              هفته {week} - روز {day}
            </span>
          </div>
        </div>

        {/* Start Session CTA Button */}
        {!isRestDay && (
          <button
            onClick={onStartSession}
            disabled={activeExercises.length === 0}
            className="py-3 px-5 bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] hover:opacity-95 active:scale-[0.98] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#00ad8c]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>شروع جلسه</span>
          </button>
        )}
      </div>

      {/* Patient Supportive Guidance Notice (No internal algorithmic rules displayed) */}
      <div className="p-4 rounded-2xl bg-[#ecfccb]/80 border border-[#d9f99d] text-xs text-[#365314] flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#65a30d] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-black block">برنامه ۷ حرکت تخصصی ستون فقرات:</span>
          <p className="text-[#3f6212] leading-relaxed text-[11px]">
            این حرکات به صورت هدفمند برای ثبات عضلات مرکزی، پایداری مهره‌ها و کاهش فشار دیسک‌های کمری برنامه‌ریزی شده‌اند. روی هر حرکت ضربه بزنید تا آموزش و نکات آن را مشاهده کنید.
          </p>
        </div>
      </div>

      {excludedExercises.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>
            {excludedExercises.length} حرکت برای محافظت از ستون فقرات شما به صورت موقت در حالت استراحت قرار گرفته است.
          </span>
        </div>
      )}

      {/* Exercise list with tap-to-preview */}
      <div className="space-y-3">
        {PROTOCOL_EXERCISES.map((exerciseDef) => {
          const st = statuses[exerciseDef.id] || {
            exerciseId: exerciseDef.id,
            currentLevel: 1,
            consecutiveSeverePainDays: 0,
            consecutiveUnderFiveDifficultyDays: 0,
            isExcluded: false,
            isUsingAlternativeSeated: false,
            historyLogs: []
          };

          const levelInfo = exerciseDef.levels[st.currentLevel - 1] || exerciseDef.levels[0];
          const isUsingAlt = exerciseDef.id === 'hamstring_stretch' && st.isUsingAlternativeSeated;
          const svgType = isUsingAlt ? 'hamstring_stretch_seated' : exerciseDef.svgType;

          return (
            <div
              key={exerciseDef.id}
              onClick={() => onPreviewExercise(exerciseDef)}
              className={`p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                st.isExcluded
                  ? 'border-rose-200 bg-rose-50/20 opacity-70'
                  : 'bg-white border-slate-100 hover:border-[#00ad8c] hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#008ba3] to-[#72c02c] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                  {exerciseDef.orderNumber}
                </span>

                <div className="w-18 h-14 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                  <ExerciseIllustration type={svgType} className="w-full h-full" variant="thumbnail" showAlignmentGuide={false} />
                </div>

                <div className="space-y-0.5 text-right flex-1 sm:flex-none">
                  <h3 className="text-sm sm:text-base font-bold text-[#0f2824]">
                    {exerciseDef.titleFa}
                  </h3>
                  <span className="text-xs text-[#008ba3] font-bold block">
                    {isUsingAlt ? 'حالت جایگزین نشسته' : levelInfo.title}
                  </span>
                </div>
              </div>

              {/* Timing info & Tap to preview cue */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto text-xs text-slate-500 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#00ad8c]" />
                    <span>{levelInfo.holdSeconds} ثانیه</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Repeat className="w-3.5 h-3.5 text-[#00ad8c]" />
                    <span>{levelInfo.reps} تکرار</span>
                  </span>
                </div>

                <span className="px-3 py-1.5 rounded-xl bg-slate-50 text-[#008ba3] font-bold hover:bg-[#ecfccb] transition-colors flex items-center gap-1">
                  <span>پیش‌نمایش</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action */}
      {!isRestDay && (
        <div className="sticky bottom-4 z-20 pt-2">
          <button
            onClick={onStartSession}
            disabled={activeExercises.length === 0}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] hover:opacity-95 active:scale-[0.99] text-white font-black text-base rounded-2xl sm:rounded-3xl shadow-xl shadow-[#00ad8c]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>شروع جلسه تمرین</span>
          </button>
        </div>
      )}
    </div>
  );
};
