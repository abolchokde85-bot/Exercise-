import React, { useState, useEffect } from 'react';
import {
  AppProtocolState,
  ExerciseId,
  StrictExerciseDef,
  UserFeedbackInput,
  DailyWorkoutLog,
  ThemePaletteId,
  PatientProfile,
  ExerciseHistoryRecord
} from './types';
import { PROTOCOL_EXERCISES } from './data/exercises';
import {
  INITIAL_PROTOCOL_STATE,
  loadProtocolState,
  saveProtocolState
} from './data/initialData';
import {
  evaluateExerciseFeedback,
  decrementExclusionDaysForNewSession,
  FeedbackEvaluationResult
} from './utils/adaptiveEngine';
import { THEMES } from './utils/theme';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { DaysScreen } from './components/DaysScreen';
import { SessionPreviewScreen } from './components/SessionPreviewScreen';
import { ExercisePreviewScreen } from './components/ExercisePreviewScreen';
import { ExerciseActiveScreen } from './components/ExerciseActiveScreen';
import { RestScreen } from './components/RestScreen';
import { FeedbackModal } from './components/FeedbackModal';
import { SessionFinishedScreen } from './components/SessionFinishedScreen';
import { PatientProfileScreen } from './components/PatientProfileScreen';
import { RecoveryAnalytics } from './components/RecoveryAnalytics';
import { SafetyHub } from './components/SafetyHub';
import { Sparkles, X, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

type ScreenType =
  | 'home' // 1. Home
  | 'days' // 2. Days
  | 'session_preview' // 3. Session preview
  | 'exercise_preview' // 4. Exercise preview
  | 'exercise_active' // 5. Exercise
  | 'rest' // 6. Rest
  | 'session_finished'
  | 'profile' // Patient profile & history
  | 'analytics'
  | 'safety';

export default function App() {
  const [protocolState, setProtocolState] = useState<AppProtocolState>(INITIAL_PROTOCOL_STATE);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Active Screen
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

  // Active Theme Palette (Default is coral_midnight matching SteadyBack photos)
  const [currentTheme, setCurrentTheme] = useState<ThemePaletteId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('steadyback_theme');
      if (saved && saved in THEMES) return saved as ThemePaletteId;
    }
    return 'coral_midnight';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('steadyback_theme', currentTheme);
    }
  }, [currentTheme]);

  const activeTheme = THEMES[currentTheme] || THEMES.coral_midnight;
  const isDark = currentTheme === 'dark_oled';

  // Workout state tracking
  const [activeWorkoutIndex, setActiveWorkoutIndex] = useState(0);
  const [previewingExerciseDef, setPreviewingExerciseDef] = useState<StrictExerciseDef>(PROTOCOL_EXERCISES[0]);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [sessionFeedbacks, setSessionFeedbacks] = useState<{
    exerciseId: string;
    feedback: UserFeedbackInput;
    result: FeedbackEvaluationResult;
    actionSummaryFa: string;
    painAggravation: string;
    difficultyScore: number;
    alertBadge: string;
    alertColor: string;
  }[]>([]);

  // Toast
  const [toast, setToast] = useState<{
    title: string;
    message: string;
    type: 'upgrade' | 'alert' | 'info';
  } | null>(null);

  // Load from localStorage
  useEffect(() => {
    const loaded = loadProtocolState();
    setProtocolState(loaded);
    setDataLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!dataLoaded) return;
    saveProtocolState(protocolState);
  }, [protocolState, dataLoaded]);

  // Active exercises are those not excluded (7 mandatory unless excluded by 2-day severe pain rule)
  const activeExerciseDefs = PROTOCOL_EXERCISES.filter((ex) => {
    const st = protocolState.exerciseStatuses[ex.id];
    return !st || !st.isExcluded;
  });

  // Flow Step 1: Start today's session from Home
  const handleStartTodaySession = () => {
    setCurrentScreen('session_preview');
  };

  // Flow Step 2: Start session from Session Preview
  const handleStartSession = () => {
    setActiveWorkoutIndex(0);
    setSessionFeedbacks([]);
    const firstDef = activeExerciseDefs[0] || PROTOCOL_EXERCISES[0];
    setPreviewingExerciseDef(firstDef);
    setCurrentScreen('exercise_preview');
  };

  // Flow Step 3: Start from Exercise Preview to Active Exercise
  const handleStartActiveExercise = () => {
    setCurrentScreen('exercise_active');
  };

  // Flow Step 4: Finish Exercise Hold -> Open Feedback Check-in
  const handleFinishExerciseHold = () => {
    setShowCheckInModal(true);
  };

  // Flow Step 5: Submit Feedback -> Check if more exercises -> Rest Screen or Session Finished
  const handleSubmitFeedback = (feedback: UserFeedbackInput, evalResult: FeedbackEvaluationResult) => {
    setShowCheckInModal(false);

    // Apply evaluation to state
    const currentExDef = activeExerciseDefs[activeWorkoutIndex] || PROTOCOL_EXERCISES[activeWorkoutIndex];

    const updatedStatuses = {
      ...protocolState.exerciseStatuses,
      [currentExDef.id]: evalResult.updatedState
    };

    // Create ExerciseHistoryRecord
    const currentLvl = protocolState.exerciseStatuses[currentExDef.id]?.currentLevel || 1;
    const currentLvlInfo = currentExDef.levels[currentLvl - 1] || currentExDef.levels[0];

    const historyRecord: ExerciseHistoryRecord = {
      id: `hist-${Date.now()}-${currentExDef.id}`,
      timestamp: Date.now(),
      date: new Date().toLocaleDateString('fa-IR'),
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      exerciseId: currentExDef.id,
      exerciseTitleFa: currentExDef.titleFa,
      level: currentLvl,
      difficultyScore: feedback.difficultyScore,
      painLevel: feedback.painAggravation,
      painLevelFa:
        feedback.painAggravation === 'no'
          ? 'بدون درد'
          : feedback.painAggravation === 'mild'
          ? 'درد خفیف'
          : 'درد شدید',
      weekNumber: protocolState.currentWeek,
      dayNumber: protocolState.currentDayInWeek,
      holdSeconds: currentLvlInfo.holdSeconds,
      reps: currentLvlInfo.reps
    };

    setProtocolState((prev) => ({
      ...prev,
      exerciseStatuses: updatedStatuses,
      exerciseHistory: [historyRecord, ...(prev.exerciseHistory || [])]
    }));

    const feedbackRecord = {
      exerciseId: currentExDef.id,
      feedback,
      result: evalResult,
      actionSummaryFa: evalResult.actionSummaryFa,
      painAggravation: feedback.painAggravation,
      difficultyScore: feedback.difficultyScore,
      alertBadge: evalResult.alertBadge || 'ثبت شد',
      alertColor: evalResult.alertColor || 'bg-teal-50 text-teal-800'
    };

    const newFeedbacks = [...sessionFeedbacks, feedbackRecord];
    setSessionFeedbacks(newFeedbacks);

    // Toast notice
    if (evalResult.actionType === 'upgraded') {
      setToast({
        title: 'ارتقای سطح حرکت!',
        message: evalResult.actionSummaryFa,
        type: 'upgrade'
      });
    } else if (evalResult.actionType === 'excluded_7_days' || evalResult.actionType === 'switched_to_seated') {
      setToast({
        title: 'تعدیل برنامه به علت تشدید درد',
        message: evalResult.actionSummaryFa,
        type: 'alert'
      });
    }

    // Is there a next exercise?
    if (activeWorkoutIndex < activeExerciseDefs.length - 1) {
      // Transition to Screen 6: Rest!
      setCurrentScreen('rest');
    } else {
      // All exercises finished!
      finalizeWorkout(newFeedbacks);
    }
  };

  // Flow Step 6: Rest finished or Skip rest -> Next Exercise Preview
  const handleSkipRest = () => {
    const nextIndex = activeWorkoutIndex + 1;
    setActiveWorkoutIndex(nextIndex);
    const nextDef = activeExerciseDefs[nextIndex];
    if (nextDef) {
      setPreviewingExerciseDef(nextDef);
      setCurrentScreen('exercise_preview');
    }
  };

  // Finalize workout session
  const finalizeWorkout = (feedbacks: typeof sessionFeedbacks) => {
    const newLog: DailyWorkoutLog = {
      id: `log-${Date.now()}`,
      date: new Date().toLocaleDateString('fa-IR'),
      weekNumber: protocolState.currentWeek,
      dayNumber: protocolState.currentDayInWeek,
      isRestDay: protocolState.currentDayInWeek === 7,
      completedAt: new Date().toLocaleDateString('fa-IR'),
      exerciseFeedbacks: feedbacks.map((f) => ({
        exerciseId: f.exerciseId as ExerciseId,
        painAggravation: f.feedback.painAggravation,
        difficultyScore: f.feedback.difficultyScore,
        levelUsed: protocolState.exerciseStatuses[f.exerciseId as ExerciseId]?.currentLevel || 1,
        actionResult: f.actionSummaryFa
      }))
    };

    setProtocolState((prev) => ({
      ...prev,
      totalSessionsCompleted: prev.totalSessionsCompleted + 1,
      workoutLogs: [newLog, ...prev.workoutLogs]
    }));

    setCurrentScreen('session_finished');

    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  // Select a specific day (from calendar or Days screen)
  const handleSelectDay = (week: number, day: number) => {
    const updatedStatuses = decrementExclusionDaysForNewSession(protocolState.exerciseStatuses);
    setProtocolState((prev) => ({
      ...prev,
      currentWeek: week,
      currentDayInWeek: day,
      exerciseStatuses: updatedStatuses
    }));
    setCurrentScreen('session_preview');
  };

  // Reset to week 1 day 1
  const handleResetToInitial = () => {
    if (window.confirm('آیا مایل به بازنشانی برنامه به روز اول هفته اول هستید؟')) {
      setProtocolState(INITIAL_PROTOCOL_STATE);
      saveProtocolState(INITIAL_PROTOCOL_STATE);
      setCurrentScreen('home');
      setToast({
        title: 'بازنشانی انجام شد',
        message: 'برنامه به وضعیت اولیه روز ۱ هفته ۱ بازگشت.',
        type: 'info'
      });
    }
  };

  const handleUpdatePatientProfile = (updatedProfile: PatientProfile) => {
    setProtocolState((prev) => ({
      ...prev,
      patientProfile: updatedProfile
    }));
    setToast({
      title: 'مشخصات بیمار به‌روزرسانی شد',
      message: 'پرونده پزشکی و مشخصات فردی با موفقیت ذخیره گردید.',
      type: 'upgrade'
    });
  };

  const currentExerciseDef = activeExerciseDefs[activeWorkoutIndex] || PROTOCOL_EXERCISES[0];
  const nextExerciseDef = activeWorkoutIndex < activeExerciseDefs.length - 1
    ? activeExerciseDefs[activeWorkoutIndex + 1]
    : null;

  return (
    <div className={`min-h-screen ${activeTheme.bgPage} ${activeTheme.textMain} flex flex-col font-sans transition-colors duration-200 selection:bg-[#ecfccb] selection:text-[#365314]`}>
      {/* Top Navbar (visible on main browsing screens) */}
      {(currentScreen === 'home' || currentScreen === 'days' || currentScreen === 'profile' || currentScreen === 'analytics' || currentScreen === 'safety') && (
        <Navbar
          activeTab={
            currentScreen === 'days'
              ? 'library'
              : currentScreen === 'profile'
              ? 'profile'
              : currentScreen === 'analytics'
              ? 'analytics'
              : currentScreen === 'safety'
              ? 'safety'
              : 'daily'
          }
          onSelectTab={(tab) => {
            if (tab === 'daily') setCurrentScreen('home');
            else if (tab === 'library') setCurrentScreen('days');
            else if (tab === 'profile') setCurrentScreen('profile');
            else if (tab === 'analytics') setCurrentScreen('analytics');
            else if (tab === 'safety') setCurrentScreen('safety');
          }}
          currentWeek={protocolState.currentWeek}
          currentDay={protocolState.currentDayInWeek}
          currentTheme={currentTheme}
          onSelectTheme={setCurrentTheme}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
        {/* 1. Home Screen */}
        {currentScreen === 'home' && (
          <HomeScreen
            protocolState={protocolState}
            onStartTodaySession={handleStartTodaySession}
            onOpenDays={() => setCurrentScreen('days')}
            onSelectDay={handleSelectDay}
            onOpenProfile={() => setCurrentScreen('profile')}
            currentTheme={currentTheme}
          />
        )}

        {/* 2. Days Screen (Titles only) */}
        {currentScreen === 'days' && (
          <DaysScreen
            currentWeek={protocolState.currentWeek}
            currentDay={protocolState.currentDayInWeek}
            onSelectDay={handleSelectDay}
            onBackToHome={() => setCurrentScreen('home')}
          />
        )}

        {/* Patient Profile & Exercise History Screen */}
        {currentScreen === 'profile' && (
          <PatientProfileScreen
            profile={
              protocolState.patientProfile || {
                name: 'آنا کلر',
                age: 38,
                medicalHistory: 'سابقه بیرون‌زدگی خفیف دیسک مهره‌های L4-L5',
                painLocation: 'پایین کمر'
              }
            }
            exerciseHistory={protocolState.exerciseHistory || []}
            onUpdateProfile={handleUpdatePatientProfile}
            onBackToHome={() => setCurrentScreen('home')}
          />
        )}

        {/* 3. Session Preview Screen */}
        {currentScreen === 'session_preview' && (
          <SessionPreviewScreen
            week={protocolState.currentWeek}
            day={protocolState.currentDayInWeek}
            statuses={protocolState.exerciseStatuses}
            onBack={() => setCurrentScreen('home')}
            onPreviewExercise={(def) => {
              setPreviewingExerciseDef(def);
              setCurrentScreen('exercise_preview');
            }}
            onStartSession={handleStartSession}
          />
        )}

        {/* 4. Exercise Preview Screen */}
        {currentScreen === 'exercise_preview' && (
          <ExercisePreviewScreen
            exerciseDef={previewingExerciseDef}
            status={protocolState.exerciseStatuses[previewingExerciseDef.id] || {
              exerciseId: previewingExerciseDef.id,
              currentLevel: 1,
              consecutiveSeverePainDays: 0,
              consecutiveUnderFiveDifficultyDays: 0,
              isExcluded: false,
              isUsingAlternativeSeated: false,
              historyLogs: []
            }}
            onStartExercise={handleStartActiveExercise}
            onBack={() => setCurrentScreen('session_preview')}
          />
        )}

        {/* 5. Exercise Active Screen (Circular hold countdown & pause) */}
        {currentScreen === 'exercise_active' && (
          <ExerciseActiveScreen
            exerciseDef={currentExerciseDef}
            status={protocolState.exerciseStatuses[currentExerciseDef.id] || {
              exerciseId: currentExerciseDef.id,
              currentLevel: 1,
              consecutiveSeverePainDays: 0,
              consecutiveUnderFiveDifficultyDays: 0,
              isExcluded: false,
              isUsingAlternativeSeated: false,
              historyLogs: []
            }}
            currentIndex={activeWorkoutIndex}
            totalExercises={activeExerciseDefs.length}
            onFinishExercise={handleFinishExerciseHold}
            onCancel={() => setCurrentScreen('session_preview')}
          />
        )}

        {/* 6. Rest Screen (Next exercise video, rest countdown, Skip rest) */}
        {currentScreen === 'rest' && (
          <RestScreen
            nextExerciseDef={nextExerciseDef}
            nextStatus={nextExerciseDef ? protocolState.exerciseStatuses[nextExerciseDef.id] : undefined}
            nextIndex={activeWorkoutIndex + 1}
            totalExercises={activeExerciseDefs.length}
            initialRestSeconds={15}
            onSkipRest={handleSkipRest}
          />
        )}

        {/* 7. Session Finished Screen */}
        {currentScreen === 'session_finished' && (
          <SessionFinishedScreen
            week={protocolState.currentWeek}
            day={protocolState.currentDayInWeek}
            feedbacks={sessionFeedbacks}
            onReturnToHome={() => setCurrentScreen('home')}
          />
        )}

        {/* Analytics Tab */}
        {currentScreen === 'analytics' && (
          <RecoveryAnalytics protocolState={protocolState} />
        )}

        {/* Safety Tab */}
        {currentScreen === 'safety' && <SafetyHub />}
      </main>

      {/* Pain / Effort Check-in Modal (Between Exercise Active & Rest) */}
      <FeedbackModal
        exerciseDef={currentExerciseDef}
        exerciseStatus={protocolState.exerciseStatuses[currentExerciseDef.id] || {
          exerciseId: currentExerciseDef.id,
          currentLevel: 1,
          consecutiveSeverePainDays: 0,
          consecutiveUnderFiveDifficultyDays: 0,
          isExcluded: false,
          isUsingAlternativeSeated: false,
          historyLogs: []
        }}
        isOpen={showCheckInModal}
        currentWeek={protocolState.currentWeek}
        currentDay={protocolState.currentDayInWeek}
        onClose={() => setShowCheckInModal(false)}
        onSubmitFeedback={handleSubmitFeedback}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 left-5 sm:left-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div
            className={`p-4 rounded-2xl shadow-xl border text-right flex items-start gap-3 ${
              toast.type === 'upgrade'
                ? 'bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white border-transparent shadow-[#00ad8c]/30'
                : toast.type === 'alert'
                ? 'bg-rose-900 text-white border-rose-700 shadow-rose-950/20'
                : 'bg-slate-900 text-white border-slate-700 shadow-slate-950/20'
            }`}
          >
            <div className="p-1.5 rounded-xl bg-white/10 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-[#ecfccb]" />
            </div>
            <div className="flex-1 space-y-1">
              <h5 className="text-xs sm:text-sm font-bold">{toast.title}</h5>
              <p className="text-xs text-white/90 leading-relaxed font-normal">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-white/60 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      {(currentScreen === 'home' || currentScreen === 'days' || currentScreen === 'profile' || currentScreen === 'analytics' || currentScreen === 'safety') && (
        <footer className={`mt-auto border-t py-5 text-center text-xs transition-colors ${
          isDark ? 'border-slate-800 bg-[#09090b] text-slate-400' : 'border-slate-100 bg-white text-slate-500'
        }`}>
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              پروتکل ۱۲ هفته‌ای تمرین‌درمانی کمردرد | ۶ روز تمرین در هفته + ۱ روز استراحت
            </p>
            <div className="flex items-center gap-4 text-[#008ba3] font-semibold">
              <button
                onClick={handleResetToInitial}
                className="hover:underline text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>شروع مجدد دوره از ابتدا</span>
              </button>
              <span>•</span>
              <button
                onClick={() => setCurrentScreen('safety')}
                className="hover:underline cursor-pointer"
              >
                علائم هشدار قرمز
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
