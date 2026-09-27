import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Coffee
} from 'lucide-react';

interface Props {
  currentWeek: number;
  currentDay: number;
  onSelectDay: (week: number, day: number) => void;
  onBackToHome: () => void;
}

export const DaysScreen: React.FC<Props> = ({
  currentWeek,
  currentDay,
  onSelectDay,
  onBackToHome
}) => {
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  return (
    <div className="max-w-xl mx-auto space-y-5 text-right animate-in fade-in duration-200 pb-10">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="بازگشت به خانه"
          >
            <ArrowRight className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0f2824]">
              روزهای برنامه تمرینی
            </h1>
            <p className="text-xs text-slate-500 font-semibold">
              فهرست جلسات و عناوین تمرینات در طول ۱۲ هفته
            </p>
          </div>
        </div>

        {/* Week Switcher */}
        <div className="flex items-center gap-1.5 bg-[#f0f9ff] p-1.5 rounded-2xl border border-sky-100">
          <button
            onClick={() => setSelectedWeek((w) => Math.max(1, w - 1))}
            disabled={selectedWeek <= 1}
            className="p-1 rounded-xl hover:bg-white text-slate-600 disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-xs font-black text-[#008ba3] px-2">
            هفته {selectedWeek} از ۱۲
          </span>
          <button
            onClick={() => setSelectedWeek((w) => Math.min(12, w + 1))}
            disabled={selectedWeek >= 12}
            className="p-1 rounded-xl hover:bg-white text-slate-600 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days List — Titles only (Requirement 2) */}
      <div className="space-y-3">
        {[
          { day: 1, title: 'روز اول: تمرین ۷ گانه توانبخشی کمر', isRest: false },
          { day: 2, title: 'روز دوم: تمرین ۷ گانه توانبخشی کمر', isRest: false },
          { day: 3, title: 'روز سوم: تمرین ۷ گانه توانبخشی کمر', isRest: false },
          { day: 4, title: 'روز چهارم: تمرین ۷ گانه توانبخشی کمر', isRest: false },
          { day: 5, title: 'روز پنجم: تمرین ۷ گانه توانبخشی کمر', isRest: false },
          { day: 6, title: 'روز ششم: تمرین ۷ گانه توانبخشی کمر', isRest: false },
          { day: 7, title: 'روز هفتم: استراحت و ریکاوری هفتگی', isRest: true }
        ].map((item) => {
          const isCurrentActiveDay = selectedWeek === currentWeek && currentDay === item.day;
          const isPassedDay = selectedWeek < currentWeek || (selectedWeek === currentWeek && item.day < currentDay);

          return (
            <div
              key={item.day}
              onClick={() => onSelectDay(selectedWeek, item.day)}
              className={`p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${
                isCurrentActiveDay
                  ? 'border-[#00ad8c] bg-[#ecfccb]/50 shadow-sm ring-1 ring-[#00ad8c]'
                  : 'bg-white border-slate-100 hover:border-[#00ad8c]/50 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black ${
                    item.isRest
                      ? 'bg-[#ecfccb] text-[#365314]'
                      : isCurrentActiveDay
                      ? 'bg-gradient-to-tr from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white shadow-md shadow-[#00ad8c]/25'
                      : 'bg-[#f0f9ff] text-[#0369a1]'
                  }`}
                >
                  {item.day}
                </span>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0f2824]">
                    هفته {selectedWeek} — {item.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isPassedDay && (
                  <span className="text-xs text-[#365314] font-bold flex items-center gap-1 bg-[#ecfccb] px-2.5 py-0.5 rounded-full border border-[#d9f99d]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d]" />
                    <span>تکمیل شده</span>
                  </span>
                )}

                {isCurrentActiveDay && (
                  <span className="text-xs text-[#008ba3] font-black bg-white px-2.5 py-1 rounded-xl border border-sky-100 shadow-2xs">
                    جلسه امروز
                  </span>
                )}

                {item.isRest ? (
                  <Coffee className="w-4 h-4 text-[#65a30d]" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
