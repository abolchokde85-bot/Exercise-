import React, { useState } from 'react';
import { AppProtocolState, ThemePaletteId } from '../types';
import { PROTOCOL_EXERCISES } from '../data/exercises';
import {
  Activity,
  Play,
  Calendar,
  TrendingUp,
  Award,
  ChevronLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Flame,
  ArrowRight,
  Menu,
  Sparkles,
  Info,
  User,
  Check
} from 'lucide-react';

interface Props {
  protocolState: AppProtocolState;
  onStartTodaySession: () => void;
  onOpenDays: () => void;
  onSelectDay: (week: number, day: number) => void;
  onOpenProfile?: () => void;
  currentTheme?: ThemePaletteId;
}

export const HomeScreen: React.FC<Props> = ({
  protocolState,
  onStartTodaySession,
  onOpenDays,
  onSelectDay,
  onOpenProfile,
  currentTheme = 'coral_midnight'
}) => {
  const { currentWeek, currentDayInWeek, totalSessionsCompleted, exerciseStatuses, patientProfile } = protocolState;
  const isRestDay = currentDayInWeek === 7;

  // Patient info fallback
  const patientName = patientProfile?.name || 'آنا کلر';

  // Compute initials
  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return 'ک م';
    if (parts.length === 1) return parts[0].substring(0, 2);
    return `${parts[0][0]} ${parts[parts.length - 1][0]}`;
  };

  // Selected morning pain scale (from 0 to 10)
  const [morningPain, setMorningPain] = useState<number | null>(null);

  // Count exercises with level upgrades
  const upgradedCount = Object.values(exerciseStatuses).filter((st) => st.currentLevel > 1).length;

  return (
    <div className="max-w-xl mx-auto space-y-5 text-right animate-in fade-in duration-200 pb-10">
      {/* 1. App Header with Avatar, SteadyBack brand & Menu Icon */}
      <div className="flex items-center justify-between pt-1">
        {/* User Avatar with Turquoise to Lime Gradient */}
        <button
          onClick={onOpenProfile || onStartTodaySession}
          title="مشاهده پروفایل و پرونده بیمار"
          className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#008ba3] via-[#00ad8c] to-[#72c02c] p-0.5 shadow-md shadow-[#00ad8c]/25 cursor-pointer hover:scale-105 active:scale-95 transition-transform shrink-0"
        >
          <div className="w-full h-full rounded-[14px] flex items-center justify-center text-white font-black text-sm">
            {getInitials(patientName)}
          </div>
        </button>

        {/* Brand Title */}
        <div className="text-center">
          <h1 className="text-xl font-black text-[#0f2824] tracking-tight">
            SteadyBack
          </h1>
          <span className="text-[10px] text-[#008ba3] font-bold block -mt-0.5">
            تسکین‌کمر • سامانه جامع توانبخشی
          </span>
        </div>

        {/* Menu button */}
        <button
          onClick={onOpenDays}
          className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          title="مشاهده روزهای برنامه تمرینی"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      {/* 2. User Greeting & Programme launcher badge */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black text-[#008ba3] tracking-wider block">
              صبح بخیر
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f2824]">
              {patientName}
            </h2>
          </div>

          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-[#ecfccb] hover:text-[#365314] transition-all shadow-2xs cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#00ad8c]" />
              <span>پروفایل بیمار</span>
            </button>
          )}
        </div>

        {/* Low back pain programme Launcher */}
        <button
          onClick={onStartTodaySession}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ecfccb] hover:bg-[#e4f8b9] text-[#365314] border border-[#d9f99d] text-xs font-black shadow-2xs transition-all cursor-pointer hover:scale-102"
        >
          <span className="w-2 h-2 rounded-full bg-[#65a30d] animate-pulse" />
          <span>برنامه تخصصی توانبخشی ستون فقرات و کمردرد</span>
        </button>
      </div>

      {/* 3. Card 1: TODAY'S SCHEDULE (برنامه تمرین امروز) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 space-y-4">
        <div>
          <span className="text-[11px] font-black text-[#008ba3] tracking-wider block">
            برنامه تمرین امروز
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#0f2824] mt-0.5">
            {isRestDay ? 'جمعه: استراحت و ریکاوری هفتگی' : `روز ${currentDayInWeek} از هفته ${currentWeek}`}
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            جلسه توانبخشی و تقویت ستون فقرات • روز {currentDayInWeek} از ۱۲ هفته
          </p>
        </div>

        {/* Calendar Row with Persian Day Labels */}
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {[
            { labelFa: 'یک', dayIndex: 1 },
            { labelFa: 'دو', dayIndex: 2 },
            { labelFa: 'سه', dayIndex: 3 },
            { labelFa: 'چهار', dayIndex: 4 },
            { labelFa: 'پنج', dayIndex: 5 },
            { labelFa: 'جمعه', dayIndex: 7 },
            { labelFa: 'شنبه', dayIndex: 6 }
          ].map((item, idx) => {
            const isToday = currentDayInWeek === item.dayIndex;
            const isCompleted = item.dayIndex < currentDayInWeek;

            return (
              <button
                key={idx}
                onClick={() => onSelectDay(currentWeek, item.dayIndex)}
                className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-between text-center transition-all cursor-pointer ${
                  isToday
                    ? 'bg-gradient-to-b from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white font-black shadow-md shadow-[#00ad8c]/30 scale-105'
                    : isCompleted
                    ? 'bg-[#ecfccb] text-[#365314] font-bold hover:bg-[#e4f8b9]'
                    : 'bg-[#f0f9ff] text-[#0369a1] font-semibold hover:bg-sky-100'
                }`}
              >
                <span className="text-[10px] font-bold opacity-90">{item.labelFa}</span>
                <span className="text-sm font-black my-0.5">{item.dayIndex}</span>
              </button>
            );
          })}
        </div>

        {/* 3 Metric Pills: زمان شروع، مدت زمان، تعداد حرکات */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div className="bg-[#f0f9ff] rounded-2xl p-3 text-center">
            <span className="text-[10px] font-black text-[#008ba3] block">
              زمان شروع
            </span>
            <span className="text-base sm:text-lg font-black text-[#0f2824] block mt-0.5">
              ۰۹:۳۰
            </span>
          </div>

          <div className="bg-[#f0f9ff] rounded-2xl p-3 text-center">
            <span className="text-[10px] font-black text-[#008ba3] block">
              مدت زمان
            </span>
            <span className="text-base sm:text-lg font-black text-[#0f2824] block mt-0.5">
              ۱۸ دقیقه
            </span>
          </div>

          <div className="bg-[#f0f9ff] rounded-2xl p-3 text-center">
            <span className="text-[10px] font-black text-[#008ba3] block">
              تعداد حرکات
            </span>
            <span className="text-base sm:text-lg font-black text-[#0f2824] block mt-0.5">
              ۷ حرکت
            </span>
          </div>
        </div>
      </div>

      {/* 4. Card 2: PAIN SCALE (ارزیابی درد صبحگاهی) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black text-[#008ba3] tracking-wider block">
              ارزیابی درد صبحگاهی
            </span>
            <h3 className="text-base sm:text-lg font-black text-[#0f2824] mt-0.5">
              وضعیت درد کمر شما امروز صبح چگونه است؟
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              از ۰ (بدون درد) تا ۱۰ (شدیدترین درد) میزان احساس ناراحتی را مشخص کنید.
            </p>
          </div>

          <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">
            {morningPain !== null ? `${morningPain} از ۱۰` : '—'}
          </span>
        </div>

        {/* 0 to 10 Scale Buttons */}
        <div className="grid grid-cols-11 gap-1 pt-1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            const isSelected = morningPain === num;
            return (
              <button
                key={num}
                onClick={() => setMorningPain(num)}
                className={`py-2 text-xs rounded-xl border text-center transition-all cursor-pointer font-bold ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#008ba3] to-[#72c02c] text-white border-transparent shadow-sm scale-105'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
          <span>بدون درد (۰)</span>
          <span>درد شدید (۱۰)</span>
        </div>
      </div>

      {/* 5. Progression Chart Section (نمودار پیشرفت ۷ حرکت درمانی - بدون نمایش قوانین داخلی) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#ecfccb] text-[#365314]">
              <TrendingUp className="w-5 h-5 text-[#65a30d]" />
            </div>
            <div>
              <span className="text-[11px] font-black text-[#008ba3] tracking-wider block">
                روند پیشرفت تمرینات
              </span>
              <h3 className="text-base font-black text-[#0f2824]">
                وضعیت آمادگی ۷ حرکت درمانی
              </h3>
            </div>
          </div>

          <span className="text-xs font-bold text-[#365314] bg-[#ecfccb] px-3 py-1 rounded-full border border-[#d9f99d]">
            {upgradedCount} حرکت در سطوح بالاتر
          </span>
        </div>

        {/* 7 Exercises Progress Bars (Clean without exposed internal rules) */}
        <div className="space-y-3 pt-1">
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

            const maxLvl = ex.levels.length;
            const curLvl = st.currentLevel;
            const levelPercentage = Math.round((curLvl / maxLvl) * 100);

            return (
              <div key={ex.id} className="p-3 bg-[#f8fbf9] rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#008ba3] text-white font-black text-[10px] flex items-center justify-center">
                      {ex.orderNumber}
                    </span>
                    <span className="font-bold text-[#0f2824]">{ex.titleFa}</span>
                    {st.isExcluded && (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                        استراحت موقت
                      </span>
                    )}
                    {st.isUsingAlternativeSeated && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        حالت نشسته
                      </span>
                    )}
                  </div>

                  <span className="font-bold text-[#008ba3]">
                    {ex.hasProgression ? `سطح ${curLvl} از ${maxLvl}` : 'سطح ثابت استاندارد'}
                  </span>
                </div>

                {/* Progress bar with Turquoise to Lime Gradient */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      st.isExcluded
                        ? 'bg-rose-500'
                        : 'bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c]'
                    }`}
                    style={{ width: `${ex.hasProgression ? levelPercentage : 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Big CTA Button: شروع جلسه تمرین امروز */}
      <div className="pt-2 space-y-3">
        <button
          onClick={onStartTodaySession}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] hover:opacity-95 active:scale-[0.99] text-white font-black text-base sm:text-lg rounded-2xl sm:rounded-3xl shadow-xl shadow-[#00ad8c]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>شروع جلسه تمرین امروز</span>
          <Play className="w-5 h-5 fill-current" />
        </button>

        {/* View all days link underneath */}
        <div className="text-center">
          <button
            onClick={onOpenDays}
            className="text-xs sm:text-sm font-bold text-[#008ba3] hover:text-[#00ad8c] hover:underline cursor-pointer transition-colors"
          >
            مشاهده تمام روزهای برنامه (۱۲ هفته)
          </button>
        </div>
      </div>
    </div>
  );
};
