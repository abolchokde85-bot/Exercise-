import React, { useState, useEffect } from 'react';
import { StrictExerciseDef, ExerciseStatusState } from '../types';
import { ExerciseIllustration } from './ExerciseIllustration';
import { soundFX } from '../utils/audio';
import {
  FastForward,
  Coffee,
  Wind,
  ChevronLeft
} from 'lucide-react';

interface Props {
  nextExerciseDef: StrictExerciseDef | null;
  nextStatus?: ExerciseStatusState;
  nextIndex: number;
  totalExercises: number;
  initialRestSeconds?: number;
  onSkipRest: () => void;
}

export const RestScreen: React.FC<Props> = ({
  nextExerciseDef,
  nextStatus,
  nextIndex,
  totalExercises,
  initialRestSeconds = 15,
  onSkipRest
}) => {
  const [restSecondsLeft, setRestSecondsLeft] = useState(initialRestSeconds);

  useEffect(() => {
    if (restSecondsLeft <= 0) {
      soundFX.playBeep(660, 0.15);
      onSkipRest();
      return;
    }

    const timer = setInterval(() => {
      setRestSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [restSecondsLeft, onSkipRest]);

  const nextLvl = nextStatus ? nextStatus.currentLevel : 1;
  const nextLevelInfo = nextExerciseDef
    ? nextExerciseDef.levels[nextLvl - 1] || nextExerciseDef.levels[0]
    : null;

  const isUsingAlt = nextExerciseDef?.id === 'hamstring_stretch' && nextStatus?.isUsingAlternativeSeated;
  const nextSvg = isUsingAlt ? 'hamstring_stretch_seated' : nextExerciseDef?.svgType || 'deep_core';

  return (
    <div className="max-w-xl mx-auto space-y-4 text-right animate-in fade-in duration-200 pb-10">
      {/* Rest Phase Header */}
      <div className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#ecfccb] text-[#365314] border border-[#d9f99d]">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#008ba3] bg-[#f0f9ff] px-2.5 py-0.5 rounded-full uppercase">
              استراحت و تنفس عمیق
            </span>
            <h1 className="text-base sm:text-lg font-black text-[#0f2824] mt-0.5">
              ریکاوری ستون فقرات
            </h1>
          </div>
        </div>

        {/* Skip Rest Button */}
        <button
          onClick={onSkipRest}
          className="py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span>ادامه و رد کردن استراحت</span>
          <FastForward className="w-4 h-4 text-[#00ad8c]" />
        </button>
      </div>

      {/* 1. Next Exercise Video on Top with Turquoise to Lime Gradient Container */}
      {nextExerciseDef && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white p-5 shadow-xl shadow-[#00ad8c]/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-white/95">
            <span className="px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-white text-[10px] uppercase font-black">
              حرکت بعدی ({nextIndex + 1} از {totalExercises})
            </span>
            <span className="text-xs text-white/90">
              {nextLevelInfo?.holdSeconds} ثانیه مکث
            </span>
          </div>

          <h2 className="text-xl font-black text-white">
            {nextExerciseDef.titleFa}
          </h2>

          <div className="w-full h-36 flex items-center justify-center">
            <ExerciseIllustration
              type={nextSvg}
              className="w-full h-full bg-transparent border-none"
              variant="detailed"
              showAlignmentGuide={false}
            />
          </div>
        </div>
      )}

      {/* 2. Rest Countdown in the Middle */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 flex flex-col items-center justify-center space-y-4">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="restTimerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#008ba3" />
                <stop offset="50%" stopColor="#00ad8c" />
                <stop offset="100%" stopColor="#72c02c" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="42"
              className="text-slate-100"
              strokeWidth="7"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#restTimerGrad)"
              strokeWidth="7"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * (initialRestSeconds - restSecondsLeft)) / initialRestSeconds}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-300 ease-linear"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-black text-[#0f2824] tracking-tight font-mono">
              {restSecondsLeft}
            </span>
            <span className="text-[11px] font-bold text-slate-500 mt-0.5">
              ثانیه استراحت
            </span>
          </div>
        </div>

        {/* Breathing Guidance Prompt */}
        <div className="flex items-center gap-2 p-3 bg-[#f0f9ff] text-[#0369a1] rounded-2xl text-xs max-w-md text-center">
          <Wind className="w-4 h-4 text-[#008ba3] shrink-0" />
          <span>عضلات شکم و ستون فقرات را کاملاً رها کنید. دم عمیق از بینی و بازدم آرام از دهان.</span>
        </div>

        {/* Skip Rest CTA underneath */}
        <div className="w-full pt-2">
          <button
            onClick={onSkipRest}
            className="w-full py-4 px-5 bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] hover:opacity-95 active:scale-[0.99] text-white font-black text-sm sm:text-base rounded-2xl sm:rounded-3xl shadow-xl shadow-[#00ad8c]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>شروع حرکت بعدی</span>
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
