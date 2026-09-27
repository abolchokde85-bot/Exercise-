import React from 'react';
import { StrictExerciseDef, ExerciseStatusState } from '../types';
import { ExerciseIllustration } from './ExerciseIllustration';
import {
  X,
  Sliders,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  ArrowUpCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface Props {
  exerciseDef: StrictExerciseDef | null;
  status?: ExerciseStatusState;
  isOpen: boolean;
  onClose: () => void;
  onSelectLevel?: (newLevel: number) => void;
  onResetExclusion?: () => void;
  onToggleSeatedHamstring?: () => void;
}

export const ExerciseModal: React.FC<Props> = ({
  exerciseDef,
  status,
  isOpen,
  onClose,
  onSelectLevel,
  onResetExclusion,
  onToggleSeatedHamstring
}) => {
  if (!isOpen || !exerciseDef) return null;

  const currentLevelNum = status ? status.currentLevel : 1;
  const isUsingAlt = exerciseDef.id === 'hamstring_stretch' && status?.isUsingAlternativeSeated;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-teal-600/40 text-teal-200 border border-teal-400/30 flex items-center justify-center font-black text-xs">
              {exerciseDef.orderNumber}
            </span>
            <h2 className="text-base sm:text-lg font-bold">{exerciseDef.titleFa}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 divide-y divide-slate-100">
          {/* Illustration & Overview */}
          <div className="space-y-4">
            <ExerciseIllustration
              type={isUsingAlt ? 'hamstring_stretch_seated' : exerciseDef.svgType}
              className="w-full h-52 sm:h-56"
              variant="detailed"
            />

            {/* Status alerts */}
            {status?.isExcluded && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold block">حرکت به مدت ۷ روز حذف موقت شده است</span>
                  <p className="text-[11px] text-rose-700 mt-0.5">
                    علت: ثبت ۲ روز متوالی پاسخ «بله شدید» به سوال تشدید درد.
                  </p>
                </div>
                {onResetExclusion && (
                  <button
                    onClick={onResetExclusion}
                    className="text-[10px] font-bold text-rose-800 hover:text-rose-950 bg-rose-200/70 hover:bg-rose-200 px-2 py-1 rounded-lg shrink-0"
                  >
                    فعال‌سازی مجدد
                  </button>
                )}
              </div>
            )}

            {isUsingAlt && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold block">حالت جایگزین نشسته فعال است</span>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    طبق پروتکل، با ثبت ۲ روز متوالی درد شدید در کشش همسترینگ، تمرین به حالت نشسته سوئیچ شد.
                  </p>
                </div>
                {onToggleSeatedHamstring && (
                  <button
                    onClick={onToggleSeatedHamstring}
                    className="text-[10px] font-bold text-amber-900 bg-amber-200/70 px-2 py-1 rounded-lg shrink-0"
                  >
                    بازگشت به خوابیده
                  </button>
                )}
              </div>
            )}

            {/* Base instruction */}
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1 text-xs">
              <span className="font-bold text-slate-800 block">دستورالعمل اصلی:</span>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {exerciseDef.baseInstructionFa}
              </p>
            </div>
          </div>

          {/* Progression Levels */}
          <div className="pt-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-teal-600" />
                <span>
                  {exerciseDef.hasProgression
                    ? 'مسیر پیشرفت سطوح (ارتقا در صورت ۳ روز متوالی سختی زیر ۵):'
                    : 'وضعیت پیشرفت:'}
                </span>
              </h3>
              {exerciseDef.hasProgression && (
                <span className="text-[11px] text-slate-500">
                  سطح فعال شما: {currentLevelNum}
                </span>
              )}
            </div>

            {!exerciseDef.hasProgression ? (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
                این حرکت طبق پروتکل طراحی شده دارای پیشرفت سطوح نیست و با حفظ همین ریتم انجام می‌شود.
                {exerciseDef.hasAlternativeOnSeverePain && (
                  <div className="mt-2 text-teal-800 font-bold border-t border-slate-200/60 pt-2">
                    توجه: در صورت ۲ روز متوالی درد شدید، با حالت نشسته جایگزین می‌شود.
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2.5">
                {exerciseDef.levels.map((lvl) => {
                  const isActive = lvl.levelNumber === currentLevelNum;
                  return (
                    <div
                      key={lvl.levelNumber}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isActive
                          ? 'border-teal-500 bg-teal-50/50 shadow-xs ring-1 ring-teal-400'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              isActive ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {lvl.levelNumber}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-800">
                            {lvl.title}
                          </span>
                        </div>

                        {onSelectLevel && !isActive && (
                          <button
                            type="button"
                            onClick={() => onSelectLevel(lvl.levelNumber)}
                            className="text-[11px] font-bold text-teal-700 hover:text-teal-900 bg-teal-100 px-2 py-0.5 rounded-md transition-colors"
                          >
                            تنظیم به این سطح
                          </button>
                        )}
                        {isActive && (
                          <span className="text-[11px] font-bold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-md">
                            سطح کنونی شما
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-2">
                        {lvl.instructionFa}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 bg-white/80 p-2 rounded-xl border border-slate-100">
                        <span>زمان مکث: {lvl.holdSeconds} ثانیه</span>
                        <span>تعداد: {lvl.reps} بار {lvl.isBilateral ? '(هر طرف)' : ''}</span>
                        {lvl.restBetweenRepsSeconds > 0 && (
                          <span>استراحت بین تکرارها: {lvl.restBetweenRepsSeconds} ثانیه</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Alternative instruction if applicable */}
          {exerciseDef.hasAlternativeOnSeverePain && exerciseDef.alternativeInstructionFa && (
            <div className="pt-5 space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5 text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>حالت جایگزین در صورت ۲ روز متوالی درد شدید:</span>
              </h4>
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed whitespace-pre-line">
                {exerciseDef.alternativeInstructionFa}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
