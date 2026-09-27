import React from 'react';
import { AppProtocolState, ExerciseId } from '../types';
import { PROTOCOL_EXERCISES } from '../data/exercises';
import {
  Activity,
  Calendar,
  CheckCircle,
  FileText,
  TrendingUp,
  CheckCircle2,
  Clock,
  Award
} from 'lucide-react';

interface Props {
  protocolState: AppProtocolState;
}

export const RecoveryAnalytics: React.FC<Props> = ({ protocolState }) => {
  const { currentWeek, currentDayInWeek, totalSessionsCompleted, exerciseStatuses, workoutLogs } = protocolState;

  // 12 weeks * 6 days = 72 total workouts
  const totalTargetWorkouts = 12 * 6;
  const progressPercent = Math.min(100, Math.round((totalSessionsCompleted / totalTargetWorkouts) * 100));

  return (
    <div className="space-y-6 text-right animate-in fade-in duration-200 pb-10">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#ecfccb] text-[#365314]">
              <Activity className="w-5 h-5 text-[#65a30d]" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-[#0f2824]">
              پایش روند درمان و نمودار پیشرفت ۱۲ هفته‌ای
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            بررسی ارتقای آمادگی عضلات، ثبات ستون فقرات و پیگیری جلسات تمرینی انجام‌شده.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
        >
          <FileText className="w-4 h-4 text-[#008ba3]" />
          <span>چاپ گزارش پیشرفت</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 block">
            پیشرفت کل دوره ۱۲ هفته
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#008ba3]">
              ٪{progressPercent}
            </span>
            <span className="text-xs text-slate-400 font-normal">
              ({totalSessionsCompleted} از {totalTargetWorkouts} جلسه)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div
              className="bg-gradient-to-r from-[#008ba3] to-[#72c02c] h-1.5 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 block">
            هفته و روز جاری
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
            هفته {currentWeek}
          </span>
          <span className="text-[11px] text-[#00ad8c] font-semibold block">
            روز {currentDayInWeek === 7 ? 'استراحت' : currentDayInWeek}
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 block">
            حرکات در سطوح پیشرفته‌تر
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#65a30d] block">
            {
              Object.values(exerciseStatuses).filter((st) => st.currentLevel > 1).length
            } حرکت
          </span>
          <span className="text-[10px] text-slate-400 block">
            نشان‌دهنده افزایش قدرت عضلانی
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 block">
            جلسات ثبت‌شده
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#0f2824] block">
            {workoutLogs.length} روز
          </span>
          <span className="text-[10px] text-slate-400 block">
            همراه با سوابق کامل بازخورد
          </span>
        </div>
      </div>

      {/* 7 Exercises Current Status Table */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#00ad8c]" />
          <span>سطح آمادگی و وضعیت فعلی ۷ حرکت ورزشی</span>
        </h3>

        <div className="space-y-3">
          {PROTOCOL_EXERCISES.map((ex) => {
            const st = exerciseStatuses[ex.id] || {
              exerciseId: ex.id,
              currentLevel: 1,
              consecutiveSeverePainDays: 0,
              consecutiveUnderFiveDifficultyDays: 0,
              isExcluded: false,
              isUsingAlternativeSeated: false,
              historyLogs: []
            };

            const lvlInfo = ex.levels[st.currentLevel - 1] || ex.levels[0];

            return (
              <div
                key={ex.id}
                className="p-4 rounded-2xl border border-slate-100 bg-[#f8fbf9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#008ba3] to-[#72c02c] text-white font-black text-xs flex items-center justify-center shrink-0">
                      {ex.orderNumber}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{ex.titleFa}</span>
                    {st.isExcluded && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                        استراحت موقت
                      </span>
                    )}
                    {st.isUsingAlternativeSeated && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                        حالت نشسته فعال است
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500 text-[11px] block pr-8">
                    {lvlInfo.title} ({lvlInfo.holdSeconds} ثانیه مکث • {lvlInfo.reps} تکرار)
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {ex.hasProgression ? (
                    <span className="font-bold text-[#008ba3] bg-white border border-sky-100 px-3 py-1 rounded-xl">
                      سطح فعلی: {st.currentLevel} از {ex.levels.length}
                    </span>
                  ) : (
                    <span className="text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-xl">
                      سطح استاندارد
                    </span>
                  )}

                  <span className="px-3 py-1 rounded-xl font-bold bg-[#ecfccb] text-[#365314] border border-[#d9f99d]">
                    وضعیت مطلوب
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workout Logs List */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#008ba3]" />
          <span>گزارش جلسات اخیر</span>
        </h3>

        <div className="space-y-3">
          {workoutLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-2xl border border-slate-100 bg-[#f8fbf9] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  هفته {log.weekNumber} - روز {log.dayNumber}
                </span>
                <span className="text-slate-400">{log.date}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {log.exerciseFeedbacks.map((fb, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-700"
                  >
                    حرکت: نمره سختی {fb.difficultyScore} از ۱۰ • {fb.painAggravation === 'no' ? 'بدون درد' : fb.painAggravation === 'mild' ? 'درد خفیف' : 'درد شدید'}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
