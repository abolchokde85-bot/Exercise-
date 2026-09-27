import React, { useState, useEffect } from 'react';
import { StrictExerciseDef, ExerciseStatusState } from '../types';
import { ExerciseIllustration } from './ExerciseIllustration';
import { soundFX } from '../utils/audio';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';

interface Props {
  exerciseDef: StrictExerciseDef;
  status: ExerciseStatusState;
  currentIndex: number;
  totalExercises: number;
  onFinishExercise: () => void; // triggers check-in
  onCancel: () => void;
}

export const ExerciseActiveScreen: React.FC<Props> = ({
  exerciseDef,
  status,
  currentIndex,
  totalExercises,
  onFinishExercise,
  onCancel
}) => {
  const currentLvl = status.currentLevel || 1;
  const levelInfo = exerciseDef.levels[currentLvl - 1] || exerciseDef.levels[0];
  const isUsingAlt = exerciseDef.id === 'hamstring_stretch' && status.isUsingAlternativeSeated;
  const svgType = isUsingAlt ? 'hamstring_stretch_seated' : exerciseDef.svgType;

  const targetHold = levelInfo.holdSeconds;
  const totalReps = levelInfo.reps;

  const [secondsLeft, setSecondsLeft] = useState(targetHold);
  const [currentRep, setCurrentRep] = useState(1);
  const [currentSide, setCurrentSide] = useState<'right' | 'left' | 'single'>(
    levelInfo.isBilateral ? 'right' : 'single'
  );
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer countdown
  useEffect(() => {
    if (isPaused) return;

    if (secondsLeft <= 0) {
      if (soundEnabled) soundFX.playBeep(880, 0.18);

      // Advance side or rep
      if (levelInfo.isBilateral) {
        if (currentSide === 'right') {
          setCurrentSide('left');
          setSecondsLeft(targetHold);
        } else {
          // Left side finished
          if (currentRep < totalReps) {
            setCurrentRep((r) => r + 1);
            setCurrentSide('right');
            setSecondsLeft(targetHold);
          } else {
            // All reps done -> Trigger check-in
            onFinishExercise();
          }
        }
      } else {
        // Single side
        if (currentRep < totalReps) {
          setCurrentRep((r) => r + 1);
          setSecondsLeft(targetHold);
        } else {
          // All reps done -> Trigger check-in
          onFinishExercise();
        }
      }
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 3 && s > 1 && soundEnabled) {
          soundFX.playCountdownTick();
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, isPaused, currentRep, totalReps, currentSide, levelInfo.isBilateral, targetHold, soundEnabled, onFinishExercise]);

  const progressPercent = Math.round(((currentIndex + 1) / totalExercises) * 100);

  return (
    <div className="max-w-xl mx-auto space-y-4 text-right animate-in fade-in duration-200 pb-10">
      {/* Top Header Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
            title="خروج از جلسه"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-[#008ba3] bg-[#f0f9ff] px-2 py-0.5 rounded-full uppercase">
                حرکت {currentIndex + 1} از {totalExercises}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {isUsingAlt ? 'جایگزین نشسته' : levelInfo.title}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-[#0f2824] mt-0.5">
              {exerciseDef.titleFa}
            </h1>
          </div>
        </div>

        {/* Audio & Pause Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled((v) => !v)}
            className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            title={soundEnabled ? 'قطع صدا' : 'وصل صدا'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00ad8c]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Pause Button */}
          <button
            onClick={() => setIsPaused((p) => !p)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
              isPaused
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-800'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            <span>{isPaused ? 'ادامه' : 'توقف موقت'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar of Routine with Turquoise to Lime Gradient */}
      <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] h-1.5 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 1. Video on Top with Turquoise to Lime Gradient Box */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white p-4 shadow-xl shadow-[#00ad8c]/20">
        <div className="relative z-10 flex items-center justify-between mb-2 text-xs">
          <span className="px-3 py-0.5 rounded-full bg-black/25 backdrop-blur-md text-white text-[10px] font-black uppercase">
            راهنمای تصویری حرکت
          </span>
          <span className="text-white/90 font-bold text-[11px]">
            {levelInfo.holdSeconds} ثانیه مکث
          </span>
        </div>

        <div className="w-full h-44 flex items-center justify-center">
          <ExerciseIllustration
            type={svgType}
            className="w-full h-full bg-transparent border-none"
            variant="detailed"
            showAlignmentGuide={false}
          />
        </div>
      </div>

      {/* 2. Circular Countdown in the Middle (Hold) */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 flex flex-col items-center justify-center space-y-4">
        {/* Status badges */}
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 bg-[#ecfccb] text-[#365314] rounded-full font-bold border border-[#d9f99d]">
            تکرار {currentRep} از {totalReps}
          </span>

          {levelInfo.isBilateral && (
            <span className="text-xs px-3 py-1 bg-[#f0f9ff] text-[#0369a1] rounded-full font-bold">
              {currentSide === 'right' ? 'سمت اول (پای راست)' : 'سمت دوم (پای چپ)'}
            </span>
          )}

          {isPaused && (
            <span className="text-xs px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-bold border border-amber-300 animate-pulse">
              تمرین متوقف شده است
            </span>
          )}
        </div>

        {/* Circular SVG Timer with Turquoise to Lime Gradient Stroke */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="activeTimerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
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
              stroke="url(#activeTimerGrad)"
              strokeWidth="7"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * (targetHold - secondsLeft)) / targetHold}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-300 ease-linear"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-black text-[#0f2824] tracking-tight font-mono">
              {secondsLeft}
            </span>
            <span className="text-xs font-bold text-slate-500 mt-0.5">
              ثانیه مکث
            </span>
          </div>
        </div>

        {/* Manual Adjusters */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setSecondsLeft((s) => Math.max(1, s - 3))}
            className="px-3 py-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer font-bold"
          >
            -۳ ثانیه
          </button>
          <button
            onClick={() => setSecondsLeft(targetHold)}
            title="شروع مجدد مکث این تکرار"
            className="p-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSecondsLeft((s) => s + 3)}
            className="px-3 py-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer font-bold"
          >
            +۳ ثانیه
          </button>
        </div>

        {/* Finish & Feedback CTA Button */}
        <div className="w-full pt-2">
          <button
            onClick={onFinishExercise}
            className="w-full py-4 px-5 bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] hover:opacity-95 active:scale-[0.99] text-white font-black text-sm sm:text-base rounded-2xl sm:rounded-3xl shadow-xl shadow-[#00ad8c]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>پایان حرکت و ثبت بازخورد درد و سختی</span>
          </button>
        </div>
      </div>
    </div>
  );
};
