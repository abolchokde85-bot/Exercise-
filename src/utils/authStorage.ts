import { UserAccount, OswestryEvaluationResult, GenderType } from '../types';

const USERS_STORAGE_KEY = 'steadyback_registered_users_v2';
const CURRENT_USER_KEY = 'steadyback_current_logged_in_user_v2';

export const DEMO_USER_1: UserAccount = {
  id: 'demo-user-anna',
  email: 'anna@example.com',
  fullName: 'آنا کلر',
  age: 38,
  gender: 'female',
  genderFa: 'زن',
  vasPainScore: 4,
  oswestryScore: {
    totalScore: 14,
    percentage: 28,
    disabilityLevel: 'moderate',
    disabilityLevelFa: 'ناتوانی متوسط (Moderate Disability)',
    descriptionFa: 'بیمار در نشستن طولانی و بلند کردن بار با درد مواجه است. برنامه تمرینی ثبات‌دهنده ستون فقرات برای کنترل علائم بسیار موثر است.',
    completedAt: '۱۴۰۳/۰۷/۰۱',
    sectionScores: { 1: 2, 2: 1, 3: 2, 4: 1, 5: 2, 6: 1, 7: 1, 8: 1, 9: 2, 10: 1 }
  },
  medicalHistory: 'سابقه بیرون‌زدگی خفیف دیسک مهره‌های L4-L5، احساس خشکی و گرفتگی در عضلات کمر هنگام نشستن طولانی‌مدت در محیط کار.',
  painLocation: 'ناحیه لومبار (پایین کمر)',
  isOnboarded: true,
  createdAt: '۱۴۰۳/۰۷/۰۱'
};

export const DEMO_USER_2: UserAccount = {
  id: 'demo-user-reza',
  email: '09121234567',
  fullName: 'رضا محمدی',
  age: 52,
  gender: 'male',
  genderFa: 'مرد',
  vasPainScore: 7,
  oswestryScore: {
    totalScore: 27,
    percentage: 54,
    disabilityLevel: 'severe',
    disabilityLevelFa: 'ناتوانی شدید (Severe Disability)',
    descriptionFa: 'درد مانع اصلی در فعالیت‌های روزمره بیمار است. ورزش‌های تخصصی سبک و کنترل حرکت مهره‌ها برای کاهش التهاب ریشه عصب تجویز شده است.',
    completedAt: '۱۴۰۳/۰۷/۰۳',
    sectionScores: { 1: 4, 2: 2, 3: 3, 4: 3, 5: 3, 6: 3, 7: 2, 8: 3, 9: 2, 10: 2 }
  },
  medicalHistory: 'تنگی کانال نخاعی کمری L3-L4، احساس سنگینی و درد در ساق پا پس از پیاده‌روی کوتاه.',
  painLocation: 'ستون فقرات کمری و انتشار به ران و ساق راست',
  isOnboarded: true,
  createdAt: '۱۴۰۳/۰۷/۰۳'
};

export const DEMO_USERS = [DEMO_USER_1, DEMO_USER_2];
export const DEMO_USER = DEMO_USER_1;

// Convert Persian / Arabic numerals to English digits
export function toEnglishDigits(str: string): string {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  let result = str;
  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(persianNumbers[i], 'g'), i.toString());
    result = result.replace(new RegExp(arabicNumbers[i], 'g'), i.toString());
  }
  return result;
}

export function validateContact(contact: string): { isValid: boolean; type: 'email' | 'mobile'; normalized: string; errorFa?: string } {
  const clean = toEnglishDigits(contact.trim());
  if (!clean) {
    return { isValid: false, type: 'email', normalized: '', errorFa: 'لطفاً ایمیل یا شماره همراه خود را وارد کنید.' };
  }

  // Check email
  if (clean.includes('@')) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(clean)) {
      return { isValid: true, type: 'email', normalized: clean.toLowerCase() };
    }
    return { isValid: false, type: 'email', normalized: clean, errorFa: 'فرمت آدرس ایمیل نامعتبر است (مثال: user@example.com).' };
  }

  // Check mobile (Iran mobile format: 09... or 9... or +989...)
  const digitsOnly = clean.replace(/[\s-]/g, '');
  const mobileRegex = /^(?:(?:\+98)|(?:0))?9\d{9}$/;
  if (mobileRegex.test(digitsOnly)) {
    // Normalize to standard 09xxxxxxxxx
    let norm = digitsOnly;
    if (norm.startsWith('+98')) norm = '0' + norm.substring(3);
    else if (norm.startsWith('9')) norm = '0' + norm;
    return { isValid: true, type: 'mobile', normalized: norm };
  }

  // If not matching email format and not 11-digit mobile:
  if (/^\d+$/.test(digitsOnly)) {
    return { isValid: false, type: 'mobile', normalized: digitsOnly, errorFa: 'شماره همراه باید ۱۱ رقم بوده و با ۰۹ شروع شود (مثال: ۰۹۱۲۳۴۵۶۷۸۹).' };
  }

  return { isValid: false, type: 'email', normalized: clean, errorFa: 'لطفاً یک شماره همراه معتبر (۰۹...) یا آدرس ایمیل وارد نمایید.' };
}

export function getRegisteredUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }
    // Ensure demo users are accessible
    const userIds = new Set(parsed.map((u: UserAccount) => u.id));
    let updated = false;
    for (const demo of DEMO_USERS) {
      if (!userIds.has(demo.id)) {
        parsed.unshift(demo);
        updated = true;
      }
    }
    if (updated) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return DEMO_USERS;
  }
}

export function saveRegisteredUsers(users: UserAccount[]) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

export function getCurrentUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: UserAccount | null) {
  try {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  } catch {
    // ignore
  }
}

export function registerNewUser(
  contactInput: string,
  password?: string
): { success: boolean; user?: UserAccount; errorFa?: string } {
  const check = validateContact(contactInput);
  if (!check.isValid) {
    return { success: false, errorFa: check.errorFa };
  }

  const cleanContact = check.normalized;
  const users = getRegisteredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === cleanContact.toLowerCase());
  if (existing) {
    return {
      success: false,
      errorFa: check.type === 'mobile'
        ? 'حسابی با این شماره همراه قبلاً ثبت شده است. لطفاً وارد شوید.'
        : 'حسابی با این ایمیل قبلاً ثبت شده است. لطفاً وارد شوید.'
    };
  }

  const newUser: UserAccount = {
    id: `user-${Date.now()}`,
    email: cleanContact,
    password: password || '123456',
    fullName: '',
    age: '',
    gender: 'male',
    genderFa: 'مرد',
    isOnboarded: false, // will trigger mandatory onboarding: Name, Age, Gender -> VAS -> Modified Oswestry!
    createdAt: new Date().toLocaleDateString('fa-IR')
  };

  const updatedUsers = [newUser, ...users];
  saveRegisteredUsers(updatedUsers);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

export function loginExistingUser(
  contactInput: string,
  _password?: string
): { success: boolean; user?: UserAccount; errorFa?: string } {
  const check = validateContact(contactInput);
  if (!check.isValid) {
    return { success: false, errorFa: check.errorFa };
  }

  const cleanContact = check.normalized;
  const users = getRegisteredUsers();
  const user = users.find((u) => u.email.toLowerCase() === cleanContact.toLowerCase());

  if (!user) {
    return {
      success: false,
      errorFa: 'حساب کاربری با این مشخصات یافت نشد. لطفاً ابتدا ثبت‌نام نمایید.'
    };
  }

  setCurrentUser(user);
  return { success: true, user };
}

export function switchActiveUser(userId: string): UserAccount | null {
  const users = getRegisteredUsers();
  const target = users.find((u) => u.id === userId);
  if (!target) return null;
  setCurrentUser(target);
  return target;
}

export function updateUserOnboardingData(
  userId: string,
  data: {
    fullName: string;
    age: number | string;
    gender: GenderType;
    genderFa: string;
    vasPainScore: number;
    oswestryScore: OswestryEvaluationResult;
    medicalHistory?: string;
    painLocation?: string;
  }
): UserAccount {
  const users = getRegisteredUsers();
  const targetIndex = users.findIndex((u) => u.id === userId);

  let updatedUser: UserAccount;

  if (targetIndex >= 0) {
    updatedUser = {
      ...users[targetIndex],
      ...data,
      isOnboarded: true
    };
    users[targetIndex] = updatedUser;
    saveRegisteredUsers(users);
  } else {
    updatedUser = {
      id: userId,
      email: 'user@example.com',
      ...data,
      isOnboarded: true,
      createdAt: new Date().toLocaleDateString('fa-IR')
    };
    saveRegisteredUsers([updatedUser, ...users]);
  }

  setCurrentUser(updatedUser);
  return updatedUser;
}

export function logoutActiveUser() {
  setCurrentUser(null);
}
