import { OswestryEvaluationResult } from '../types';

export interface OswestryOption {
  score: number; // 0 to 5
  textFa: string;
}

export interface OswestrySection {
  id: number; // 1 to 10
  titleFa: string;
  subtitleFa: string;
  iconName: string;
  options: OswestryOption[];
}

export const MODIFIED_OSWESTRY_SECTIONS: OswestrySection[] = [
  {
    id: 1,
    titleFa: 'بخش ۱: شدت درد',
    subtitleFa: 'میزان و شدت دردی که هم‌اکنون در ناحیه کمر احساس می‌کنید',
    iconName: 'Flame',
    options: [
      { score: 0, textFa: 'در حال حاضر هیچ دردی در کمر احساس نمی‌کنم.' },
      { score: 1, textFa: 'در حال حاضر درد بسیار خفیف است.' },
      { score: 2, textFa: 'در حال حاضر دردم متوسط است.' },
      { score: 3, textFa: 'در حال حاضر درد نسبتاً شدیدی دارم.' },
      { score: 4, textFa: 'در حال حاضر درد بسیار شدیدی دارم.' },
      { score: 5, textFa: 'در حال حاضر بدترین درد قابل تصوری که ممکن است را تجربه می‌کنم.' }
    ]
  },
  {
    id: 2,
    titleFa: 'بخش ۲: مراقبت‌های شخصی (شستشو، لباس پوشیدن و...) ',
    subtitleFa: 'توانایی انجام کارهای بهداشتی و نظافت فردی بدون احساس درد اضافی',
    iconName: 'Sparkles',
    options: [
      { score: 0, textFa: 'می‌توانم بدون ایجاد درد اضافی و به‌طور طبیعی از خود مراقبت کنم.' },
      { score: 1, textFa: 'می‌توانم به طور طبیعی از خود مراقبت کنم اما این کار باعث ایجاد درد اضافی می‌شود.' },
      { score: 2, textFa: 'مراقبت از خود دردناک است و مجبورم این کارها را آرام و با احتیاط انجام دهم.' },
      { score: 3, textFa: 'برای انجام کارهای شخصی به مقداری کمک نیاز دارم، اما بیشتر آن را خودم انجام می‌دهم.' },
      { score: 4, textFa: 'برای انجام اکثر کارهای روزمره و مراقبت شخصی، هر روز به کمک دیگران نیازمندم.' },
      { score: 5, textFa: 'به دلیل درد اصلاً نمی‌توانم لباس بپوشم، شستشو بسیار دشوار است و در رختخواب می‌مانم.' }
    ]
  },
  {
    id: 3,
    titleFa: 'بخش ۳: بلند کردن اجسام',
    subtitleFa: 'وضعیت توانایی شما در جابجایی یا بلند کردن اشیاء و بارها',
    iconName: 'Package',
    options: [
      { score: 0, textFa: 'می‌توانم اجسام سنگین را بدون احساس درد اضافی بلند کنم.' },
      { score: 1, textFa: 'می‌توانم اجسام سنگین را بلند کنم اما باعث ایجاد درد اضافی در کمر می‌شود.' },
      { score: 2, textFa: 'درد مانع بلند کردن اجسام سنگین از زمین می‌شود؛ ولی اگر روی میز یا جای مناسبی باشند می‌توانم جابجا کنم.' },
      { score: 3, textFa: 'درد مانع بلند کردن اجسام سنگین است، اما اجسام سبک تا متوسط را در صورت موقعیت مناسب بلند می‌کنم.' },
      { score: 4, textFa: 'فقط قادر به بلند کردن و جابجایی اجسام بسیار سبک هستم.' },
      { score: 5, textFa: 'به هیچ وجه نمی‌توانم هیچ جسمی را بلند کنم یا حمل نمایم.' }
    ]
  },
  {
    id: 4,
    titleFa: 'بخش ۴: راه رفتن و پیاده‌روی',
    subtitleFa: 'میزان مسافتی که بدون توقف ناشی از درد کمر می‌توانید طی کنید',
    iconName: 'Footprints',
    options: [
      { score: 0, textFa: 'درد مانع از پیاده‌روی در هر مسافتی نمی‌شود.' },
      { score: 1, textFa: 'درد مانع از پیاده‌روی بیش از ۱.۵ کیلومتر (یک مایل) می‌شود.' },
      { score: 2, textFa: 'درد مانع از پیاده‌روی بیش از ۸۰۰ متر (نیم مایل) می‌شود.' },
      { score: 3, textFa: 'درد مانع از پیاده‌روی بیش از ۱۰۰ متر می‌شود.' },
      { score: 4, textFa: 'فقط با کمک عصا، واکر یا تکیه‌گاه قادر به راه رفتن هستم.' },
      { score: 5, textFa: 'بیشتر وقت به دلیل درد در رختخواب هستم و حتی تا سرویس بهداشتی به سختی حرکت می‌کنم.' }
    ]
  },
  {
    id: 5,
    titleFa: 'بخش ۵: نشستن',
    subtitleFa: 'مدت زمانی که می‌توانید بدون تشدید کمردرد روی صندلی بنشینید',
    iconName: 'Armchair',
    options: [
      { score: 0, textFa: 'می‌توانم روی هر صندلی تا هر زمانی که مایل باشم بنشینم.' },
      { score: 1, textFa: 'تنها روی صندلی راحتی مورد علاقه‌ام می‌توانم هر چقدر که می‌خواهم بنشینم.' },
      { score: 2, textFa: 'درد مانع از نشستن من برای بیش از ۱ ساعت می‌شود.' },
      { score: 3, textFa: 'درد مانع از نشستن من برای بیش از ۳۰ دقیقه می‌شود.' },
      { score: 4, textFa: 'درد مانع از نشستن من برای بیش از ۱۰ دقیقه می‌شود.' },
      { score: 5, textFa: 'درد کاملاً مانع از هر نوع نشستن من می‌شود.' }
    ]
  },
  {
    id: 6,
    titleFa: 'بخش ۶: ایستادن',
    subtitleFa: 'مدت زمانی که می‌توانید در حالت ایستاده بدون درد اضافی قرار بگیرید',
    iconName: 'UserCheck',
    options: [
      { score: 0, textFa: 'می‌توانم تا هر زمان که بخواهم بدون درد اضافی بایستم.' },
      { score: 1, textFa: 'می‌توانم هر چقدر بخواهم بایستم اما باعث ایجاد درد اضافی در کمر می‌شود.' },
      { score: 2, textFa: 'درد مانع از ایستادن من بیش از ۱ ساعت می‌شود.' },
      { score: 3, textFa: 'درد مانع از ایستادن من بیش از ۳۰ دقیقه می‌شود.' },
      { score: 4, textFa: 'درد مانع از ایستادن من بیش از ۱۰ دقیقه می‌شود.' },
      { score: 5, textFa: 'درد مانع از هرگونه ایستادن من می‌شود.' }
    ]
  },
  {
    id: 7,
    titleFa: 'بخش ۷: خوابیدن و استراحت شبانه',
    subtitleFa: 'کیفیت خواب و میزان بیدار شدن در طول شب به علت کمردرد',
    iconName: 'Moon',
    options: [
      { score: 0, textFa: 'درد هیچ‌گاه خواب مرا برهم نمی‌زند و کاملاً راحت می‌خوابم.' },
      { score: 1, textFa: 'خوابم تنها گاهی به علت درد دچار اختلال می‌شود.' },
      { score: 2, textFa: 'به دلیل درد کمتر از ۶ ساعت در شبانه‌روز می‌خوابم.' },
      { score: 3, textFa: 'به دلیل درد کمتر از ۴ ساعت در شبانه‌روز می‌خوابم.' },
      { score: 4, textFa: 'به دلیل درد کمتر از ۲ ساعت در شبانه‌روز می‌خوابم.' },
      { score: 5, textFa: 'درد به‌طور کامل مانع خوابیدن من می‌شود.' }
    ]
  },
  {
    id: 8,
    titleFa: 'بخش ۸: فعالیت و زندگی اجتماعی',
    subtitleFa: 'حضور در جمع دوستان، مهمانی‌ها، تفریحات و گردش‌های گروهی',
    iconName: 'Users',
    options: [
      { score: 0, textFa: 'زندگی اجتماعی من عادی است و هیچ درد اضافه‌ای برایم ایجاد نمی‌کند.' },
      { score: 1, textFa: 'زندگی اجتماعی من عادی است اما درجه درد کمرم را افزایش می‌دهد.' },
      { score: 2, textFa: 'درد تأثیر عمده‌ای بر فعالیت‌های اجتماعی‌ام ندارد، جز فعالیت‌های پرتحرک مانند ورزش سنگین.' },
      { score: 3, textFa: 'درد فعالیت‌های اجتماعی مرا محدود کرده و کمتر از منزل خارج می‌شوم.' },
      { score: 4, textFa: 'درد فعالیت‌های اجتماعی مرا کاملاً به محیط خانه محدود کرده است.' },
      { score: 5, textFa: 'به دلیل شدت درد هیچ‌گونه ارتباط یا فعالیت اجتماعی ندارم.' }
    ]
  },
  {
    id: 9,
    titleFa: 'بخش ۹: مسافرت و تردد',
    subtitleFa: 'سفرهای بین‌شهری، رانندگی و تردد با خودرو یا وسایل نقلیه',
    iconName: 'Compass',
    options: [
      { score: 0, textFa: 'می‌توانم به هر مقصدی بدون احساس درد سفر یا رانندگی کنم.' },
      { score: 1, textFa: 'می‌توانم به هر جایی سفر کنم ولی باعث ایجاد درد اضافی می‌شود.' },
      { score: 2, textFa: 'درد شدید است اما مسافرت‌های بیش از ۲ ساعت را هم تحمل می‌کنم.' },
      { score: 3, textFa: 'درد مسافرت‌های مرا به مسافت‌های کمتر از ۱ ساعت محدود کرده است.' },
      { score: 4, textFa: 'درد سفرهای مرا به مسافت‌های ضروری بسیار کوتاه کمتر از ۳۰ دقیقه محدود کرده است.' },
      { score: 5, textFa: 'درد مانع از هرگونه سفر یا تردد می‌شود مگر برای رفتن به مراکز درمانی و بیمارستان.' }
    ]
  },
  {
    id: 10,
    titleFa: 'بخش ۱۰: اشتغال و امور روزمره منزل (Homemaking)',
    subtitleFa: 'انجام وظایف کاری شغلی یا وظایف روتین داخل منزل (آشپزی، نظافت و...)',
    iconName: 'Briefcase',
    options: [
      { score: 0, textFa: 'فعالیت‌های شغلی و امور معمول خانه بدون هیچ دردی انجام می‌شود.' },
      { score: 1, textFa: 'فعالیت‌های شغلی و منزل را انجام می‌دهم اما دردم را افزایش می‌دهد.' },
      { score: 2, textFa: 'اکثر کارهای شغلی و منزل را انجام می‌دهم، ولی از کارهای سنگین‌تر خودداری می‌کنم.' },
      { score: 3, textFa: 'درد مانع از انجام کارهای روزمره کاری یا خانه می‌شود مگر وظایف بسیار سبک.' },
      { score: 4, textFa: 'درد مانع از انجام حتی کارهای سبک روزمره یا شغلی می‌شود.' },
      { score: 5, textFa: 'به دلیل درد به طور کامل از انجام هرگونه فعالیت شغلی یا امور منزل ناتوان هستم.' }
    ]
  }
];

export function calculateOswestryResult(answers: Record<number, number>): OswestryEvaluationResult {
  let totalScore = 0;
  let answeredCount = 0;

  for (let i = 1; i <= 10; i++) {
    if (typeof answers[i] === 'number') {
      totalScore += answers[i];
      answeredCount++;
    }
  }

  // If some section missed, score is adjusted proportionally: (score / (answeredCount * 5)) * 100
  const maxPossible = (answeredCount > 0 ? answeredCount : 10) * 5;
  const percentage = Math.round((totalScore / maxPossible) * 100);

  let disabilityLevel: 'minimal' | 'moderate' | 'severe' | 'crippled' | 'bed_bound';
  let disabilityLevelFa = '';
  let descriptionFa = '';

  if (percentage <= 20) {
    disabilityLevel = 'minimal';
    disabilityLevelFa = 'ناتوانی خفیف (Minimal Disability)';
    descriptionFa = 'بیمار توانایی انجام بیشتر فعالیت‌های روزمره زندگی را دارد. تمرینات ثبات‌دهنده، اصلاح الگوی نشستن و بلند کردن اجسام توصیه می‌شود.';
  } else if (percentage <= 40) {
    disabilityLevel = 'moderate';
    disabilityLevelFa = 'ناتوانی متوسط (Moderate Disability)';
    descriptionFa = 'بیمار در نشستن طولانی، ایستادن یا بلند کردن بار با درد و مشکل مواجه است. کنترل شخصی در فعالیت‌ها مختل شده و پایبندی به برنامه تمرینات فیزیوتراپی ضروری است.';
  } else if (percentage <= 60) {
    disabilityLevel = 'severe';
    disabilityLevelFa = 'ناتوانی شدید (Severe Disability)';
    descriptionFa = 'درد اصلی‌ترین مانع در فعالیت‌های روزمره بیمار است. خواب و فعالیت‌های عادی خانه تحت تأثیر قرار گرفته و مداخلات حمایتی فیزیوتراپی لازم است.';
  } else if (percentage <= 80) {
    disabilityLevel = 'crippled';
    disabilityLevelFa = 'زمین‌گیر یا ناتوانی حاد (Crippled)';
    descriptionFa = 'کمردرد شدید در تمامی جوانب زندگی بیمار اختلال جدی ایجاد کرده و تحرک را سلب نموده است. بررسی تشخیصی تخصصی بالینی و مراقبت ویژه الزامی است.';
  } else {
    disabilityLevel = 'bed_bound';
    disabilityLevelFa = 'بستری کامل یا ناتوانی مفرط (Bed-bound)';
    descriptionFa = 'بیمار در بستر مانده یا قادر به حرکت نیست؛ نیازمند ارزیابی فوری پزشکی و تصویربرداری تشخیصی جهت رد فوریت‌های اورژانسی نخاعی.';
  }

  return {
    totalScore,
    percentage,
    disabilityLevel,
    disabilityLevelFa,
    descriptionFa,
    completedAt: new Date().toLocaleDateString('fa-IR'),
    sectionScores: { ...answers }
  };
}

export interface VasScoreInfo {
  score: number;
  labelFa: string;
  expression: string;
  colorClass: string;
  bgClass: string;
  clinicalNoteFa: string;
}

export const VAS_LEVELS: Record<number, VasScoreInfo> = {
  1: {
    score: 1,
    labelFa: 'درد بسیار ناچیز و خفیف',
    expression: '😊',
    colorClass: 'text-[#65a30d]',
    bgClass: 'bg-[#ecfccb]',
    clinicalNoteFa: 'درد در پس‌زمینه بسیار اندک و تقریباً بدون تداخل با فعالیت‌ها'
  },
  2: {
    score: 2,
    labelFa: 'درد ملایم و سطحی',
    expression: '🙂',
    colorClass: 'text-[#4d7c0f]',
    bgClass: 'bg-[#d9f99d]',
    clinicalNoteFa: 'احساس ناراحتی اندک که به آسانی قابل نادیده گرفتن است'
  },
  3: {
    score: 3,
    labelFa: 'درد قابل توجه ولی قابل تحمل',
    expression: '😐',
    colorClass: 'text-[#0f766e]',
    bgClass: 'bg-[#ccfbf1]',
    clinicalNoteFa: 'درد احساس می‌شود اما مانع فعالیت‌های سبک و روزمره نمی‌گردد'
  },
  4: {
    score: 4,
    labelFa: 'درد متوسط و آزاردهنده',
    expression: '😕',
    colorClass: 'text-[#0e7490]',
    bgClass: 'bg-[#cffafe]',
    clinicalNoteFa: 'در صورت تمرکز، فعالیت‌ها را تحت تأثیر قرار می‌دهد'
  },
  5: {
    score: 5,
    labelFa: 'درد متوسطِ پیوسته',
    expression: '😟',
    colorClass: 'text-[#b45309]',
    bgClass: 'bg-[#fef3c7]',
    clinicalNoteFa: 'بیمار نمی‌تواند درد را نادیده بگیرد؛ تغییر وضعیت الزامی می‌شود'
  },
  6: {
    score: 6,
    labelFa: 'درد نسبتاً شدید',
    expression: '😣',
    colorClass: 'text-[#c2410c]',
    bgClass: 'bg-[#ffedd5]',
    clinicalNoteFa: 'تمرکز و کارهای روزمره به وضوح مختل می‌گردد'
  },
  7: {
    score: 7,
    labelFa: 'درد شدید و محدودکننده',
    expression: '😖',
    colorClass: 'text-[#ea580c]',
    bgClass: 'bg-[#fed7aa]',
    clinicalNoteFa: 'مانع انجام اکثر فعالیت‌های معمول زندگی و نیاز به استراحت'
  },
  8: {
    score: 8,
    labelFa: 'درد بسیار شدید',
    expression: '😫',
    colorClass: 'text-[#dc2626]',
    bgClass: 'bg-[#fee2e2]',
    clinicalNoteFa: 'حرکت کردن بسیار دشوار است و نیاز به توجه فوری درمانی دارد'
  },
  9: {
    score: 9,
    labelFa: 'درد طاقت‌فرسا',
    expression: '😭',
    colorClass: 'text-[#b91c1c]',
    bgClass: 'bg-[#fecaca]',
    clinicalNoteFa: 'ناتوانی در انجام هرگونه کار یا مکالمه راحت، درد پیوسته کوبنده'
  },
  10: {
    score: 10,
    labelFa: 'بدترین درد غیرقابل تحمل ممکن',
    expression: '😱',
    colorClass: 'text-[#991b1b]',
    bgClass: 'bg-[#fca5a5]',
    clinicalNoteFa: 'بیمار کاملاً زمین‌گیر شده و غیرقابل تحمل؛ نیازمند اورژانس پزشکی'
  }
};
