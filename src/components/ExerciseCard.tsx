import React from 'react';
import { StrictExerciseDef, ExerciseStatusState } from '../types';
import { ExerciseIllustration } from './ExerciseIllustration';
import {
  Clock,
  Repeat,
  HeartPulse,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  Info,
  ShieldAlert,
  ArrowUpCircle
} from 'lucide-react';

interface Props {
  exerciseDef: StrictExerciseDef;
  status: ExerciseStatusState;
  isCompletedToday?: boolean;
  onOpenDetails: () => void;
  onOpenFeedback: () => void;
}

export const ExerciseCard: React.FC<Props> = ({
  exerciseDef,
  status,
  isCompletedToday = false,
  onOpenDetails,
  onOpenFeedback
}) => {
  const currentLvl = status.currentLevel || 1;
  const levelInfo = exerciseDef.levels[currentLvl - 1] || exerciseDef.levels[0];

  const isUsingAlt = exerciseDef.id === 'hamstring_stretch' && status.isUsingAlternativeSeated;
  const svgType = isUsingAlt ? 'hamstring_stretch_seated' : exerciseDef.svgType;

  return (
    <div
      className={`group relative bg-white rounded-3xl p-4 sm:p-5 border transition-all duration-200 hover:shadow-md ${
        status.isExcluded
          ? 'border-rose-200 bg-rose-50/20 opacity-80'
          : isCompletedToday
          ? 'border-emerald-200 bg-emerald-50/20'
          : 'border-slate-200/90 hover:border-teal-400'
      }`}
    >
      {/* Top Status Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-xl bg-teal-700 text-white font-black text-xs flex items-center justify-center">
            {exerciseDef.orderNumber}
          </span>
          <h3
            onClick={onOpenDetails}
            className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors cursor-pointer"
          >
            {exerciseDef.titleFa}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {status.isExcluded && (
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>حذف موقت ({status.exclusionDaysRemaining || 7} روز باقیمانده)</span>
            </span>
          )}

          {isUsingAlt && (
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              حالت جایگزین نشسته
            </span>
          )}

          {exerciseDef.hasProgression ? (
            <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
              سطح {currentLvl} از {exerciseDef.levels.length}
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              سطح ثابت
            </span>
          )}

          {isCompletedToday && (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>انجام شد</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* SVG Thumbnail */}
        <div
          onClick={onOpenDetails}
          className="w-full sm:w-36 h-28 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-slate-100 group-hover:border-teal-300 transition-colors"
        >
          <ExerciseIllustration type={svgType} className="w-full h-full" variant="thumbnail" showAlignmentGuide={false} />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-2 text-right">
          <div className="text-xs font-bold text-teal-900 bg-teal-50/60 p-2 rounded-xl border border-teal-100">
            {isUsingAlt ? 'جایگزین نشسته: کشش با شال روی زمین' : levelInfo.title}
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
            {isUsingAlt && exerciseDef.alternativeInstructionFa
              ? exerciseDef.alternativeInstructionFa
              : levelInfo.instructionFa}
          </p>

          {/* Stats: Reps, hold, rest */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>{levelInfo.holdSeconds} ثانیه مکث</span>
            </span>

            <span className="flex items-center gap-1">
              <Repeat className="w-3.5 h-3.5 text-teal-600" />
              <span>
                {levelInfo.reps} تکرار {levelInfo.isBilateral ? '(هر طرف)' : ''}
              </span>
            </span>

            {levelInfo.restBetweenRepsSeconds > 0 && (
              <span className="flex items-center gap-1 text-slate-500">
                <span>{levelInfo.restBetweenRepsSeconds} ثانیه استراحت بین تکرار</span>
              </span>
            )}
          </div>

          {/* Clinical Progression Streak Tracker */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {exerciseDef.hasProgression && status.consecutiveUnderFiveDifficultyDays > 0 && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                <ArrowUpCircle className="w-3 h-3 text-emerald-600" />
                <span>{status.consecutiveUnderFiveDifficultyDays} از ۳ روز متوالی سختی زیر ۵</span>
              </span>
            )}

            {status.consecutiveSeverePainDays > 0 && (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-600" />
                <span>۱ روز درد شدید ثبت شده (روز دوم منجر به حذف ۷ روزه)</span>
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          {!status.isExcluded ? (
            <button
              onClick={onOpenFeedback}
              className="flex-1 sm:flex-none py-2 px-3 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 active:bg-teal-200 border border-teal-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>ثبت بازخورد</span>
            </button>
          ) : (
            <div className="text-[11px] text-rose-700 font-bold bg-rose-100/70 p-2 rounded-xl text-center">
              در دوره استراحت ۷ روزه
            </div>
          )}

          <button
            onClick={onOpenDetails}
            className="flex-1 sm:flex-none py-2 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>مشاهده جزئیات</span>
          </button>
        </div>
      </div>
    </div>
  );
};
