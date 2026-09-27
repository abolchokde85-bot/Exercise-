import { ThemePaletteId } from '../types';

export interface ThemeConfig {
  id: ThemePaletteId;
  nameFa: string;
  dotColor: string;
  gradientClass: string;
  gradientStyle: string;
  bgPage: string;
  textMain: string;
  textMuted: string;
  cardBg: string;
  cardBorder: string;
  primaryBtn: string;
  primaryBadge: string;
  accentCyan: string;
  accentLime: string;
}

export const THEMES: Record<ThemePaletteId, ThemeConfig> = {
  coral_midnight: {
    id: 'coral_midnight', // Keeping the id so existing state works, but themed to the turquoise-lime screenshot!
    nameFa: 'سبز لیمویی و آبی فیروزه‌ای (SteadyBack)',
    dotColor: '#00ad8c',
    gradientClass: 'bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c]',
    gradientStyle: 'linear-gradient(135deg, #008ba3 0%, #00ad8c 50%, #72c02c 100%)',
    bgPage: 'bg-[#f4fbf7]',
    textMain: 'text-[#0f2824]',
    textMuted: 'text-[#50756e]',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-100',
    primaryBtn: 'bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] hover:opacity-95 text-white shadow-lg shadow-[#00ad8c]/25',
    primaryBadge: 'bg-[#ecfccb] text-[#365314] border-[#d9f99d]',
    accentCyan: '#008ba3',
    accentLime: '#72c02c'
  },
  dark_oled: {
    id: 'dark_oled',
    nameFa: 'دارک‌مود فیروزه و لیمو (Dark Turquoise & Lime)',
    dotColor: '#00ad8c',
    gradientClass: 'bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c]',
    gradientStyle: 'linear-gradient(135deg, #008ba3 0%, #00ad8c 50%, #72c02c 100%)',
    bgPage: 'bg-[#091312]',
    textMain: 'text-slate-100',
    textMuted: 'text-slate-400',
    cardBg: 'bg-[#12201e]',
    cardBorder: 'border-[#1b3330]',
    primaryBtn: 'bg-gradient-to-r from-[#008ba3] via-[#00ad8c] to-[#72c02c] hover:opacity-95 text-white shadow-lg shadow-[#00ad8c]/30',
    primaryBadge: 'bg-[#1e3a1f] text-[#bef264] border-[#365314]',
    accentCyan: '#008ba3',
    accentLime: '#72c02c'
  },
  royal_cobalt: {
    id: 'royal_cobalt',
    nameFa: 'فیروزه‌ای عمیق و لیمو',
    dotColor: '#0284c7',
    gradientClass: 'bg-gradient-to-r from-[#0284c7] via-[#00b4d8] to-[#10b981]',
    gradientStyle: 'linear-gradient(135deg, #0284c7 0%, #00b4d8 50%, #10b981 100%)',
    bgPage: 'bg-[#f0f9ff]',
    textMain: 'text-slate-900',
    textMuted: 'text-slate-500',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-100',
    primaryBtn: 'bg-gradient-to-r from-[#0284c7] via-[#00b4d8] to-[#10b981] text-white shadow-lg shadow-cyan-500/25',
    primaryBadge: 'bg-cyan-50 text-cyan-900 border-cyan-200',
    accentCyan: '#0284c7',
    accentLime: '#10b981'
  },
  deep_purple: {
    id: 'deep_purple',
    nameFa: 'سبز نعنایی و فیروزه‌ای',
    dotColor: '#10b981',
    gradientClass: 'bg-gradient-to-r from-[#0d9488] via-[#10b981] to-[#84cc16]',
    gradientStyle: 'linear-gradient(135deg, #0d9488 0%, #10b981 50%, #84cc16 100%)',
    bgPage: 'bg-[#f2fbf6]',
    textMain: 'text-slate-900',
    textMuted: 'text-slate-500',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-100',
    primaryBtn: 'bg-gradient-to-r from-[#0d9488] via-[#10b981] to-[#84cc16] text-white shadow-lg shadow-emerald-500/25',
    primaryBadge: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    accentCyan: '#0d9488',
    accentLime: '#84cc16'
  }
};
