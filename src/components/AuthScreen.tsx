import React, { useState } from 'react';
import { UserAccount } from '../types';
import {
  registerNewUser,
  loginExistingUser,
  setCurrentUser,
  getRegisteredUsers,
  DEMO_USERS,
  DEMO_USER_1,
  DEMO_USER_2
} from '../utils/authStorage';
import {
  Activity,
  UserPlus,
  LogIn,
  Mail,
  Phone,
  Lock,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  Users,
  ChevronLeft
} from 'lucide-react';

interface Props {
  onAuthSuccess: (user: UserAccount) => void;
}

export const AuthScreen: React.FC<Props> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [contactInput, setContactInput] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const registeredUsers = getRegisteredUsers();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!contactInput.trim()) {
      setError('لطفاً شماره تلفن همراه یا ایمیل خود را وارد نمایید.');
      return;
    }

    if (mode === 'register') {
      if (password && confirmPassword && password !== confirmPassword) {
        setError('رمز عبور و تکرار آن یکسان نیستند.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const res = registerNewUser(contactInput, password);
        setIsLoading(false);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
        } else {
          setError(res.errorFa || 'خطا در ثبت‌نام کاربر');
        }
      }, 250);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        const res = loginExistingUser(contactInput, password);
        setIsLoading(false);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
        } else {
          setError(res.errorFa || 'خطا در ورود به حساب');
        }
      }, 250);
    }
  };

  const handleSelectQuickUser = (user: UserAccount) => {
    setCurrentUser(user);
    onAuthSuccess(user);
  };

  const isPhoneInput = /^\d+$/.test(contactInput.replace(/[\s-+]/g, ''));

  return (
    <div className="min-h-[88vh] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,140,160,0.08)] border border-slate-100 text-right animate-in fade-in duration-300">
        {/* Brand & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#008ba3] via-[#00ad8c] to-[#72c02c] p-0.5 shadow-lg shadow-[#00ad8c]/25 mb-3">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-[#00ad8c]">
              <Activity className="w-7 h-7 stroke-[2.5]" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-[#0f2824] tracking-tight">
            سامانه ورود و ثبت‌نام تسکین‌کمر
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            برنامه جامع توانبخشی و ورزش‌درمانی ستون فقرات
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-gradient-to-r from-[#008ba3] to-[#72c02c] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>ثبت‌نام بیمار جدید</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-gradient-to-r from-[#008ba3] to-[#72c02c] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>ورود به حساب کاربری</span>
          </button>
        </div>

        {/* Info Banner for New Users */}
        {mode === 'register' && (
          <div className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-[#f0fdf4] to-[#f0fdfa] border border-[#bbf7d0] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
            <p className="text-xs text-[#14532d] leading-relaxed font-medium">
              پس از ثبت‌نام، اطلاعات دموگرافیک (نام، سن و جنسیت)، سنجش دیداری نمره درد (VAS) و پرسشنامه تخصصی Modified Oswestry جهت پرونده درمانی از شما دریافت می‌گردد.
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                ایمیل یا شماره تلفن همراه:
              </label>
              <span className="text-[11px] text-slate-400 font-normal">
                مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا patient@mail.com
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                placeholder="شماره همراه یا ایمیل"
                dir="ltr"
                className="w-full pl-3 pr-10 py-3 rounded-2xl border border-slate-200 focus:border-[#00ad8c] focus:ring-2 focus:ring-[#00ad8c]/20 outline-none text-sm text-slate-800 transition-all font-sans"
              />
              {isPhoneInput ? (
                <Phone className="w-4 h-4 text-[#00ad8c] absolute right-3.5 top-3.5" />
              ) : (
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              رمز عبور:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 focus:border-[#00ad8c] focus:ring-2 focus:ring-[#00ad8c]/20 outline-none text-sm text-slate-800 transition-all font-sans"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                تکرار رمز عبور:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full pl-3 pr-10 py-3 rounded-2xl border border-slate-200 focus:border-[#00ad8c] focus:ring-2 focus:ring-[#00ad8c]/20 outline-none text-sm text-slate-800 transition-all font-sans"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] text-white font-bold text-sm shadow-md shadow-[#00ad8c]/30 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>{mode === 'register' ? 'ثبت‌نام و شروع ارزیابی بالینی' : 'ورود به حساب کاربری'}</span>
                <ArrowLeft className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative px-3 bg-white text-[11px] font-bold text-slate-400">
            ورود سریع با بیماران نمونه (جهت بررسی آسان)
          </span>
        </div>

        {/* 2 Quick Demo Patients Cards */}
        <div className="space-y-2 mb-6">
          {/* Patient 1: Anna Keller */}
          <button
            type="button"
            onClick={() => handleSelectQuickUser(DEMO_USER_1)}
            className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#f0fdf4] border border-slate-200 hover:border-[#bbf7d0] text-right transition-all flex items-center justify-between gap-3 group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#008ba3] to-[#00ad8c] text-white flex items-center justify-center font-bold text-xs shrink-0">
                آ ک
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-[#166534]">
                    آنا کلر (۳۸ ساله - زن)
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#ecfccb] text-[#365314]">
                    نمره درد: ۴/۱۰
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  دیسک کمر L4-L5 • ناتوانی متوسط Oswestry (۲۸٪)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#008ba3] group-hover:text-[#16a34a]">
              <span>ورود</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Patient 2: Reza Mohammadi */}
          <button
            type="button"
            onClick={() => handleSelectQuickUser(DEMO_USER_2)}
            className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#fff7ed] border border-slate-200 hover:border-[#fed7aa] text-right transition-all flex items-center justify-between gap-3 group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                ر م
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-amber-900">
                    رضا محمدی (۵۲ ساله - مرد)
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#fed7aa] text-[#9a3412]">
                    نمره درد: ۷/۱۰
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  تنگی کانال نخاعی کمری • ناتوانی شدید Oswestry (۵۴٪)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 group-hover:text-amber-800">
              <span>ورود</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Saved Accounts on this Device */}
        {registeredUsers.length > 2 && (
          <div className="mb-4 pt-3 border-t border-slate-100">
            <span className="block text-[11px] font-bold text-slate-400 mb-2">
              سایر حساب‌های ذخیره‌شده در این مرورگر:
            </span>
            <div className="max-h-32 overflow-y-auto space-y-1.5">
              {registeredUsers
                .filter((u) => u.id !== DEMO_USER_1.id && u.id !== DEMO_USER_2.id)
                .map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleSelectQuickUser(u)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-right flex items-center justify-between text-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-[#00ad8c]" />
                      <span className="font-bold text-slate-800">{u.fullName || u.email}</span>
                      <span className="text-[10px] text-slate-400" dir="ltr">{u.email}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#008ba3]">انتخاب</span>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ad8c]" />
            <span>مشخصات و جلسات بیمار به‌صورت دائمی و محرمانه در حافظه مرورگر ذخیره می‌گردد</span>
          </div>
        </div>
      </div>
    </div>
  );
};
