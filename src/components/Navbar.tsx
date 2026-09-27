import React from 'react';
import { ThemePaletteId } from '../types';
import {
  Activity,
  CalendarCheck,
  BookOpen,
  LineChart,
  ShieldAlert,
  Calendar,
  UserCheck
} from 'lucide-react';

interface Props {
  activeTab: 'daily' | 'library' | 'profile' | 'analytics' | 'safety';
  onSelectTab: (tab: 'daily' | 'library' | 'profile' | 'analytics' | 'safety') => void;
  currentWeek: number;
  currentDay: number;
  currentTheme: ThemePaletteId;
  onSelectTheme: (theme: ThemePaletteId) => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  currentWeek,
  currentDay
}) => {
  const navItems = [
    { id: 'daily', label: 'تمرین امروز', icon: CalendarCheck },
    { id: 'library', label: 'روزهای برنامه', icon: BookOpen },
    { id: 'profile', label: 'پروفایل و سوابق', icon: UserCheck },
    { id: 'analytics', label: 'پایش روند درمان', icon: LineChart },
    { id: 'safety', label: 'علائم هشدار', icon: ShieldAlert }
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-xl lg:max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div
            onClick={() => onSelectTab('daily')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#008ba3] via-[#00ad8c] to-[#72c02c] p-0.5 shadow-md shadow-[#00ad8c]/25 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-[#00ad8c]">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base text-[#0f2824] tracking-tight">
                  SteadyBack
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#ecfccb] text-[#365314] border border-[#d9f99d]">
                  تسکین‌کمر
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-slate-50 border border-slate-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#008ba3] to-[#72c02c] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Current Day Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border bg-[#f0f9ff] border-sky-100 text-[#0369a1] text-xs font-black shrink-0">
            <Calendar className="w-3.5 h-3.5 text-[#008ba3]" />
            <span>
              هفته {currentWeek} - {currentDay === 7 ? 'استراحت' : `روز ${currentDay}`}
            </span>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex items-center justify-between border-t border-slate-100 py-1.5 overflow-x-auto gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex-1 py-1.5 px-1 flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
                  isActive
                    ? 'text-[#008ba3] font-black'
                    : 'text-slate-400'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00ad8c]' : 'text-slate-400'}`} />
                <span className="truncate max-w-[70px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
