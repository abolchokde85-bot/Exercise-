import React from 'react';
import { AppProtocolState } from '../types';
import { PROTOCOL_EXERCISES } from '../data/exercises';
import {
  Trophy,
  CheckCircle2,
  Calendar,
  ChevronLeft,
  Activity,
  ArrowUpCircle,
  ShieldCheck
} from 'lucide-react';

interface Props {
  week: number;
  day: number;
  feedbacks: {
    exerciseId: string;
    actionSummaryFa: string;
    painAggravation: string;
    difficultyScore: number;
    alertBadge: string;
    alertColor: string;
  }[];
  onReturnToHome: () => void;
}

export const SessionFinishedScreen: React.FC<Props> = ({
  week,
  day,
  feedbacks,
  onReturnToHome
}) => {
  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 text-right animate-in fade-in zoom-in-95 duration-300 pb-10">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 text-center space-y-6">
        <div className="w-18 h-18 bg-gradient-to-tr from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-[#00ad8c]/25">
          <Trophy className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black px-3.5 py-1 bg-[#ecfccb] text-[#365314] rounded-full border border-[#d9f99d]">
            جلسه روز {day} از هفته {week} با موفقیت به پایان رسید
          </span>
          <h2 className="text-2xl font-black text-[#0f2824]">
            تمرین امروز تکمیل شد!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            بازخوردهای ۲ گانه تشدید درد و نمره سختی برای هر ۷ حرکت ثبت گردید و تغییرات لازم در برنامه هفته اعمال شد.
          </p>
        </div>

        {/* Results list */}
        <div className="space-y-2 text-right">
          {feedbacks.map((f, idx) => {
            const def = PROTOCOL_EXERCISES.find((p) => p.id === f.exerciseId);
            return (
              <div
                key={idx}
                className="p-3.5 bg-[#f8fbf9] rounded-2xl border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-black text-[#0f2824] ml-1">{def?.titleFa}</span>
                  <span className="text-slate-500 text-[11px] block mt-0.5">{f.actionSummaryFa}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md font-black text-[10px] border ${f.alertColor}`}>
                    {f.alertBadge}
                  </span>
                  <span className="font-black text-[#0f2824] text-xs">
                    سختی: {f.difficultyScore}/۱۰
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onReturnToHome}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] hover:opacity-95 text-white font-black text-sm sm:text-base rounded-2xl sm:rounded-3xl shadow-xl shadow-[#00ad8c]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>بازگشت به صفحه اصلی</span>
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
