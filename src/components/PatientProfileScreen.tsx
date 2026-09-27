import React, { useState } from 'react';
import { PatientProfile, ExerciseHistoryRecord, PainAggravation } from '../types';
import {
  User,
  Calendar,
  FileText,
  Activity,
  HeartPulse,
  Edit3,
  Save,
  X,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Filter,
  ArrowRight,
  TrendingUp,
  Stethoscope,
  Printer
} from 'lucide-react';

interface Props {
  profile: PatientProfile;
  exerciseHistory: ExerciseHistoryRecord[];
  onUpdateProfile: (updated: PatientProfile) => void;
  onBackToHome: () => void;
}

export const PatientProfileScreen: React.FC<Props> = ({
  profile,
  exerciseHistory,
  onUpdateProfile,
  onBackToHome
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editAge, setEditAge] = useState(profile.age);
  const [editMedicalHistory, setEditMedicalHistory] = useState(profile.medicalHistory);
  const [editPainLocation, setEditPainLocation] = useState(profile.painLocation || 'پایین کمر (لومبار)');
  const [editNotes, setEditNotes] = useState(profile.notes || '');

  // Filter state for exercise history
  const [painFilter, setPainFilter] = useState<'all' | PainAggravation>('all');
  const [selectedExerciseFilter, setSelectedExerciseFilter] = useState<string>('all');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName.trim() || 'بیمار',
      age: editAge,
      medicalHistory: editMedicalHistory.trim(),
      painLocation: editPainLocation.trim(),
      notes: editNotes.trim(),
      startDate: profile.startDate
    });
    setIsEditing(false);
  };

  // Compute initials for avatar
  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return 'ک م';
    if (parts.length === 1) return parts[0].substring(0, 2);
    return `${parts[0][0]} ${parts[parts.length - 1][0]}`;
  };

  // Filter history
  const filteredHistory = exerciseHistory.filter((item) => {
    if (painFilter !== 'all' && item.painLevel !== painFilter) return false;
    if (selectedExerciseFilter !== 'all' && item.exerciseId !== selectedExerciseFilter) return false;
    return true;
  });

  // Calculate statistics
  const totalCount = exerciseHistory.length;
  const noPainCount = exerciseHistory.filter((h) => h.painLevel === 'no').length;
  const painFreePercentage = totalCount > 0 ? Math.round((noPainCount / totalCount) * 100) : 100;
  const avgDifficulty = totalCount > 0
    ? (exerciseHistory.reduce((acc, cur) => acc + cur.difficultyScore, 0) / totalCount).toFixed(1)
    : '—';

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-right animate-in fade-in duration-200 pb-12">
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
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-[#ecfccb] text-[#365314]">
                <User className="w-4 h-4 text-[#65a30d]" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-[#0f2824]">
                پروفایل بیمار و سوابق تمرینات
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              مشخصات فردی، پرونده بالینی و تاریخچه تمامی تمرینات انجام‌شده
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
          title="چاپ پرونده"
        >
          <Printer className="w-4 h-4 text-[#008ba3]" />
          <span className="hidden sm:inline">چاپ پرونده</span>
        </button>
      </div>

      {/* Patient Profile Card */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#008ba3] via-[#00ad8c] to-[#72c02c] p-0.5 shadow-md shadow-[#00ad8c]/25 shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] flex items-center justify-center text-white font-black text-lg">
                {getInitials(profile.name)}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#0f2824]">
                  {profile.name}
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#ecfccb] text-[#365314] border border-[#d9f99d]">
                  {profile.age} ساله
                </span>
              </div>
              <p className="text-xs text-[#008ba3] font-bold mt-1 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-[#00ad8c]" />
                <span>محل درد: {profile.painLocation || 'پایین کمر'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-[#ecfccb] hover:border-[#d9f99d] hover:text-[#365314] text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Edit3 className="w-4 h-4 text-[#00ad8c]" />
            <span>ویرایش مشخصات</span>
          </button>
        </div>

        {/* Medical History Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-black text-[#0f2824]">
            <FileText className="w-4 h-4 text-[#008ba3]" />
            <span>سوابق پزشکی و توضیحات بالینی:</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#f8fbf9] border border-slate-100 text-xs text-slate-700 leading-relaxed font-medium">
            {profile.medicalHistory ? (
              <p className="whitespace-pre-line">{profile.medicalHistory}</p>
            ) : (
              <p className="text-slate-400">سابقه‌ای ثبت نشده است. جهت ثبت سوابق روی «ویرایش مشخصات» کلیک کنید.</p>
            )}
          </div>
        </div>

        {profile.notes && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500">یادداشت‌ها و توصیه‌های پزشک:</span>
            <div className="p-3.5 rounded-2xl bg-[#f0f9ff] border border-sky-100 text-xs text-[#0369a1] leading-relaxed">
              {profile.notes}
            </div>
          </div>
        )}

        {/* Summary Badges */}
        <div className="grid grid-cols-3 gap-2.5 pt-2">
          <div className="bg-[#f0f9ff] rounded-2xl p-3 text-center border border-sky-100">
            <span className="text-[10px] font-black text-[#008ba3] block">
              تعداد حرکات ثبت‌شده
            </span>
            <span className="text-lg font-black text-[#0f2824] block mt-0.5">
              {totalCount} حرکت
            </span>
          </div>

          <div className="bg-[#ecfccb] rounded-2xl p-3 text-center border border-[#d9f99d]">
            <span className="text-[10px] font-black text-[#365314] block">
              میانگین سختی (۱-۱۰)
            </span>
            <span className="text-lg font-black text-[#0f2824] block mt-0.5">
              {avgDifficulty}
            </span>
          </div>

          <div className="bg-[#f0f9ff] rounded-2xl p-3 text-center border border-sky-100">
            <span className="text-[10px] font-black text-[#008ba3] block">
              تمرینات بدون درد
            </span>
            <span className="text-lg font-black text-[#0f2824] block mt-0.5">
              ٪{painFreePercentage}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal / Panel */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-right">
            <div className="bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-white" />
                <h3 className="text-base font-black">ویرایش مشخصات و پرونده بیمار</h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نام و نام خانوادگی بیمار:
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00ad8c] font-bold"
                  placeholder="مثال: آنا کلر"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  سن بیمار:
                </label>
                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00ad8c] font-bold"
                  placeholder="مثال: ۳۸"
                  min="10"
                  max="120"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  محل و کانون اصلی درد:
                </label>
                <input
                  type="text"
                  value={editPainLocation}
                  onChange={(e) => setEditPainLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00ad8c]"
                  placeholder="مثال: پایین کمر، تیر کشیدن به باسن راست"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  سوابق پزشکی، تشخیص پزشک و سابقه آسیب‌های کمری:
                </label>
                <textarea
                  rows={4}
                  value={editMedicalHistory}
                  onChange={(e) => setEditMedicalHistory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00ad8c] leading-relaxed"
                  placeholder="مثال: سابقه بیرون‌زدگی دیسک L4-L5، احساس گرفتگی در نشستن‌های طولانی، درد سیاتیک..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  توصیه‌ها و یادداشت‌های فیزیوتراپیست / پزشک:
                </label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00ad8c]"
                  placeholder="توصیه‌های تکمیلی درمانی..."
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#008ba3] to-[#72c02c] hover:opacity-95 shadow-md shadow-[#00ad8c]/25 cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>ذخیره مشخصات</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exercise History Section (تاریخچه تمرینات انجام‌شده) */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,140,160,0.06)] border border-slate-100 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-[#f0f9ff] text-[#008ba3]">
                <Activity className="w-4 h-4 text-[#008ba3]" />
              </span>
              <h3 className="text-lg font-black text-[#0f2824]">
                تاریخچه تمرینات انجام‌شده
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              ثبت تاریخ، سطح سختی، وضعیت درد و مشخصات کامل هر حرکت انجام‌شده
            </p>
          </div>

          {/* Pain filter selector */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-200 text-xs">
            <button
              onClick={() => setPainFilter('all')}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                painFilter === 'all'
                  ? 'bg-white text-[#0f2824] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              همه ({exerciseHistory.length})
            </button>
            <button
              onClick={() => setPainFilter('no')}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                painFilter === 'no'
                  ? 'bg-[#ecfccb] text-[#365314] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              بدون درد
            </button>
            <button
              onClick={() => setPainFilter('mild')}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                painFilter === 'mild'
                  ? 'bg-amber-100 text-amber-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              درد خفیف
            </button>
            <button
              onClick={() => setPainFilter('severe')}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                painFilter === 'severe'
                  ? 'bg-rose-100 text-rose-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              درد شدید
            </button>
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="py-10 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#00ad8c] mx-auto opacity-40" />
            <p className="text-sm font-bold text-slate-700">هیچ رکوردی در این بخش یافت نشد.</p>
            <p className="text-xs text-slate-400">
              با تکمیل جلسات تمرینی، وضعیت درد و سختی هر حرکت در این جدول ثبت خواهد شد.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((item) => {
              const isPainFree = item.painLevel === 'no';
              const isMild = item.painLevel === 'mild';
              const isSevere = item.painLevel === 'severe';

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-[#f8fbf9] hover:bg-white hover:border-[#00ad8c]/40 hover:shadow-sm transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#008ba3] to-[#72c02c] text-white font-black text-xs flex items-center justify-center shrink-0">
                        {item.level}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[#0f2824]">
                          {item.exerciseTitleFa}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-medium">
                          سطح {item.level} • {item.holdSeconds} ثانیه مکث • {item.reps} تکرار
                        </span>
                      </div>
                    </div>

                    {/* Date and Time badge */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                      <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-slate-100">
                        <Calendar className="w-3.5 h-3.5 text-[#008ba3]" />
                        <span>{item.date}</span>
                        {item.time && <span className="text-slate-400">({item.time})</span>}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        هفته {item.weekNumber} - روز {item.dayNumber}
                      </span>
                    </div>
                  </div>

                  {/* Difficulty & Pain Level Feedback indicators */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100/80 text-xs">
                    {/* Pain Level Badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-semibold">وضعیت درد بیمار:</span>
                      <span
                        className={`px-3 py-1 rounded-full font-black text-[11px] border ${
                          isPainFree
                            ? 'bg-[#ecfccb] text-[#365314] border-[#d9f99d]'
                            : isMild
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-rose-100 text-rose-900 border-rose-300'
                        }`}
                      >
                        {item.painLevelFa}
                      </span>
                    </div>

                    {/* Difficulty Score Gauge */}
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-semibold">نمره سختی:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-sm text-[#0f2824]">
                          {item.difficultyScore}
                        </span>
                        <span className="text-[11px] text-slate-400">از ۱۰</span>
                        <div className="w-16 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${
                              item.difficultyScore < 5
                                ? 'bg-gradient-to-r from-[#008ba3] to-[#72c02c]'
                                : item.difficultyScore <= 7
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${(item.difficultyScore / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
