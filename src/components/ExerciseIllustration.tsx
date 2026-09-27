import React from 'react';

interface Props {
  type: string;
  className?: string;
  variant?: 'thumbnail' | 'detailed';
  showAlignmentGuide?: boolean;
}

export const ExerciseIllustration: React.FC<Props> = ({
  type,
  className = 'w-full h-44',
  variant = 'detailed',
  showAlignmentGuide = true
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl flex items-center justify-center p-2 ${className}`}>
      {renderSvgByType(type, variant, showAlignmentGuide)}
    </div>
  );
};

function renderSvgByType(type: string, variant: 'thumbnail' | 'detailed', showGuide: boolean) {
  const isThumbnail = variant === 'thumbnail';

  switch (type) {
    case 'deep_core':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mat */}
          <rect x="20" y="145" width="280" height="6" rx="3" fill="#334155" />

          {/* Spine & Back on mat */}
          <path d="M78 140 C100 142 125 144 155 144" stroke="#0d9488" strokeWidth="6" strokeLinecap="round" />

          {/* Hands under lumbar lordosis */}
          <rect x="120" y="141" width="30" height="7" rx="3.5" fill="#f59e0b" fillOpacity="0.4" stroke="#d97706" strokeWidth="1.5" />
          {!isThumbnail && (
            <text x="135" y="157" textAnchor="middle" fontSize="8" fill="#fbbf24" fontWeight="bold">
              دست‌ها زیر گودی کمر
            </text>
          )}

          {/* Head & Neck */}
          <ellipse cx="65" cy="136" rx="14" ry="12" fill="#0f766e" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2.5" />

          {/* Navel inward animated vector */}
          <g>
            <circle cx="135" cy="132" r="3.5" fill="#f59e0b" />
            <path d="M135 122 L135 138" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M130 132 L135 138 L140 132" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,5; 0,0"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </g>

          {/* Pelvis */}
          <circle cx="160" cy="140" r="10" fill="#0f766e" fillOpacity="0.4" stroke="#0d9488" strokeWidth="2" />

          {/* Bent legs */}
          <path d="M168 138 L200 102 L235 145" stroke="#14b8a6" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M228 145 H248" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />

          {!isThumbnail && (
            <>
              {/* Text indicator */}
              <text x="160" y="32" textAnchor="middle" fontSize="12" fill="#5eead4" fontWeight="bold">
                ناف به داخل • کمر مماس بر دست‌ها (۱۰ ثانیه)
              </text>

              {/* Spine pressure green guide dots */}
              <circle cx="125" cy="142" r="2" fill="#10b981" />
              <circle cx="135" cy="142" r="2" fill="#10b981" />
              <circle cx="145" cy="142" r="2" fill="#10b981" />
            </>
          )}
        </svg>
      );

    case 'mcgill_curlup':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mat */}
          <rect x="20" y="145" width="280" height="6" rx="3" fill="#334155" />

          {/* One leg straight on mat */}
          <line x1="160" y1="144" x2="265" y2="144" stroke="#0f766e" strokeWidth="5" strokeLinecap="round" opacity="0.65" />

          {/* One leg bent at knee */}
          <path d="M160 144 L195 105 L225 145" stroke="#14b8a6" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M220 145 H238" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />

          {/* Animated Curled Torso, Head, and Reaching Arms */}
          <g>
            {/* Elevated head */}
            <circle cx="85" cy="115" r="13" fill="#0f766e" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2.5" />
            {/* Curled chest and spine */}
            <path d="M85 128 C105 135 130 144 160 144" stroke="#0d9488" strokeWidth="6" strokeLinecap="round" />
            {/* Arms reaching towards bent knee */}
            <line x1="105" y1="130" x2="185" y2="112" stroke="#2dd4bf" strokeWidth="4.5" strokeLinecap="round" />

            {/* Target motion indicator */}
            <circle cx="185" cy="112" r="4" fill="#f59e0b" />

            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 8,-6; 0,0"
              dur="3s"
              repeatCount="indefinite"
            />
          </g>

          {!isThumbnail && (
            <>
              {/* Dynamic direction arrow */}
              <path d="M110 106 L134 98" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M128 95 L135 98 L130 104" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="160" y="32" textAnchor="middle" fontSize="12" fill="#5eead4" fontWeight="bold">
                دست‌ها به زانوی خم نزدیک شود (مکث ۳ تا ۱۰ ثانیه)
              </text>
            </>
          )}
        </svg>
      );

    case 'bird_dog':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mat */}
          <rect x="20" y="148" width="280" height="6" rx="3" fill="#334155" />

          {/* Supporting vertical hand */}
          <line x1="135" y1="148" x2="135" y2="105" stroke="#0f766e" strokeWidth="5.5" strokeLinecap="round" />

          {/* Supporting grounded knee */}
          <path d="M190 148 L190 110 L210 148" stroke="#0f766e" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Stable neutral horizontal spine */}
          <line x1="130" y1="105" x2="195" y2="105" stroke="#0d9488" strokeWidth="6.5" strokeLinecap="round" />

          {/* Head looking straight down */}
          <circle cx="115" cy="98" r="11" fill="#0f766e" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2.5" />

          {/* Horizontal Level Guide line (Never above hip) */}
          <line x1="50" y1="105" x2="280" y2="105" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />

          {/* Extended arm reaching forward */}
          <g>
            <line x1="130" y1="105" x2="60" y2="105" stroke="#2dd4bf" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="60" cy="105" r="3.5" fill="#f59e0b" />
          </g>

          {/* Extended leg reaching back in line with spine */}
          <g>
            <line x1="195" y1="105" x2="270" y2="105" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
            <circle cx="270" cy="105" r="3.5" fill="#10b981" />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-3; 0,0"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </g>

          {!isThumbnail && (
            <>
              <text x="160" y="32" textAnchor="middle" fontSize="12" fill="#5eead4" fontWeight="bold">
                پا در یک راستا با باسن • بدون چرخش لگن و قوس کمر
              </text>
            </>
          )}
        </svg>
      );

    case 'side_plank':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mat */}
          <rect x="25" y="148" width="270" height="6" rx="3" fill="#334155" />

          {/* Supporting Forearm */}
          <line x1="105" y1="148" x2="105" y2="115" stroke="#0f766e" strokeWidth="6" strokeLinecap="round" />

          {/* Feet / Knees resting on floor */}
          <path d="M210 148 L210 135 L235 148" stroke="#0f766e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

          {/* Animated Elevated Torso Bridge */}
          <g>
            <line x1="105" y1="115" x2="210" y2="135" stroke="#2dd4bf" strokeWidth="7" strokeLinecap="round" />
            {/* Head in line */}
            <circle cx="85" cy="110" r="11" fill="#0f766e" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2.5" />

            {/* Core elevation glow */}
            <circle cx="155" cy="125" r="5" fill="#10b981" />

            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-5; 0,0"
              dur="3s"
              repeatCount="indefinite"
            />
          </g>

          {/* Elevation vector arrows */}
          <path d="M155 144 L155 128" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M150 132 L155 126 L160 132" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {!isThumbnail && (
            <text x="160" y="32" textAnchor="middle" fontSize="12" fill="#5eead4" fontWeight="bold">
              بلند کردن کمر از زمین با دست حایل (۳۰ تا ۶۰ ثانیه)
            </text>
          )}
        </svg>
      );

    case 'cobra_pose':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mat */}
          <rect x="25" y="148" width="270" height="6" rx="3" fill="#334155" />

          {/* Extended legs on floor */}
          <line x1="175" y1="145" x2="265" y2="145" stroke="#0f766e" strokeWidth="5.5" strokeLinecap="round" />

          {/* Pelvis staying down on mat (CRITICAL CLINICAL RULE) */}
          <ellipse cx="175" cy="144" rx="12" ry="7" fill="#10b981" fillOpacity="0.4" stroke="#059669" strokeWidth="2" />
          {!isThumbnail && (
            <text x="175" y="160" textAnchor="middle" fontSize="8" fill="#34d399" fontWeight="bold">
              لگن ثابت روی زمین
            </text>
          )}

          {/* Hands beside shoulders pressing down */}
          <path d="M115 105 L115 145" stroke="#0f766e" strokeWidth="5.5" strokeLinecap="round" />

          {/* Arched Torso & Head with smooth upward breathing loop */}
          <g>
            <path d="M175 143 C150 135 125 110 105 92" stroke="#2dd4bf" strokeWidth="6.5" strokeLinecap="round" />
            <circle cx="102" cy="78" r="12" fill="#0f766e" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2.5" />

            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-4; 0,0"
              dur="4s"
              repeatCount="indefinite"
            />
          </g>

          {!isThumbnail && (
            <text x="160" y="32" textAnchor="middle" fontSize="12" fill="#5eead4" fontWeight="bold">
              لگن نباید از زمین جدا شود • نگاه رو به رو (۳۰ ثانیه)
            </text>
          )}
        </svg>
      );

    case 'glute_stretch':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mat */}
          <rect x="25" y="148" width="270" height="6" rx="3" fill="#334155" />

          {/* Head & Neck flat */}
          <circle cx="65" cy="138" r="12" fill="#0f766e" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2.5" />

          {/* Back flat on floor */}
          <line x1="80" y1="144" x2="160" y2="144" stroke="#0f766e" strokeWidth="6" strokeLinecap="round" />

          {/* Straight resting leg */}
          <line x1="160" y1="144" x2="260" y2="144" stroke="#0f766e" strokeWidth="5" strokeLinecap="round" opacity="0.6" />

          {/* Bent leg pulled toward chest */}
          <g>
            <path d="M160 144 C160 115 130 95 120 100 C110 105 105 125 115 135" stroke="#2dd4bf" strokeWidth="6" strokeLinecap="round" />

            {/* Clasped hands around thigh */}
            <path d="M85 140 C100 130 115 115 125 110" stroke="#f59e0b" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="125" cy="110" r="4" fill="#d97706" />

            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -4,3; 0,0"
              dur="3s"
              repeatCount="indefinite"
            />
          </g>

          {!isThumbnail && (
            <text x="160" y="32" textAnchor="middle" fontSize="12" fill="#5eead4" fontWeight="bold">
              قلاب دست‌ها دور ران و کشش ملایم به سمت سینه (۳۰ ثانیه)
            </text>
          )}
        </svg>
      );

    case 'hamstring_stretch':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mat */}
          <rect x="25" y="148" width="270" height="6" rx="3" fill="#334155" />

          {/* Back and head on floor */}
          <circle cx="65" cy="138" r="12" fill="#0f766e" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2.5" />
          <line x1="80" y1="144" x2="160" y2="144" stroke="#0f766e" strokeWidth="6" strokeLinecap="round" />

          {/* Straight resting leg */}
          <line x1="160" y1="144" x2="260" y2="144" stroke="#0f766e" strokeWidth="5" strokeLinecap="round" opacity="0.6" />

          {/* Elevated straight leg with towel/strap */}
          <g>
            <line x1="160" y1="144" x2="195" y2="60" stroke="#2dd4bf" strokeWidth="6" strokeLinecap="round" />
            <line x1="190" y1="60" x2="205" y2="60" stroke="#14b8a6" strokeWidth="4.5" strokeLinecap="round" />

            {/* Strap / Towel from foot to hands */}
            <path d="M197 60 L110 135" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" strokeLinecap="round" />
            <circle cx="110" cy="135" r="4.5" fill="#f59e0b" />

            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 160 144; -4 160 144; 0 160 144"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </g>

          {!isThumbnail && (
            <text x="160" y="32" textAnchor="middle" fontSize="12" fill="#5eead4" fontWeight="bold">
              کشش خوابیده با شال/کمربند تا آستانه کشش پشت ران (۳۰ ثانیه)
            </text>
          )}
        </svg>
      );

    case 'hamstring_stretch_seated':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mat */}
          <rect x="25" y="148" width="270" height="6" rx="3" fill="#334155" />

          {/* Seated Pelvis */}
          <circle cx="115" cy="144" r="9" fill="#0f766e" fillOpacity="0.5" />

          {/* One leg bent to side */}
          <path d="M115 144 L145 130 L160 145" stroke="#0f766e" strokeWidth="4.5" strokeLinecap="round" opacity="0.6" />

          {/* Straight leg forward */}
          <line x1="115" y1="145" x2="240" y2="145" stroke="#2dd4bf" strokeWidth="6" strokeLinecap="round" />
          <line x1="240" y1="145" x2="240" y2="132" stroke="#14b8a6" strokeWidth="4.5" strokeLinecap="round" />

          {/* Seated Torso & Reaching Arms with strap */}
          <g>
            <circle cx="105" cy="85" r="13" fill="#0f766e" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2.5" />
            <line x1="105" y1="98" x2="115" y2="145" stroke="#0d9488" strokeWidth="6" strokeLinecap="round" />

            {/* Hands & Strap */}
            <line x1="115" y1="110" x2="145" y2="118" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
            <path d="M240 135 L145 118" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" strokeLinecap="round" />
            <circle cx="145" cy="118" r="4" fill="#f59e0b" />

            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 6,3; 0,0"
              dur="3s"
              repeatCount="indefinite"
            />
          </g>

          {!isThumbnail && (
            <text x="160" y="32" textAnchor="middle" fontSize="12" fill="#fbbf24" fontWeight="bold">
              حالت جایگزین نشسته: کشش همسترینگ با شال روی زمین (۳۰ ثانیه)
            </text>
          )}
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 320 180" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="148" width="270" height="6" rx="3" fill="#334155" />
          <circle cx="100" cy="90" r="14" fill="#0f766e" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2.5" />
          <path d="M100 105 L100 140 L160 145" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
  }
}
