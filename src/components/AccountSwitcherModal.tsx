import React from 'react';
import { UserAccount } from '../types';
import {
  User,
  Users,
  Check,
  UserPlus,
  LogOut,
  X,
  ShieldCheck,
  Stethoscope,
  Flame,
  FileSpreadsheet,
  ChevronLeft
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  currentUser: UserAccount;
  allUsers: UserAccount[];
  onClose: () => void;
  onSwitchAccount: (targetUser: UserAccount) => void;
  onAddNewAccount: () => void;
  onLogout: () => void;
}

export const AccountSwitcherModal: React.FC<Props> = ({
  isOpen,
  currentUser,
  allUsers,
  onClose,
  onSwitchAccount,
  onAddNewAccount,
  onLogout
}) => {
  if (!isOpen) return null;

  const getInitials = (nameStr?: string) => {
    if (!nameStr) return 'ب';
    const parts = nameStr.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return 'ب';
    if (parts.length === 1) return parts[0].substring(0, 2);
    return `${parts[0][0]} ${parts[parts.length - 1][0]}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-white" />
            <h3 className="text-base font-black">مدیریت و جابجایی بین حساب‌های کاربری</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Active Account Card */}
          <div>
            <span className="block text-xs font-bold text-slate-400 mb-2">
              حساب کاربری فعال در حال حاضر:
            </span>
            <div className="p-4 rounded-2xl bg-[#f0fdf4] border-2 border-[#86efac] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#008ba3] to-[#72c02c] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                  {getInitials(currentUser.fullName)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-slate-900">
                      {currentUser.fullName || 'بیمار'}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#166534]">
                      فعال
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5" dir="ltr">
                    {currentUser.email}
                  </p>
                  {(currentUser.vasPainScore !== undefined || currentUser.oswestryScore) && (
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 mt-1">
                      <span>درد VAS: {currentUser.vasPainScore || 4}/۱۰</span>
                      <span>•</span>
                      <span>اسوسـتری: {currentUser.oswestryScore?.percentage || 28}٪</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          </div>

          {/* Other Saved Accounts */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">
                سایر حساب‌های ذخیره‌شده در این مرورگر:
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                {allUsers.length} حساب
              </span>
            </div>

            <div className="space-y-2">
              {allUsers.map((user) => {
                const isActive = user.id === currentUser.id;
                return (
                  <div
                    key={user.id}
                    onClick={() => {
                      if (!isActive) {
                        onSwitchAccount(user);
                        onClose();
                      }
                    }}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-slate-50/70 border-slate-200 opacity-60'
                        : 'bg-white border-slate-200 hover:border-[#00ad8c] hover:bg-slate-50 cursor-pointer shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {getInitials(user.fullName)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-black text-slate-800">
                            {user.fullName || user.email}
                          </h5>
                          {user.age && (
                            <span className="text-[10px] text-slate-400">
                              ({user.age} ساله)
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono" dir="ltr">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {isActive ? (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                        همین حساب
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="px-3 py-1 rounded-xl text-xs font-bold text-[#008ba3] bg-[#f0f9ff] hover:bg-[#e0f2fe] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>جابجایی</span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onAddNewAccount();
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-[#00ad8c]" />
              <span>ثبت‌نام یا افزودن حساب کاربری جدید</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>خروج کامل از حساب کاربری فعلی</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
