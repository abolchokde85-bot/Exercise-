import React, { useState } from 'react';
import { UserAccount, GenderType, OswestryEvaluationResult } from '../types';
import {
  MODIFIED_OSWESTRY_SECTIONS,
  calculateOswestryResult,
  VAS_LEVELS
} from '../data/oswestryData';
import { updateUserOnboardingData } from '../utils/authStorage';
import {
  User,
  HeartPulse,
  Flame,
  Sparkles,
  ClipboardList,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Activity,
  ShieldCheck,
  Award,
  AlertTriangle,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  user: UserAccount;
  onComplete: (updatedUser: UserAccount) => void;
  onCancel?: () => void;
}

export const ClinicalOnboardingScreen: React.FC<Props> = ({
  user,
  onComplete,
  onCancel
}) => {
  // Main Step:
  // 1: Personal Info (Name, Age, Gender)
  // 2: Visual Analog Scale of Pain (VAS 1-10)
  // 3: Modified Oswestry Questionnaire (10 sections)
  // 4: Results & Profile Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Personal Information
  const [fullName, setFullName] = useState(user.fullName || '');
  const [age, setAge] = useState<number | string>(user.age || '');
  const [gender, setGender] = useState<GenderType>(user.gender || 'male');
  const [medicalHistory, setMedicalHistory] = useState(
    user.medicalHistory || 'احساس درد و گرفتگی در ناحیه تحتانی کمر'
  );
  const [painLocation, setPainLocation] = useState(
    user.painLocation || 'پایین کمر (لومبار)'
  );
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // Step 2: Visual Analog Scale of Pain (1 to 10)
  const [vasPainScore, setVasPainScore] = useState<number>(user.vasPainScore || 4);

  // Step 3: Modified Oswestry Questionnaire
  // Answers map: sectionId (1-10) -> selected option score (0-5)
  const [oswestryAnswers, setOswestryAnswers] = useState<Record<number, number>>(() => {
    if (user.oswestryScore?.sectionScores) {
      return { ...user.oswestryScore.sectionScores };
    }
    // Default answers: section 1 gets mapped to approx VAS, others default to 1 or 2
    return {
      1: Math.min(5, Math.max(0, Math.round((user.vasPainScore || 4) / 2))),
      2: 1,
      3: 2,
      4: 1,
      5: 2,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      10: 1
    };
  });
  const [currentOswestrySectionIndex, setCurrentOswestrySectionIndex] = useState(0);

  // Final evaluation result
  const [evaluationResult, setEvaluationResult] = useState<OswestryEvaluationResult | null>(null);

  // --- Handlers ---
  const handleProceedFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setStep1Error('لطفاً نام و نام خانوادگی خود را وارد کنید.');
      return;
    }
    if (!age || Number(age) < 10 || Number(age) > 110) {
      setStep1Error('لطفاً سن معتبر وارد کنید.');
      return;
    }
    setStep1Error(null);
    setCurrentStep(2);
  };

  const handleProceedFromStep2 = () => {
    // Map VAS score to section 1 of Oswestry if not manually changed
    const mappedScore = Math.min(5, Math.max(0, Math.floor(vasPainScore / 2)));
    setOswestryAnswers((prev) => ({
      ...prev,
      1: mappedScore
    }));
    setCurrentStep(3);
  };

  const handleSelectOswestryOption = (sectionId: number, score: number) => {
    setOswestryAnswers((prev) => ({
      ...prev,
      [sectionId]: score
    }));
  };

  const handleFinishOswestry = () => {
    // Calculate final result
    const result = calculateOswestryResult(oswestryAnswers);
    setEvaluationResult(result);
    setCurrentStep(4);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleFinalSubmit = () => {
    const genderFa = gender === 'female' ? 'زن' : gender === 'male' ? 'مرد' : 'سایر';
    const finalResult = evaluationResult || calculateOswestryResult(oswestryAnswers);

    const updatedUser = updateUserOnboardingData(user.id, {
      fullName: fullName.trim(),
      age: Number(age) || age,
      gender,
      genderFa,
      vasPainScore,
      oswestryScore: finalResult,
      medicalHistory: medicalHistory.trim(),
      painLocation: painLocation.trim()
    });

    onComplete(updatedUser);
  };

  const currentVasInfo = VAS_LEVELS[vasPainScore] || VAS_LEVELS[4];
  const currentOswestrySection = MODIFIED_OSWESTRY_SECTIONS[currentOswestrySectionIndex];

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 text-right animate-in fade-in duration-300 pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 mb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#008ba3] via-[#00ad8c] to-[#72c02c] p-0.5 shadow-md shadow-[#00ad8c]/25 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-[#00ad8c]">
                <Activity className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0f2824]">
                پرونده بالینی و ارزیابی اولیه بیمار
              </h1>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                تکمیل مشخصات فردی، نمره دیداری درد (VAS) و پرسشنامه تخصصی Modified Oswestry
              </p>
            </div>
          </div>

          {onCancel && (
            <button
              onClick={onCancel}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200 cursor-pointer"
            >
              انصراف
            </button>
          )}
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Step 1 */}
            <div
              className={`p-2 rounded-2xl border transition-all ${
                currentStep === 1
                  ? 'bg-[#ecfccb] border-[#bef264] text-[#365314] font-black shadow-xs'
                  : currentStep > 1
                  ? 'bg-slate-50 border-emerald-200 text-emerald-700 font-bold'
                  : 'bg-slate-50 border-slate-100 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-[11px] mb-0.5">
                {currentStep > 1 ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span>۱</span>
                )}
                <span>مشخصات</span>
              </div>
              <p className="text-[10px] hidden sm:block opacity-80">نام، سن و جنسیت</p>
            </div>

            {/* Step 2 */}
            <div
              className={`p-2 rounded-2xl border transition-all ${
                currentStep === 2
                  ? 'bg-[#ecfccb] border-[#bef264] text-[#365314] font-black shadow-xs'
                  : currentStep > 2
                  ? 'bg-slate-50 border-emerald-200 text-emerald-700 font-bold'
                  : 'bg-slate-50 border-slate-100 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-[11px] mb-0.5">
                {currentStep > 2 ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span>۲</span>
                )}
                <span>نمره درد (VAS)</span>
              </div>
              <p className="text-[10px] hidden sm:block opacity-80">مقیاس دیداری ۱ تا ۱۰</p>
            </div>

            {/* Step 3 */}
            <div
              className={`p-2 rounded-2xl border transition-all ${
                currentStep === 3
                  ? 'bg-[#ecfccb] border-[#bef264] text-[#365314] font-black shadow-xs'
                  : currentStep > 3
                  ? 'bg-slate-50 border-emerald-200 text-emerald-700 font-bold'
                  : 'bg-slate-50 border-slate-100 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-[11px] mb-0.5">
                {currentStep > 3 ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span>۳</span>
                )}
                <span>پرسشنامه Oswestry</span>
              </div>
              <p className="text-[10px] hidden sm:block opacity-80">۱۰ بخش استاندارد</p>
            </div>

            {/* Step 4 */}
            <div
              className={`p-2 rounded-2xl border transition-all ${
                currentStep === 4
                  ? 'bg-[#ecfccb] border-[#bef264] text-[#365314] font-black shadow-xs'
                  : 'bg-slate-50 border-slate-100 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-[11px] mb-0.5">
                <span>۴</span>
                <span>نتیجه و ثبت</span>
              </div>
              <p className="text-[10px] hidden sm:block opacity-80">شاخص ناتوانی کمر</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STEP 1: Personal Info ================= */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-lg bg-[#ecfccb] text-[#365314]">
              <User className="w-5 h-5 text-[#65a30d]" />
            </span>
            <h2 className="text-lg font-black text-[#0f2824]">
              مرحله اول: اطلاعات فردی و دموگرافیک بیمار
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            لطفاً اطلاعات هویتی و پزشکی خود را جهت تشکیل پرونده بالینی و انطباق شدت برنامه فیزیوتراپی با دقت تکمیل نمایید.
          </p>

          {step1Error && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{step1Error}</span>
            </div>
          )}

          <form onSubmit={handleProceedFromStep1} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                نام و نام خانوادگی: <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثال: علی احمدی یا مریم صادقی"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#00ad8c] focus:ring-2 focus:ring-[#00ad8c]/20 outline-none text-sm text-slate-800 transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  سن (سال): <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="10"
                  max="110"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="مثال: ۴۲"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#00ad8c] focus:ring-2 focus:ring-[#00ad8c]/20 outline-none text-sm text-slate-800 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  جنسیت: <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                      gender === 'male'
                        ? 'bg-gradient-to-r from-[#008ba3] to-[#00ad8c] text-white border-transparent shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    مرد
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                      gender === 'female'
                        ? 'bg-gradient-to-r from-[#008ba3] to-[#00ad8c] text-white border-transparent shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    زن
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('other')}
                    className={`py-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                      gender === 'other'
                        ? 'bg-gradient-to-r from-[#008ba3] to-[#00ad8c] text-white border-transparent shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    سایر
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                محل اصلی احساس درد در کمر:
              </label>
              <input
                type="text"
                value={painLocation}
                onChange={(e) => setPainLocation(e.target.value)}
                placeholder="مثال: پایین کمر، انتشار درد به باسن یا پشت ران"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#00ad8c] focus:ring-2 focus:ring-[#00ad8c]/20 outline-none text-sm text-slate-800 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                سابقه پزشکی یا توضیحات تکمیلی (اختیاری):
              </label>
              <textarea
                rows={2}
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                placeholder="مثال: دیسک کمر، سابقه فیزیوتراپی، خشکی صبحگاهی مهره‌ها"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#00ad8c] focus:ring-2 focus:ring-[#00ad8c]/20 outline-none text-sm text-slate-800 transition-all font-medium resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white font-bold text-sm shadow-md shadow-[#00ad8c]/25 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer pt-3 mt-4"
            >
              <span>مرحله بعد: سنجش نمره دیداری درد (VAS)</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ================= STEP 2: Visual Analog Scale of Pain (VAS 1 to 10) ================= */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-[#ecfccb] text-[#365314]">
                <Flame className="w-5 h-5 text-[#65a30d]" />
              </span>
              <h2 className="text-lg font-black text-[#0f2824]">
                مرحله دوم: مقیاس دیداری سنجش درد (Visual Analog Score)
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            لطفاً میزان دردی که <strong className="text-slate-800">در حال حاضر یا در طول ۲۴ ساعت گذشته</strong> در ناحیه کمر تجربه کرده‌اید را از عدد ۱ (درد بسیار ناچیز و خفیف) تا عدد ۱۰ (شدیدترین و غیرقابل تحمل‌ترین درد ممکن) تعیین کنید.
          </p>

          {/* Visual Scale Display Card */}
          <div className={`p-6 rounded-3xl border transition-all text-center mb-6 ${currentVasInfo.bgClass} border-transparent`}>
            <div className="text-5xl sm:text-6xl mb-3 animate-bounce duration-1000">
              {currentVasInfo.expression}
            </div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
                {vasPainScore}
              </span>
              <span className="text-base text-slate-500 font-bold">از ۱۰</span>
            </div>
            <h3 className={`text-base sm:text-lg font-black ${currentVasInfo.colorClass}`}>
              {currentVasInfo.labelFa}
            </h3>
            <p className="text-xs text-slate-700 font-medium max-w-md mx-auto mt-2 leading-relaxed">
              {currentVasInfo.clinicalNoteFa}
            </p>
          </div>

          {/* Interactive Pain Spectrum Slider */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 px-1">
              <span className="text-emerald-600">۱: حداقل درد</span>
              <span className="text-amber-600">۵: درد متوسط</span>
              <span className="text-rose-600">۱۰: غیرقابل تحمل</span>
            </div>

            {/* Slider with visual gradient background */}
            <div className="relative py-2">
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={vasPainScore}
                onChange={(e) => setVasPainScore(Number(e.target.value))}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-lime-400 via-teal-400 via-amber-400 via-orange-500 to-red-600"
              />
            </div>

            {/* Numbered 1-10 selector buttons */}
            <div className="grid grid-cols-10 gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                const isSelected = vasPainScore === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setVasPainScore(num)}
                    className={`py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer font-sans ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-md scale-105 ring-2 ring-[#00ad8c]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>مرحله قبل</span>
            </button>
            <button
              type="button"
              onClick={handleProceedFromStep2}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white font-bold text-sm shadow-md shadow-[#00ad8c]/25 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>مرحله بعد: پرسشنامه ناتوانی Modified Oswestry</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: Modified Oswestry Questionnaire ================= */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 animate-in fade-in duration-200">
          {/* Header of Oswestry */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-[#ecfccb] text-[#365314]">
                  <ClipboardList className="w-5 h-5 text-[#65a30d]" />
                </span>
                <h2 className="text-base sm:text-lg font-black text-[#0f2824]">
                  پرسشنامه استاندارد ناتوانی کمر Modified Oswestry
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                تأثیر درد کمر بر فعالیت‌های روزمره (بخش {currentOswestrySectionIndex + 1} از ۱۰)
              </p>
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-black">
              <span>پیشرفت:</span>
              <span className="text-[#008ba3]">
                {Math.round(((currentOswestrySectionIndex + 1) / 10) * 100)}٪
              </span>
            </div>
          </div>

          {/* Section progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] h-full transition-all duration-300"
              style={{ width: `${((currentOswestrySectionIndex + 1) / 10) * 100}%` }}
            />
          </div>

          {/* Section Quick Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-6 scrollbar-none">
            {MODIFIED_OSWESTRY_SECTIONS.map((sec, idx) => {
              const isCurrent = idx === currentOswestrySectionIndex;
              const hasAnswer = typeof oswestryAnswers[sec.id] === 'number';
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setCurrentOswestrySectionIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#008ba3] to-[#72c02c] text-white shadow-xs'
                      : hasAnswer
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  بخش {sec.id}
                </button>
              );
            })}
          </div>

          {/* Current Section Question Box */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-slate-200">
            <h3 className="text-base font-black text-slate-900 mb-1">
              {currentOswestrySection.titleFa}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {currentOswestrySection.subtitleFa}
            </p>
          </div>

          {/* Options (0 to 5) */}
          <div className="space-y-2.5 mb-8">
            {currentOswestrySection.options.map((opt) => {
              const isSelected = oswestryAnswers[currentOswestrySection.id] === opt.score;
              return (
                <div
                  key={opt.score}
                  onClick={() => handleSelectOswestryOption(currentOswestrySection.id, opt.score)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#ecfccb]/60 border-[#84cc16] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'border-[#65a30d] bg-[#65a30d] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                        isSelected ? 'text-[#14532d] font-bold' : 'text-slate-800'
                      }`}
                    >
                      {opt.textFa}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-black px-2 py-0.5 rounded-lg shrink-0 font-sans ${
                      isSelected
                        ? 'bg-[#d9f99d] text-[#365314]'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    نمره: {opt.score}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Navigation for Sections */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                if (currentOswestrySectionIndex > 0) {
                  setCurrentOswestrySectionIndex((prev) => prev - 1);
                } else {
                  setCurrentStep(2);
                }
              }}
              className="py-3 px-4 sm:px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>{currentOswestrySectionIndex === 0 ? 'بازگشت به نمره درد' : 'بخش قبل'}</span>
            </button>

            {currentOswestrySectionIndex < 9 ? (
              <button
                type="button"
                onClick={() => setCurrentOswestrySectionIndex((prev) => prev + 1)}
                className="py-3 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-[#008ba3] to-[#00ad8c] text-white font-bold text-xs shadow-xs hover:opacity-95 transition-opacity flex items-center gap-1.5 cursor-pointer"
              >
                <span>بخش بعدی</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishOswestry}
                className="py-3 px-5 sm:px-7 rounded-2xl bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#00ad8c]/25 hover:opacity-95 transition-opacity flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>محاسبه و مشاهده نتیجه ارزیابی</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= STEP 4: Evaluation Summary & Final Submission ================= */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 animate-in fade-in duration-300">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-3xl bg-gradient-to-tr from-[#ecfccb] to-[#ccfbf1] text-[#00ad8c] mb-3">
              <Award className="w-10 h-10 text-[#00ad8c]" />
            </div>
            <h2 className="text-xl font-black text-[#0f2824]">
              نتیجه ارزیابی بالینی و افتتاح پرونده
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              پرونده سلامت شما با موفقیت بر اساس شاخص‌های معتبر جهانی ثبت گردید
            </p>
          </div>

          {/* Patient Quick Info Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#008ba3] to-[#72c02c] text-white flex items-center justify-center font-bold text-sm">
                {fullName.trim().charAt(0) || 'ب'}
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">{fullName}</h4>
                <p className="text-xs text-slate-500 font-semibold">
                  سن: {age} سال • جنسیت: {gender === 'female' ? 'زن' : gender === 'male' ? 'مرد' : 'سایر'}
                </p>
              </div>
            </div>

            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#ecfccb] text-[#365314] border border-[#d9f99d]">
              پرونده آماده شروع تمرینات
            </span>
          </div>

          {/* Two Big Score Cards: VAS & Oswestry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* VAS Pain Score Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-white to-amber-50/50 border border-amber-200 text-center">
              <div className="text-3xl mb-1">{currentVasInfo.expression}</div>
              <span className="text-xs font-bold text-slate-500">نمره مقیاس دیداری درد (VAS)</span>
              <div className="flex items-center justify-center gap-1 mt-1 mb-1">
                <span className="text-3xl font-black text-slate-900 font-sans">{vasPainScore}</span>
                <span className="text-xs text-slate-400 font-bold">از ۱۰</span>
              </div>
              <p className={`text-xs font-black ${currentVasInfo.colorClass}`}>
                {currentVasInfo.labelFa}
              </p>
            </div>

            {/* Oswestry Disability Card */}
            {(() => {
              const res = evaluationResult || calculateOswestryResult(oswestryAnswers);
              return (
                <div className="p-5 rounded-3xl bg-gradient-to-br from-white to-teal-50/50 border border-teal-200 text-center">
                  <div className="w-10 h-10 mx-auto rounded-2xl bg-[#ccfbf1] text-[#0f766e] flex items-center justify-center mb-1">
                    <FileSpreadsheet className="w-5 h-5 text-[#00ad8c]" />
                  </div>
                  <span className="text-xs font-bold text-slate-500">شاخص ناتوانی کمر (Modified Oswestry)</span>
                  <div className="flex items-center justify-center gap-1 mt-1 mb-1">
                    <span className="text-3xl font-black text-[#008ba3] font-sans">
                      {res.percentage}٪
                    </span>
                    <span className="text-xs text-slate-400 font-semibold font-sans">
                      ({res.totalScore} از ۵۰)
                    </span>
                  </div>
                  <p className="text-xs font-black text-[#0f766e]">
                    {res.disabilityLevelFa}
                  </p>
                </div>
              );
            })()}
          </div>

          {/* Clinical Interpretation */}
          {(() => {
            const res = evaluationResult || calculateOswestryResult(oswestryAnswers);
            return (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#f0fdf4] to-[#f0fdfa] border border-[#bbf7d0] mb-6">
                <h4 className="text-xs font-black text-[#14532d] mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  <span>تفسیر بالینی و راهنمای دوره تمرین‌درمانی:</span>
                </h4>
                <p className="text-xs text-[#166534] leading-relaxed font-medium">
                  {res.descriptionFa}
                </p>
              </div>
            );
          })()}

          {/* Oswestry 10 Section Breakdown Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>تفکیک نمرات ۱۰ بخش پرسشنامه Modified Oswestry</span>
              <span className="text-slate-400 font-normal">نمره هر بخش از ۵</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
              {MODIFIED_OSWESTRY_SECTIONS.map((sec) => {
                const sc = oswestryAnswers[sec.id] || 0;
                return (
                  <div key={sec.id} className="px-4 py-2 flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium">{sec.titleFa}</span>
                    <span className="font-bold text-slate-900 font-sans px-2 py-0.5 rounded-md bg-slate-100">
                      {sc} / ۵
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final Action */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازنگری سوالات</span>
            </button>
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white font-bold text-sm shadow-md shadow-[#00ad8c]/25 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>تأیید نهایی و ورود به برنامه تمرینی اختصاصی</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
