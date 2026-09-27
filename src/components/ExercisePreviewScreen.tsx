import React from 'react';
import { StrictExerciseDef, ExerciseStatusState } from '../types';
import { ExerciseIllustration } from './ExerciseIllustration';
import {
  ChevronLeft,
  ArrowRight,
  Clock,
  Repeat,
  ShieldCheck,
  Play
} from 'lucide-react';

interface Props {
  exerciseDef: StrictExerciseDef;
  status: ExerciseStatusState;
  onStartExercise: () => void;
  onBack: () => void;
}

export const ExercisePreviewScreen: React.FC<Props> = ({
  exerciseDef,
  status,
  onStartExercise,
  onBack
}) => {
  const currentLvl = status.currentLevel || 1;
  const levelInfo = exerciseDef.levels[currentLvl - 1] || exerciseDef.levels[0];
  const isUsingAlt = exerciseDef.id === 'hamstring_stretch' && status.isUsingAlternativeSeated;
  const svgType = isUsingAlt ? 'hamstring_stretch_seated' : exerciseDef.svgType;

  return (
    <div className="max-w-xl mx-auto space-y-5 text-right animate-in fade-in duration-200 pb-10">
      {/* Top Bar with Back Button & Title */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          title="بازگشت"
        >
          <ArrowRight className="w-5 h-5 text-slate-700" />
        </button>

        <h1 className="text-lg font-black text-[#0f2824]">
          پیش‌نمایش حرکت
        </h1>

        <div className="w-11" /> {/* balance spacer */}
      </div>

      {/* 1. Instruction Demonstration Container with Turquoise to Lime Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white p-5 sm:p-6 shadow-xl shadow-[#00ad8c]/20">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between min-h-[240px]">
          {/* Top Row: Pill badge and title */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-white text-[10px] font-black tracking-wider mb-2">
                آموزش تصویری تمرین
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {exerciseDef.titleFa}
              </h2>
              <span className="text-xs text-white/90 font-bold block mt-0.5">
                {levelInfo.holdSeconds} ثانیه مکث • {levelInfo.reps} تکرار
              </span>
            </div>

            <span className="px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-bold">
              {isUsingAlt ? 'حالت نشسته' : `سطح ${currentLvl}`}
            </span>
          </div>

          {/* Animated Biomechanical Diagram in the center */}
          <div className="w-full h-36 flex items-center justify-center my-2">
            <ExerciseIllustration
              type={svgType}
              className="w-full h-full bg-transparent border-none"
              variant="detailed"
              showAlignmentGuide={false}
            />
          </div>

          <div className="text-center text-[11px] font-bold text-white/90 bg-black/20 backdrop-blur-xs py-1 px-3 rounded-full w-fit mx-auto">
            {exerciseDef.englishTitle}
          </div>
        </div>
      </div>

      {/* 2. Middle Section: Cues (نکات کلیدی اجرای حرکت) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 space-y-4">
        <div>
          <span className="text-[11px] font-black text-[#008ba3] tracking-wider block">
            حرکت {exerciseDef.orderNumber} از ۷
          </span>
          <h2 className="text-2xl font-black text-[#0f2824] mt-0.5">
            {exerciseDef.titleFa}
          </h2>
          <p className="text-xs text-slate-500 font-bold mt-0.5">
            {levelInfo.holdSeconds} ثانیه مکث در هر تکرار • {levelInfo.reps} تکرار
          </p>
        </div>

        {/* Cues with clean bullets */}
        <div className="space-y-3 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed">
          {exerciseDef.cues.map((cue, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="text-[#00ad8c] font-black text-base leading-none mt-0.5">•</span>
              <span className="font-medium text-[#1e3a35]">{cue}</span>
            </div>
          ))}
        </div>

        {/* Detailed Medical Instruction Box */}
        <div className="p-4 bg-[#f0f9ff] border border-sky-100 rounded-2xl text-xs text-[#0369a1] leading-relaxed space-y-1">
          <span className="font-black block">دستورالعمل بالینی اجرای صحیح:</span>
          <p className="text-slate-600 whitespace-pre-line text-[11px]">
            {isUsingAlt && exerciseDef.alternativeInstructionFa
              ? exerciseDef.alternativeInstructionFa
              : levelInfo.instructionFa}
          </p>
        </div>
      </div>

      {/* 3. Start Button Underneath */}
      <div className="pt-2 sticky bottom-4 z-20">
        <button
          onClick={onStartExercise}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] hover:opacity-95 active:scale-[0.99] text-white font-black text-base sm:text-lg rounded-2xl sm:rounded-3xl shadow-xl shadow-[#00ad8c]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>شروع حرکت</span>
          <Play className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
};
