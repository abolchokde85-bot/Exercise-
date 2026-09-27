import React, { useState } from 'react';
import {
  PainAggravation,
  StrictExerciseDef,
  ExerciseStatusState,
  UserFeedbackInput
} from '../types';
import { evaluateExerciseFeedback, FeedbackEvaluationResult } from '../utils/adaptiveEngine';
import {
  HeartPulse,
  Sparkles,
  ChevronLeft,
  CheckCircle2,
  Smile,
  AlertCircle
} from 'lucide-react';

interface Props {
  exerciseDef: StrictExerciseDef;
  exerciseStatus: ExerciseStatusState;
  isOpen: boolean;
  currentWeek: number;
  currentDay: number;
  onClose: () => void;
  onSubmitFeedback: (feedback: UserFeedbackInput, result: FeedbackEvaluationResult) => void;
}

export const FeedbackModal: React.FC<Props> = ({
  exerciseDef,
  exerciseStatus,
  isOpen,
  currentWeek,
  currentDay,
  onClose,
  onSubmitFeedback
}) => {
  const [painAggravation, setPainAggravation] = useState<PainAggravation>('no');
  const [difficultyScore, setDifficultyScore] = useState<number>(3);

  if (!isOpen) return null;

  // Evaluate preview of outcome in real-time
  const preview = evaluateExerciseFeedback(
    exerciseStatus,
    exerciseDef,
    { painAggravation, difficultyScore },
    currentWeek,
    currentDay
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitFeedback({ painAggravation, difficultyScore }, preview);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-right">
        {/* Header with Turquoise to Lime Gradient */}
        <div className="bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs text-white">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black">ثبت بازخورد تمرین</h2>
              <p className="text-xs text-white/90 font-medium">
                {exerciseDef.titleFa}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Question 1: آیا حرکت سبب تشدید درد شما شد؟ */}
          <div className="space-y-3">
            <label className="text-sm font-black text-[#0f2824] flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-[#ecfccb] text-[#365314] text-xs flex items-center justify-center font-black">
                ۱
              </span>
              <span>آیا در حین یا پس از این حرکت، احساس تشدید درد داشتید؟</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'no',
                  num: '۱',
                  title: 'خیر (بدون درد)',
                  desc: 'تمرین بدون احساس ناراحتی انجام شد',
                  activeStyle: 'border-[#00ad8c] bg-[#ecfccb]/60 text-[#365314] ring-2 ring-[#00ad8c]'
                },
                {
                  id: 'mild',
                  num: '۲',
                  title: 'بله خفیف',
                  desc: 'کشش یا درد ملایم و گذرا',
                  activeStyle: 'border-amber-500 bg-amber-50/80 text-amber-950 ring-2 ring-amber-400'
                },
                {
                  id: 'severe',
                  num: '۳',
                  title: 'بله شدید',
                  desc: 'درد تیز، گزنده یا ناخوشایند',
                  activeStyle: 'border-rose-600 bg-rose-50/80 text-rose-950 ring-2 ring-rose-500'
                }
              ].map((opt) => {
                const isSelected = painAggravation === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setPainAggravation(opt.id as PainAggravation)}
                    className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? opt.activeStyle
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black">
                        {opt.num}) {opt.title}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00ad8c]" />}
                    </div>
                    <span className="text-[11px] text-slate-500">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: نمره سختی حرکت از ۱ تا ۱۰ */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-black text-[#0f2824] flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[#ecfccb] text-[#365314] text-xs flex items-center justify-center font-black">
                  ۲
                </span>
                <span>میزان سختی و دشواری این حرکت از نظر شما:</span>
              </label>

              <span className={`text-xs px-2.5 py-1 rounded-full font-black ${
                difficultyScore < 5
                  ? 'bg-[#ecfccb] text-[#365314] border border-[#d9f99d]'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                نمره سختی: {difficultyScore} از ۱۰
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="1"
              max="10"
              value={difficultyScore}
              onChange={(e) => setDifficultyScore(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00ad8c]"
            />

            {/* Quick 1-10 Buttons */}
            <div className="flex justify-between items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
                const isSelected = difficultyScore === val;
                const isUnderFive = val < 5;
                let bgStyle = 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200';
                if (isSelected) {
                  bgStyle = isUnderFive
                    ? 'bg-[#65a30d] text-white font-black ring-2 ring-[#a3e635]'
                    : 'bg-amber-500 text-white font-black ring-2 ring-amber-300';
                }

                return (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setDifficultyScore(val)}
                    className={`flex-1 py-1.5 text-xs rounded-xl border transition-all cursor-pointer ${bgStyle}`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 px-1 font-semibold">
              <span>۱ = بسیار آسان و راحت</span>
              <span>۵ = متوسط و مناسب</span>
              <span>۱۰ = بسیار دشوار و پرفشار</span>
            </div>
          </div>

          {/* Supportive Confirmation Notice (No algorithmic rules exposed) */}
          <div className="p-3.5 rounded-2xl border bg-[#f8fbf9] border-[#d9f99d] flex items-center gap-2.5 text-xs text-[#365314]">
            <Sparkles className="w-4 h-4 text-[#00ad8c] shrink-0" />
            <p className="leading-relaxed">
              این بازخورد در پرونده شما ذخیره شده و برنامه تمرینی متناسب با توان عضلانی شما تنظیم می‌گردد.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
            >
              انصراف
            </button>

            <button
              type="submit"
              className="flex-1 py-3 px-5 bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] hover:opacity-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-[#00ad8c]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ثبت بازخورد و ادامه تمرین</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
