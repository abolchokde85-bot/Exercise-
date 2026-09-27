export type PainAggravation = 'no' | 'mild' | 'severe'; // ۱) خیر ۲) بله خفیف ۳) بله شدید

export type ExerciseId =
  | 'deep_core'
  | 'mcgill_curlup'
  | 'bird_dog'
  | 'side_plank'
  | 'cobra_pose'
  | 'glute_stretch'
  | 'hamstring_stretch';

export interface ExerciseProgressionLevel {
  levelNumber: number;
  title: string;
  instructionFa: string;
  holdSeconds: number;
  reps: number;
  sets: number;
  restBetweenRepsSeconds: number; // e.g. 5s or 10s or 0 (بدون استراحت)
  isBilateral: boolean; // آیا برای هر دو طرف جداگانه اجرا می‌شود
  hasRestBetweenSides: boolean;
}

export interface StrictExerciseDef {
  id: ExerciseId;
  orderNumber: number;
  titleFa: string;
  englishTitle: string;
  hasProgression: boolean;
  baseInstructionFa: string;
  cues: string[]; // نکات کلیدی و Cues جهت نمایش در وسط صفحه پیش‌نمایش
  levels: ExerciseProgressionLevel[];
  hasAlternativeOnSeverePain: boolean;
  alternativeInstructionFa?: string;
  svgType:
    | 'deep_core'
    | 'mcgill_curlup'
    | 'bird_dog'
    | 'side_plank'
    | 'cobra_pose'
    | 'glute_stretch'
    | 'hamstring_stretch'
    | 'hamstring_stretch_seated';
}

export type AppScreen =
  | 'home' // 1. Home — Low back pain programme icon, calendar, progression chart
  | 'days' // 2. Days — titles only
  | 'session_preview' // 3. Session preview — exercises list with ability to preview each exercise by tapping
  | 'exercise_preview' // 4. Exercise preview — video on top, cues in middle, Start underneath
  | 'exercise_active' // 5. Exercise — video on top, circular countdown in middle (hold), Pause
  | 'rest'; // 6. Rest — next exercise video, rest countdown, Skip rest

export type ThemePaletteId =
  | 'coral_midnight' // تم اصلی تصاویر: نارنجی مرجانی و سرمه‌ای تیره (SteadyBack Coral & Midnight)
  | 'dark_oled' // حالت تاریک کامل OLED
  | 'royal_cobalt' // آبی رویال و کبالت
  | 'deep_purple'; // بنفش و ارغوانی مدرن

export interface ExerciseStatusState {
  exerciseId: ExerciseId;
  currentLevel: number; // 1-indexed
  consecutiveSeverePainDays: number; // if reaches 2 -> excluded for 7 days or switched to seated
  consecutiveUnderFiveDifficultyDays: number; // if reaches 3 -> level up!
  isExcluded: boolean;
  exclusionEndDate?: string; // ISO date string or day number
  exclusionDaysRemaining?: number; // 7 days countdown
  isUsingAlternativeSeated?: boolean; // strictly for hamstring stretch
  historyLogs: {
    date: string;
    dayNumber: number;
    weekNumber: number;
    painAggravation: PainAggravation;
    difficultyScore: number; // 1 to 10
    levelUsed: number;
  }[];
}

export interface UserFeedbackInput {
  painAggravation: PainAggravation; // آیا حرکت سبب تشدید درد شما شد؟
  difficultyScore: number; // به سختی حرکت از ۱ تا ۱۰ نمره دهید (۱-۱۰)
}

export interface DailyWorkoutLog {
  id: string;
  date: string;
  weekNumber: number; // 1 to 12
  dayNumber: number; // 1 to 6 (روزهای تمرین هفته)
  isRestDay: boolean; // روز هفتم
  completedAt?: string;
  exerciseFeedbacks: {
    exerciseId: ExerciseId;
    painAggravation: PainAggravation;
    difficultyScore: number;
    levelUsed: number;
    actionResult: string;
  }[];
}

export interface PatientProfile {
  name: string;
  age: number | string;
  medicalHistory: string;
  painLocation?: string;
  notes?: string;
  startDate?: string;
}

export interface ExerciseHistoryRecord {
  id: string;
  timestamp: number;
  date: string; // تاریخ شمسی
  time: string; // ساعت انجام
  exerciseId: ExerciseId;
  exerciseTitleFa: string;
  level: number;
  difficultyScore: number; // ۱ تا ۱۰
  painLevel: PainAggravation; // 'no' | 'mild' | 'severe'
  painLevelFa: string; // 'بدون درد' | 'درد خفیف' | 'درد شدید'
  weekNumber: number;
  dayNumber: number;
  holdSeconds: number;
  reps: number;
}

export interface AppProtocolState {
  currentWeek: number; // 1 to 12
  currentDayInWeek: number; // 1 to 7 (1-6 workout, 7 rest)
  totalSessionsCompleted: number;
  exerciseStatuses: Record<ExerciseId, ExerciseStatusState>;
  workoutLogs: DailyWorkoutLog[];
  startDate: string;
  patientProfile?: PatientProfile;
  exerciseHistory?: ExerciseHistoryRecord[];
}
