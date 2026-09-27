import { StrictExerciseDef } from '../types';

export const PROTOCOL_EXERCISES: StrictExerciseDef[] = [
  {
    id: 'deep_core',
    orderNumber: 1,
    titleFa: '۱) تقویت عضلات عمقی شکم',
    englishTitle: 'Deep Core Activation',
    hasProgression: true,
    hasAlternativeOnSeverePain: false,
    svgType: 'deep_core',
    cues: [
      'ناف را به آرامی به سمت ستون فقرات به داخل بکشید',
      'گودی کمر را مماس بر پشت دست‌ها نگه دارید و اجازه قوس ندهید',
      'تنفس شکمی و روان را در طول ۱۰ ثانیه مکث حبس نکنید'
    ],
    baseInstructionFa:
      'روی یک سطح صاف به پشت بخوابید. زانوها را خم کنید و کف پاها را روی زمین قراردهید. دست ها را پشت گودی کمر قرار دهید با به داخل کشیدن ناف گودی کمر خود را به زمین نزدیک کنید.\n۱۰ ثانیه در این حالت بمانید.\n۱۰ تکرار با ۵ ثانیه استراحت بین هر تکرار',
    levels: [
      {
        levelNumber: 1,
        title: 'سطح پایه: چسباندن گودی کمر به زمین',
        instructionFa:
          'روی یک سطح صاف به پشت بخوابید. زانوها را خم کنید و کف پاها را روی زمین قرار دهید. دست‌ها را پشت گودی کمر قرار دهید، با به داخل کشیدن ناف گودی کمر خود را به زمین نزدیک کنید. ۱۰ ثانیه در این حالت بمانید. ۱۰ تکرار با ۵ ثانیه استراحت بین هر تکرار.',
        holdSeconds: 10,
        reps: 10,
        sets: 1,
        restBetweenRepsSeconds: 5,
        isBilateral: false,
        hasRestBetweenSides: false
      },
      {
        levelNumber: 2,
        title: 'پیشرفت ۱: لغزش تک پا روی زمین',
        instructionFa:
          'روی یک سطح صاف به پشت بخوابید. زانوها را خم کنید و کف پاها را روی زمین قرار دهید. دست‌ها را پشت گودی کمر قرار دهید، با به داخل کشیدن ناف گودی کمر خود را به زمین نزدیک کنید. سپس یک پا را با کشیدن پاشنه روی زمین صاف کنید (در حین انجام این کار شکم منقبض و کمر صاف بماند). ۱۰ ثانیه در این حالت بمانید. سپس به آرامی پای صاف را خم کرده و به حالت اولیه برگردید. ۵ ثانیه استراحت کنید سپس پای مقابل را مانند قبل صاف کنید. این سیکل را ۵ بار تکرار کنید.',
        holdSeconds: 10,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 5,
        isBilateral: true,
        hasRestBetweenSides: true
      },
      {
        levelNumber: 3,
        title: 'پیشرفت ۲: بالا آوردن پاها در زاویه ۹۰ درجه و صاف کردن تک پا',
        instructionFa:
          'روی یک سطح صاف به پشت بخوابید. زانوها را خم کنید و پاها را از روی زمین بلند کنید طوری که لگن و زانوها زاویه ۹۰ درجه داشته باشند. با به داخل کشیدن ناف گودی کمر خود را به زمین نزدیک کنید. سپس یک پا را به آرامی صاف کنید تا اندکی بالای سطح زمین قرار گیرد (در حین انجام این کار شکم منقبض و کمر صاف بماند). ۱۰ ثانیه در این حالت بمانید. سپس به آرامی پای صاف را خم کرده و به حالت اولیه برگردید. ۵ ثانیه استراحت کنید سپس پای مقابل را مانند قبل صاف کنید. این سیکل را ۵ بار تکرار کنید.',
        holdSeconds: 10,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 5,
        isBilateral: true,
        hasRestBetweenSides: true
      },
      {
        levelNumber: 4,
        title: 'پیشرفت ۳: صاف کردن دو پا همزمان بالای سطح زمین',
        instructionFa:
          'روی یک سطح صاف به پشت بخوابید. زانوها را خم کنید و کف پاها را روی زمین قرار دهید. دست‌ها را پشت گودی کمر قرار دهید، با به داخل کشیدن ناف گودی کمر خود را به زمین نزدیک کنید. سپس پاها را به آرامی صاف کنید تا اندکی بالای سطح زمین قرار گیرد (در حین انجام این کار شکم منقبض و کمر صاف بماند). ۱۰ ثانیه در این حالت بمانید. سپس به آرامی پاها را خم کرده و به حالت اولیه برگردید. ۵ ثانیه استراحت کنید. این حرکت را ۱۰ بار تکرار کنید.',
        holdSeconds: 10,
        reps: 10,
        sets: 1,
        restBetweenRepsSeconds: 5,
        isBilateral: false,
        hasRestBetweenSides: false
      }
    ]
  },
  {
    id: 'mcgill_curlup',
    orderNumber: 2,
    titleFa: '۲) Mc Gill Curl Up',
    englishTitle: 'McGill Curl Up',
    hasProgression: true,
    hasAlternativeOnSeverePain: false,
    svgType: 'mcgill_curlup',
    cues: [
      'یک پا کشیده روی زمین و یک پا خمیده برای خنثی ماندن زاویه لگن',
      'سر و بالاتنه را آرام به سمت جلو بلند کنید و دست‌ها را به زانوی خم نزدیک کنید',
      'از انحنا دادن شدید به گردن پرهیز کنید؛ زاویه چانه ثابت بماند'
    ],
    baseInstructionFa:
      'روی سطح صافی به پشت بخوابید. یک پا را دراز و یک پا را از زانو خم کنید. با بلند کردن سر و بالاتنه ی خود به سمت جلو، هر دو دست خود را که در حالت کشیده قرار دارند به زانوی خم شده نزدیک کنید.\n۳ ثانیه در این حالت بمانید.\nبرای هر پا ۵ بار تکرار با ۵ ثانیه استراحت',
    levels: [
      {
        levelNumber: 1,
        title: 'سطح پایه: مکث ۳ ثانیه',
        instructionFa:
          'روی سطح صافی به پشت بخوابید. یک پا را دراز و یک پا را از زانو خم کنید. با بلند کردن سر و بالاتنه خود به سمت جلو، هر دو دست خود را که در حالت کشیده قرار دارند به زانوی خم شده نزدیک کنید. ۳ ثانیه در این حالت بمانید. برای هر پا ۵ بار تکرار با ۵ ثانیه استراحت.',
        holdSeconds: 3,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 5,
        isBilateral: true,
        hasRestBetweenSides: true
      },
      {
        levelNumber: 2,
        title: 'پیشرفت ۱: مکث ۵ ثانیه',
        instructionFa:
          'همانند وضعیت قبل؛ با بلند کردن ملایم سر و شانه به سمت جلو، هر دو دست کشیده به زانوی خم شده نزدیک می‌شود. ۵ ثانیه در این حالت بمانید. برای هر پا ۵ بار تکرار با ۵ ثانیه استراحت.',
        holdSeconds: 5,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 5,
        isBilateral: true,
        hasRestBetweenSides: true
      },
      {
        levelNumber: 3,
        title: 'پیشرفت ۲: مکث ۷ ثانیه',
        instructionFa:
          'همانند وضعیت قبل؛ سر و بالاتنه به سمت جلو بالا آمده و دست‌ها کشیده به سمت زانوی خم شده هدایت می‌شوند. ۷ ثانیه در این حالت بمانید. برای هر پا ۵ بار تکرار با ۵ ثانیه استراحت.',
        holdSeconds: 7,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 5,
        isBilateral: true,
        hasRestBetweenSides: true
      },
      {
        levelNumber: 4,
        title: 'پیشرفت ۳: مکث ۱۰ ثانیه',
        instructionFa:
          'حفظ کنترل کامل ستون فقرات بدون قوس گردن؛ ۱۰ ثانیه در این حالت بمانید. برای هر پا ۵ بار تکرار با ۵ ثانیه استراحت بین تکرارها.',
        holdSeconds: 10,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 5,
        isBilateral: true,
        hasRestBetweenSides: true
      },
      {
        levelNumber: 5,
        title: 'پیشرفت ۴: افزایش تعداد تکرار (۶ تکرار ۱۰ ثانیه‌ای)',
        instructionFa:
          'افزایش تعداد هر نوبت: ۱۰ ثانیه مکث برای هر بار؛ ۶ بار تکرار برای هر طرف با ۵ ثانیه استراحت بین تکرارها.',
        holdSeconds: 10,
        reps: 6,
        sets: 1,
        restBetweenRepsSeconds: 5,
        isBilateral: true,
        hasRestBetweenSides: true
      },
      {
        levelNumber: 6,
        title: 'پیشرفت ۵: استقامت پیشرفته (۷ تکرار ۱۰ ثانیه‌ای)',
        instructionFa:
          'افزایش تعداد هر نوبت: ۱۰ ثانیه مکث برای هر بار؛ ۷ بار تکرار برای هر طرف با ۵ ثانیه استراحت بین تکرارها.',
        holdSeconds: 10,
        reps: 7,
        sets: 1,
        restBetweenRepsSeconds: 5,
        isBilateral: true,
        hasRestBetweenSides: true
      }
    ]
  },
  {
    id: 'bird_dog',
    orderNumber: 3,
    titleFa: '۳) Bird Dog',
    englishTitle: 'Bird Dog',
    hasProgression: true,
    hasAlternativeOnSeverePain: false,
    svgType: 'bird_dog',
    cues: [
      'دست‌ها زیر شانه‌ها و زانوها دقیقاً زیر مفصل ران',
      'پا نباید بالاتر از سطح باسن برود تا گودی کمر ایجاد نشود',
      'پایداری لگن را حفظ کنید و مانع چرخش تنه شوید'
    ],
    baseInstructionFa:
      '۴ دست و پا روی زمین قرار بگیرید. سپس یک پای خود را از زمین بلند کنید تا جایی که با زمین در یک راستا قرار گیرد. توجه کنید که پای شما نباید بالاتر از سطح باسن برود. پای خود را ۵ ثانیه بالا نگه دارید. بعد پا را زمین گذاشته و این حرکت را برای سمت مقابل انجام دهید.\n۵ تکرار برای هر طرف بدون استراحت',
    levels: [
      {
        levelNumber: 1,
        title: 'سطح پایه: تک پا ۵ ثانیه',
        instructionFa:
          '۴ دست و پا روی زمین قرار بگیرید. سپس یک پای خود را از زمین بلند کنید تا جایی که با زمین در یک راستا قرار گیرد (پا نباید بالاتر از باسن برود). پای خود را ۵ ثانیه بالا نگه دارید. بعد پا را زمین گذاشته و برای سمت مقابل انجام دهید. ۵ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 5,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      },
      {
        levelNumber: 2,
        title: 'پیشرفت ۱: تک پا ۱۰ ثانیه',
        instructionFa:
          '۴ دست و پا روی زمین قرار بگیرید. پای خود را ۱۰ ثانیه بالا در راستای زمین نگه دارید. بعد پا را زمین گذاشته و این حرکت را برای سمت مقابل انجام دهید. ۵ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 10,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      },
      {
        levelNumber: 3,
        title: 'پیشرفت ۲: دست و پای متقابل ۵ ثانیه',
        instructionFa:
          'تغییر به حرکت سخت‌تر: ۴ دست و پا روی زمین قرار بگیرید. سپس یک دست خود و پای سمت مقابل را از زمین بلند کنید. توجه کنید که پای شما نباید بالاتر از سطح باسن برود. دست و پای خود را ۵ ثانیه بالا نگه دارید. ۵ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 5,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      },
      {
        levelNumber: 4,
        title: 'پیشرفت ۳: دست و پای متقابل ۱۰ ثانیه',
        instructionFa:
          'دست و پای سمت مقابل را همزمان بالا آورده و هر تکرار را به مدت ۱۰ ثانیه بالا نگه دارید. ۵ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 10,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      },
      {
        levelNumber: 5,
        title: 'پیشرفت ۴: افزایش تعداد (۶ تکرار ۱۰ ثانیه‌ای دست و پای متقابل)',
        instructionFa:
          'افزایش تعداد هر نوبت: ۱۰ ثانیه مکث برای هر بار؛ ۶ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 10,
        reps: 6,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      },
      {
        levelNumber: 6,
        title: 'پیشرفت ۵: استقامت پیشرفته (۷ تکرار ۱۰ ثانیه‌ای)',
        instructionFa:
          'افزایش تعداد هر نوبت: ۱۰ ثانیه مکث برای هر بار؛ ۷ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 10,
        reps: 7,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      }
    ]
  },
  {
    id: 'side_plank',
    orderNumber: 4,
    titleFa: '۴) Side Plank',
    englishTitle: 'Side Plank',
    hasProgression: true,
    hasAlternativeOnSeverePain: false,
    svgType: 'side_plank',
    cues: [
      'دست حایل زیر شانه قرار گیرد و وزن روی ساعد تقسیم شود',
      'کمر از زمین بلند شود تا سر، ستون فقرات و پاها در یک خط صاف قرار گیرند',
      'از افتادگی لگن به سمت پایین یا پیچش شانه به جلو بپرهیزید'
    ],
    baseInstructionFa:
      'به پهلو دراز بکشید و دست خود را حایل بدن کنید سپس با نگه داشتن دست حایل پاها و زانوها روی زمین کمر خود را از روی زمین بلند کنید و این حالت را ۳۰ ثانیه حفظ کنید.\n۵ تکرار برای هر طرف بدون استراحت',
    levels: [
      {
        levelNumber: 1,
        title: 'سطح پایه: روی زانوها ۳۰ ثانیه',
        instructionFa:
          'به پهلو دراز بکشید و دست خود را حایل بدن کنید. سپس با نگه داشتن دست حایل و زانوها روی زمین، کمر خود را از روی زمین بلند کنید و این حالت را ۳۰ ثانیه حفظ کنید. ۵ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 30,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      },
      {
        levelNumber: 2,
        title: 'پیشرفت ۱: روی زانوها ۴۵ ثانیه',
        instructionFa:
          'به پهلو دراز بکشید، دست حایل و زانوها روی زمین، کمر بلند شده و این حالت را ۴۵ ثانیه حفظ کنید. ۵ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 45,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      },
      {
        levelNumber: 3,
        title: 'پیشرفت ۲: روی زانوها ۶۰ ثانیه',
        instructionFa:
          'به پهلو دراز بکشید، دست حایل و زانوها روی زمین، کمر بلند شده و این حالت را ۶۰ ثانیه حفظ کنید. ۵ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 60,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      },
      {
        levelNumber: 4,
        title: 'پیشرفت ۳: پلانک کامل روی پاها ۳۰ ثانیه',
        instructionFa:
          'تغییر به حرکت سخت‌تر: به پهلو دراز بکشید و دست خود را حایل بدن کنید. سپس با نگه داشتن دست حایل و پاها روی زمین (زانوها صاف و بالاتر از زمین) کمر خود را از روی زمین بلند کنید و این حالت را ۳۰ ثانیه حفظ کنید. ۵ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 30,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      },
      {
        levelNumber: 5,
        title: 'پیشرفت ۴: پلانک کامل روی پاها ۴۵ ثانیه',
        instructionFa:
          'پلانک کامل روی مچ پاها و دست حایل، بدن در یک خط صاف؛ این حالت را ۴۵ ثانیه حفظ کنید. ۵ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 45,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      },
      {
        levelNumber: 6,
        title: 'پیشرفت ۵: پلانک کامل روی پاها ۶۰ ثانیه',
        instructionFa:
          'پلانک کامل روی مچ پاها و دست حایل، بدن در یک خط صاف؛ این حالت را ۶۰ ثانیه حفظ کنید. ۵ تکرار برای هر طرف بدون استراحت.',
        holdSeconds: 60,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      }
    ]
  },
  {
    id: 'cobra_pose',
    orderNumber: 5,
    titleFa: '۵) Cobra Pose (حرکت کبری)',
    englishTitle: 'Cobra Pose',
    hasProgression: false,
    hasAlternativeOnSeverePain: false,
    svgType: 'cobra_pose',
    cues: [
      'استخوان لگن به هیچ وجه نباید از روی زمین جدا شود',
      'کف دست‌ها کنار شانه‌ها؛ بالاتنه با نیروی دست‌ها بالا بیاید',
      'نگاه مستقیم به رو به رو و تنفس عمیق در طول ۳۰ ثانیه مکث'
    ],
    baseInstructionFa:
      'روی یک سطح صاف به روی شکم بخوابید و هر دو پا را بطور کشیده دراز کنید. کف دستها را کنار شانه ها قرار دهید. با کمک گرفتن از دست ها سر و سینه ی خود را از سطح زمین جدا کنید و به رو به رو نگاه کنید. توجه کنید که لگن شما نباید از زمین جدا شود.\nبه مدت ۳۰ ثانیه در این حالت بمانید و سپس به آرامی به حالت اول برگردید.\n۵ تکرار با ۱۰ ثانیه استراحت بین تکرار ها.\n(پیشرفت: ندارد)',
    levels: [
      {
        levelNumber: 1,
        title: 'وضعیت استاندارد: ۳۰ ثانیه مکث',
        instructionFa:
          'روی یک سطح صاف به روی شکم بخوابید و هر دو پا را بطور کشیده دراز کنید. کف دست‌ها را کنار شانه‌ها قرار دهید. با کمک گرفتن از دست‌ها سر و سینه خود را از سطح زمین جدا کنید و به رو به رو نگاه کنید. توجه کنید که لگن شما نباید از زمین جدا شود. به مدت ۳۰ ثانیه در این حالت بمانید و سپس به آرامی به حالت اول برگردید. ۵ تکرار با ۱۰ ثانیه استراحت بین تکرارها.',
        holdSeconds: 30,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 10,
        isBilateral: false,
        hasRestBetweenSides: false
      }
    ]
  },
  {
    id: 'glute_stretch',
    orderNumber: 6,
    titleFa: '۶) کشش عضلات باسن',
    englishTitle: 'Glute Stretch (Knee to Chest)',
    hasProgression: false,
    hasAlternativeOnSeverePain: false,
    svgType: 'glute_stretch',
    cues: [
      'دست‌ها زیر زانو و دور ران قلاب شوند نه روی کاسه زانو',
      'زانو آرام به سمت سینه هدایت شود تا کشش دلپذیر در باسن حس شود',
      'پای دیگر روی زمین صاف و سر و شانه ریلکس باشند'
    ],
    baseInstructionFa:
      'روی یک سطح صاف به پشت بخوابید. یک پا را دراز و یک پا را خم کنید. دست های خود را زیر یک زانو (دور ران) قلاب کنید و آن زانو را به سمت قفسه سینه خود بکشید.\n۳۰ ثانیه در این حالت نگه دارید. سپس پا را صاف کرده و همین حرکت را برای پای دیگر تکرار کنید.\n۵ بار تکرار برای هر پا بدون استراحت.\n(پیشرفت: ندارد)',
    levels: [
      {
        levelNumber: 1,
        title: 'وضعیت استاندارد: ۳۰ ثانیه مکث',
        instructionFa:
          'روی یک سطح صاف به پشت بخوابید. یک پا را دراز و یک پا را خم کنید. دست‌های خود را زیر یک زانو (دور ران) قلاب کنید و آن زانو را به سمت قفسه سینه خود بکشید. ۳۰ ثانیه در این حالت نگه دارید. سپس پا را صاف کرده و همین حرکت را برای پای دیگر تکرار کنید. ۵ بار تکرار برای هر پا بدون استراحت.',
        holdSeconds: 30,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      }
    ]
  },
  {
    id: 'hamstring_stretch',
    orderNumber: 7,
    titleFa: '۷) کشش عضلات همسترینگ',
    englishTitle: 'Hamstring Stretch',
    hasProgression: false,
    hasAlternativeOnSeverePain: true,
    cues: [
      'شال یا کمربند را کف پای خود بیاندازید و دو سر آن را بگیرید',
      'پا را تا حدی صاف بالا بیاورید که موجب درد نشود ولی کشش در پشت ران حس شود',
      'در صورت تشدید درد شدید در ۲ روز متوالی، وضعیت به کشش نشسته تغییر می‌یابد'
    ],
    alternativeInstructionFa:
      'حالت جایگزین نشسته (در صورت ۲ روز متوالی درد شدید):\nروی سطح صافی بنشینید و هر دو پا را خم کنید. یک پا را صاف کرده و یک شال یا کمربند را کف یک پای خود بیاندازید و دو سر آن را در دست بگیرید و شال را بکشید (تا حدی که موجب درد و ناراحتی نشود ولی کشش را در پشت ران خود احساس کنید). ۳۰ ثانیه در این حالت نگه دارید. سپس پا را خم کرده و همین حرکت را برای پای دیگر تکرار کنید. ۵ بار تکرار برای هر پا بدون استراحت.',
    svgType: 'hamstring_stretch',
    baseInstructionFa:
      'روی سطح صافی به پشت بخوابید و هر دو پا را بطور کشیده دراز کنید. یک شال یا کمربند را کف یک پای خود بیاندازید و دو سر آن را در دست بگیرید و با کشیدن شال یا کمربند پا را بصورت صاف بالا بیاورید (تا حدی که موجب درد و ناراحتی نشود ولی کشش را در پشت ران خود احساس کنید).\n۳۰ ثانیه در این حالت نگه دارید. سپس پا را صاف کرده و همین حرکت را برای پای دیگر تکرار کنید.\n۵ بار تکرار برای هر پا بدون استراحت.\n(پیشرفت: ندارد - جایگزین نشسته در صورت تشدید درد)',
    levels: [
      {
        levelNumber: 1,
        title: 'وضعیت خوابیده کلاسیک با شال',
        instructionFa:
          'روی سطح صافی به پشت بخوابید و هر دو پا را بطور کشیده دراز کنید. یک شال یا کمربند را کف یک پای خود بیاندازید و دو سر آن را در دست بگیرید و با کشیدن شال یا کمربند پا را بصورت صاف بالا بیاورید (تا حدی که موجب درد و ناراحتی نشود ولی کشش را در پشت ران خود احساس کنید). ۳۰ ثانیه در این حالت نگه دارید. سپس پا را صاف کرده و همین حرکت را برای پای دیگر تکرار کنید. ۵ بار تکرار برای هر پا بدون استراحت.',
        holdSeconds: 30,
        reps: 5,
        sets: 1,
        restBetweenRepsSeconds: 0,
        isBilateral: true,
        hasRestBetweenSides: false
      }
    ]
  }
];
