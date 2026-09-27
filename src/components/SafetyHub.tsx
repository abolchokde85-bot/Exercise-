import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  HeartHandshake,
  CheckCircle2,
  PhoneCall,
  Info,
  Check
} from 'lucide-react';

export const SafetyHub: React.FC = () => {
  const [checkedFlags, setCheckedFlags] = useState<Record<string, boolean>>({});

  const redFlags = [
    {
      id: 'bowel_bladder',
      title: 'بی‌اختیاری یا احتباس ناگهانی ادرار و مدفوع',
      desc: 'نشانه فشار حاد بر اعصاب دم اسبی (Cauda Equina) که نیاز به جراحی اورژانسی در کمتر از ۲۴ ساعت دارد.'
    },
    {
      id: 'saddle_anesthesia',
      title: 'بی‌حسی در ناحیه زین اسبی (اطراف مقعد و کشاله ران)',
      desc: 'کاهش حس لمس هنگام نشستن روی صندلی یا شستشو.'
    },
    {
      id: 'foot_drop',
      title: 'ضعف پیشرونده حرکتی پا (افتادگی مچ پا یا خالی کردن زانو)',
      desc: 'ناتوانی در راه رفتن روی پاشنه یا پنجه پا ناشی از تحت فشار قرار گرفتن ریشه حرکتی عصب.'
    },
    {
      id: 'fever_weight_loss',
      title: 'کمردرد همراه با تب، لرز یا کاهش وزن بی‌دلیل',
      desc: 'احتمال عفونت دیسک (دیسکیت) یا درگیری‌های سیستمیک نیازمند تصویربرداری MRI فوری.'
    },
    {
      id: 'severe_night_pain',
      title: 'درد شدید شبانه که با استراحت درازکش تسکین نمی‌یابد',
      desc: 'دردی که بیمار را از خواب بیدار می‌کند و با تغییر پوزیشن هم بهتر نمی‌شود.'
    }
  ];

  const toggleFlag = (id: string) => {
    setCheckedFlags((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const hasAnyRedFlag = Object.values(checkedFlags).some(Boolean);

  return (
    <div className="space-y-6 text-right">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              مرکز ایمنی بیمار و علائم هشدار قرمز (Red Flags)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            بررسی علائمی که نباید با ورزش خانگی درمان شوند و نیازمند مراجعه فوری به پزشک متخصص جراح مغز و اعصاب یا ارتوپد هستند.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
          استاندارد راهنماهای بالینی NICE UK & McGill
        </div>
      </div>

      {/* Red Flags Checklist */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>چک‌لیست خودارزیابی علائم هشدار قرمز</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          اگر حتی یکی از علائم زیر را تجربه می‌کنید، ورزش را بلافاصله متوقف کنید و با پزشک تماس بگیرید:
        </p>

        <div className="space-y-2.5">
          {redFlags.map((flag) => {
            const isChecked = !!checkedFlags[flag.id];
            return (
              <div
                key={flag.id}
                onClick={() => toggleFlag(flag.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'border-rose-400 bg-rose-50/60 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-rose-600 border-rose-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="space-y-1">
                  <h4 className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-rose-900' : 'text-slate-800'}`}>
                    {flag.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {flag.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Warning Banner if any checked */}
        {hasAnyRedFlag && (
          <div className="p-4 rounded-2xl bg-rose-600 text-white space-y-2 animate-in fade-in duration-200 shadow-lg shadow-rose-600/20">
            <div className="flex items-center gap-2 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>هشدار جدی: نیاز به معاینه فوری پزشکی</span>
            </div>
            <p className="text-xs leading-relaxed text-rose-100">
              یک یا چند نشانه مشکوک به درگیری ریشه‌های عصبی یا اختلالات ساختاری انتخاب شده است. لطفاً ادامه تمرینات ورزشی را متوقف نموده و در اسرع وقت به اورژانس بیمارستان یا جراح ستون فقرات مراجعه نمایید.
            </p>
          </div>
        )}
      </div>

      {/* Ergonomic & Spine Hygiene Tips */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-teal-600" />
          <span>اصول بهداشت ستون فقرات در زندگی روزمره (Spine Hygiene)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xl">🪑</span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">
              نشستن پشت میز و سیستم
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              از یک بالشتک کوچک لومبار در گودی کمر استفاده کنید. هر ۳۰ دقیقه یکبار برخیزید و ۲۰ ثانیه راه بروید. زانوها در زاویه ۹۰ درجه باشند.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xl">📦</span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">
              بلند کردن اجسام از روی زمین
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              کمر را هرگز خم یا پیچ ندهید. به جسم نزدیک شوید، زانوها را خم کنید (Squat) و از نیروی عضلات قدرتمند ران و باسن برای بلند شدن استفاده کنید.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xl">🛏️</span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">
              وضعیت خواب و استراحت
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              خوابیدن به پهلو با یک بالش بین دو زانو مانع چرخش لگن می‌شود. در حالت طاق‌باز، قرار دادن یک بالش زیر زانوها گودی کمر را در حالت تسکین قرار می‌دهد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
