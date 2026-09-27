import React, { useState, useEffect } from 'react';
import {
  StrictExerciseDef,
  ExerciseStatusState,
  UserFeedbackInput
} from '../types';
import { PROTOCOL_EXERCISES } from '../data/exercises';
import { ExerciseIllustration } from './ExerciseIllustration';
import { FeedbackModal } from './FeedbackModal';
import { evaluateExerciseFeedback, FeedbackEvaluationResult } from '../utils/adaptiveEngine';
import { soundFX } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  Volume2,
  VolumeX,
  X,
  Clock,
  Repeat,
  Sparkles,
  Trophy,
  Coffee,
  HelpCircle
} from 'lucide-react';

interface Props {
  activeExerciseIds: string[];
  statuses: Record<string, ExerciseStatusState>;
  currentWeek: number;
  currentDay: number;
  onFinishWorkout: (feedbacks: {
    exerciseId: string;
    feedback: UserFeedbackInput;
    result: FeedbackEvaluationResult;
  }[]) => void;
  onCancel: () => void;
}

export const WorkoutRunner: React.FC<Props> = ({
  activeExerciseIds,
  statuses,
  currentWeek,
  currentDay,
  onFinishWorkout,
  onCancel
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active exercises definition list
  const activeDefs: StrictExerciseDef[] = activeExerciseIds
    .map((id) => PROTOCOL_EXERCISES.find((e) => e.id === id))
    .filter(Boolean) as StrictExerciseDef[];

  const currentDef = activeDefs[currentIndex] || activeDefs[0];
  const currentStatus = statuses[currentDef.id] || {
    exerciseId: currentDef.id,
    currentLevel: 1,
    consecutiveSeverePainDays: 0,
    consecutiveUnderFiveDifficultyDays: 0,
    isExcluded: false,
    isUsingAlternativeSeated: false,
    historyLogs: []
  };

  const levelInfo = currentDef.levels[currentStatus.currentLevel - 1] || currentDef.levels[0];

  // State: Are we in hold phase or rest phase between reps?
  const [timerPhase, setTimerPhase] = useState<'hold' | 'rest'>('hold');
  const targetHold = levelInfo.holdSeconds;
  const targetRest = levelInfo.restBetweenRepsSeconds;

  const [secondsLeft, setSecondsLeft] = useState(targetHold);
  const [currentRep, setCurrentRep] = useState(1);
  const totalReps = levelInfo.reps;
  const [currentSide, setCurrentSide] = useState<'right' | 'left' | 'single'>(
    levelInfo.isBilateral ? 'right' : 'single'
  );

  // Feedback modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [completedFeedbacks, setCompletedFeedbacks] = useState<{
    exerciseId: string;
    feedback: UserFeedbackInput;
    result: FeedbackEvaluationResult;
  }[]>([]);

  // Completion
  const [isWorkoutDone, setIsWorkoutDone] = useState(false);

  // Reset when exercise changes
  useEffect(() => {
    setTimerPhase('hold');
    setSecondsLeft(levelInfo.holdSeconds);
    setCurrentRep(1);
    setCurrentSide(levelInfo.isBilateral ? 'right' : 'single');
    setIsPaused(false);
  }, [currentIndex, levelInfo]);

  // Timer countdown
  useEffect(() => {
    if (isPaused || isWorkoutDone || showFeedbackModal) return;

    if (secondsLeft <= 0) {
      if (soundEnabled) soundFX.playBeep(880, 0.15);

      if (timerPhase === 'hold') {
        // Did we finish hold for this rep?
        if (targetRest > 0) {
          // Enter rest phase
          setTimerPhase('rest');
          setSecondsLeft(targetRest);
          if (soundEnabled) soundFX.playRestChime();
        } else {
          // No rest between reps; proceed to next rep or side
          advanceRepOrSide();
        }
      } else {
        // Rest phase finished; back to hold
        advanceRepOrSide();
      }
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 3 && s > 1 && soundEnabled && timerPhase === 'hold') {
          soundFX.playCountdownTick();
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, isPaused, isWorkoutDone, showFeedbackModal, timerPhase, targetRest, soundEnabled]);

  const advanceRepOrSide = () => {
    setTimerPhase('hold');
    setSecondsLeft(targetHold);

    if (levelInfo.isBilateral) {
      if (currentSide === 'right') {
        setCurrentSide('left');
      } else {
        // finished left side too
        if (currentRep < totalReps) {
          setCurrentRep((r) => r + 1);
          setCurrentSide('right');
        } else {
          // All reps done for both sides!
          setShowFeedbackModal(true);
        }
      }
    } else {
      // Single side
      if (currentRep < totalReps) {
        setCurrentRep((r) => r + 1);
      } else {
        // All reps done!
        setShowFeedbackModal(true);
      }
    }
  };

  const handleFeedbackSubmitted = (
    feedback: UserFeedbackInput,
    result: FeedbackEvaluationResult
  ) => {
    setShowFeedbackModal(false);
    const newItems = [...completedFeedbacks, { exerciseId: currentDef.id, feedback, result }];
    setCompletedFeedbacks(newItems);

    if (soundEnabled) soundFX.playSuccessChime();

    if (currentIndex < activeDefs.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsWorkoutDone(true);
      try {
        confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  if (isWorkoutDone) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-6 text-right animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-100 text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-teal-500/25">
            <Trophy className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200">
              جلسه روز {currentDay} از هفته {currentWeek} به اتمام رسید
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              تمرین امروز با موفقیت ثبت شد
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              بازخوردهای ۲ گانه تشدید درد و نمره سختی حرکات با موفقیت ثبت گردید و الگوریتم انطباقی برنامه‌ریزی روزهای آینده را به‌روزرسانی کرد.
            </p>
          </div>

          {/* Feedback summary badges */}
          <div className="space-y-2 text-right">
            {completedFeedbacks.map((f, idx) => {
              const def = PROTOCOL_EXERCISES.find((p) => p.id === f.exerciseId);
              return (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 ml-1">{def?.titleFa}</span>
                    <span className="text-slate-500 text-[11px] block">{f.result.actionSummaryFa}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${f.result.alertColor}`}>
                      {f.result.alertBadge}
                    </span>
                    <span className="font-bold text-slate-700 text-xs">سختی: {f.feedback.difficultyScore}/۱۰</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => onFinishWorkout(completedFeedbacks)}
            className="w-full py-3.5 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>ذخیره نهایی و بازگشت به برنامه هفتگی</span>
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const isUsingAlt = currentDef.id === 'hamstring_stretch' && currentStatus.isUsingAlternativeSeated;
  const instructionToDisplay = isUsingAlt && currentDef.alternativeInstructionFa
    ? currentDef.alternativeInstructionFa
    : levelInfo.instructionFa;

  const svgToDisplay = isUsingAlt ? 'hamstring_stretch_seated' : currentDef.svgType;
  const progressPercent = Math.round(((currentIndex + 1) / activeDefs.length) * 100);

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-5 text-right space-y-4">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            title="انصراف و خروج از تمرین"
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                حرکت {currentIndex + 1} از {activeDefs.length}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                هفته {currentWeek} - روز {currentDay}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {currentDef.titleFa}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled((v) => !v)}
            title={soundEnabled ? 'قطع صدا' : 'وصل صدا'}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-teal-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={() => setIsPaused((p) => !p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              isPaused ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'ادامه' : 'توقف موقت'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-teal-500 to-emerald-500 h-1.5 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left/Main Column: Visual Illustration and Instruction */}
        <div className="md:col-span-7 bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-100 space-y-4">
          <ExerciseIllustration type={svgToDisplay} className="w-full h-52 sm:h-60" variant="detailed" />

          {/* Level Info Banner */}
          <div className="p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-teal-900 block">
                {isUsingAlt ? 'حالت جایگزین نشسته همسترینگ' : levelInfo.title}
              </span>
              <span className="text-[11px] text-teal-700">
                {currentDef.hasProgression ? `سطح پیشرفت فعلی: ${currentStatus.currentLevel}` : 'حرکت بدون تغییر سطح پیشرفت'}
              </span>
            </div>
            <span className="text-xs font-black px-2.5 py-1 bg-white text-teal-800 rounded-xl border border-teal-200 shadow-2xs shrink-0">
              {levelInfo.holdSeconds} ثانیه مکث
            </span>
          </div>

          {/* Full Clinical Instruction */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-700 leading-relaxed space-y-1">
            <span className="font-bold text-slate-900 block">دستورالعمل نحوه اجرا:</span>
            <p className="whitespace-pre-line text-slate-600">{instructionToDisplay}</p>
          </div>
        </div>

        {/* Right Column: Timer, Repetition & Action Button */}
        <div className="md:col-span-5 flex flex-col justify-between bg-white rounded-2xl p-5 shadow-xs border border-slate-100 space-y-5">
          {/* Phase Badge: Hold vs Rest */}
          <div className="flex items-center justify-between">
            <span className={`text-xs px-3 py-1 rounded-full font-bold border flex items-center gap-1.5 ${
              timerPhase === 'hold'
                ? 'bg-teal-50 text-teal-800 border-teal-300'
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}>
              {timerPhase === 'hold' ? <Clock className="w-3.5 h-3.5" /> : <Coffee className="w-3.5 h-3.5" />}
              <span>{timerPhase === 'hold' ? 'فاز مکث در وضعیت' : 'فاز استراحت بین تکرار'}</span>
            </span>

            {levelInfo.isBilateral && (
              <span className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 font-bold text-slate-700">
                {currentSide === 'right' ? 'سمت اول / پای راست' : 'سمت دوم / پای چپ'}
              </span>
            )}
          </div>

          {/* Rep Counter */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <span className="text-xs text-slate-500 block mb-0.5">تکرار جاری</span>
            <div className="text-lg font-black text-slate-800 flex items-center justify-center gap-1">
              <span>{currentRep}</span>
              <span className="text-xs font-normal text-slate-400">از</span>
              <span>{totalReps}</span>
              <span className="text-xs font-normal text-slate-500 mr-1">تکرار</span>
            </div>
          </div>

          {/* Circular Countdown Timer */}
          <div className="relative flex flex-col items-center justify-center my-auto py-2">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
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
                  className={`transition-all duration-300 ease-linear ${
                    timerPhase === 'hold' ? 'text-teal-600' : 'text-amber-500'
                  }`}
                  strokeWidth="7"
                  strokeDasharray={264}
                  strokeDashoffset={
                    264 -
                    (264 *
                      ((timerPhase === 'hold' ? targetHold : targetRest) - secondsLeft)) /
                      (timerPhase === 'hold' ? targetHold : Math.max(1, targetRest))
                  }
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-slate-900 tracking-tight">
                  {secondsLeft}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  ثانیه {timerPhase === 'hold' ? 'مکث' : 'استراحت'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Timer Triggers */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setSecondsLeft((s) => Math.max(1, s - 3))}
              className="px-2.5 py-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              -۳ ثانیه
            </button>
            <button
              onClick={() => setSecondsLeft(timerPhase === 'hold' ? targetHold : targetRest)}
              title="شروع مجدد تایمر"
              className="p-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSecondsLeft((s) => s + 3)}
              className="px-2.5 py-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              +۳ ثانیه
            </button>
          </div>

          {/* Finish & Feedback Button */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-teal-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-teal-100" />
              <span>پایان این حرکت و ثبت بازخورد ۲ گانه</span>
            </button>
            <p className="text-[11px] text-center text-slate-400">
              ثبت تشدید درد (خیر / خفیف / شدید) و نمره سختی (۱ تا ۱۰)
            </p>
          </div>
        </div>
      </div>

      {/* 2-Question Clinical Feedback Modal */}
      <FeedbackModal
        exerciseDef={currentDef}
        exerciseStatus={currentStatus}
        isOpen={showFeedbackModal}
        currentWeek={currentWeek}
        currentDay={currentDay}
        onClose={() => setShowFeedbackModal(false)}
        onSubmitFeedback={handleFeedbackSubmitted}
      />
    </div>
  );
};
