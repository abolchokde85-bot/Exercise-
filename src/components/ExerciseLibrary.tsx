import React, { useState } from 'react';
import { StrictExerciseDef, ExerciseStatusState } from '../types';
import { PROTOCOL_EXERCISES } from '../data/exercises';
import { ExerciseCard } from './ExerciseCard';
import { ExerciseModal } from './ExerciseModal';
import {
  BookOpen,
  Sliders,
  CheckCircle,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';

interface Props {
  statuses: Record<string, ExerciseStatusState>;
  onSelectLevel: (exerciseId: string, level: number) => void;
  onResetExclusion: (exerciseId: string) => void;
  onToggleSeatedHamstring: () => void;
}

export const ExerciseLibrary: React.FC<Props> = ({
  statuses,
  onSelectLevel,
  onResetExclusion,
  onToggleSeatedHamstring
}) => {
  const [selectedDef, setSelectedDef] = useState<StrictExerciseDef | null>(null);

  return (
    <div className="space-y-6 text-right">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              راهنمای آموزشی ۷ حرکت ورزشی پروتکل ۱۲ هفته‌ای
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            آموزش دقیق فرم صحیح، مسیر ارتقای سطوح بر اساس نمره سختی زیر ۵، و تمهیدات ایمنی در صورت تشدید درد.
          </p>
        </div>
      </div>

      {/* Protocol Summary Card */}
      <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 leading-relaxed space-y-1">
        <span className="font-bold block">مبنای علمی پیشرفت تمرینات:</span>
        <p className="text-slate-600">
          حرکات ۱ تا ۴ (شکم عمقی، کرل‌آپ، پرنده‌سگ و پلانک جانبی) دارای مسیر پیشرفت مرحله‌به‌مرحله هستند. حرکات ۵ (کبرا) و ۶ (کشش باسن) سطوح ثابت دارند و حرکت ۷ (همسترینگ) در صورت تشدید درد به فرم نشسته سوئیچ می‌شود.
        </p>
      </div>

      {/* Grid of the 7 exercises */}
      <div className="space-y-3">
        {PROTOCOL_EXERCISES.map((ex) => {
          const st = statuses[ex.id] || {
            exerciseId: ex.id,
            currentLevel: 1,
            consecutiveSeverePainDays: 0,
            consecutiveUnderFiveDifficultyDays: 0,
            isExcluded: false,
            isUsingAlternativeSeated: false,
            historyLogs: []
          };

          return (
            <ExerciseCard
              key={ex.id}
              exerciseDef={ex}
              status={st}
              onOpenDetails={() => setSelectedDef(ex)}
              onOpenFeedback={() => setSelectedDef(ex)}
            />
          );
        })}
      </div>

      {selectedDef && (
        <ExerciseModal
          exerciseDef={selectedDef}
          status={statuses[selectedDef.id]}
          isOpen={true}
          onClose={() => setSelectedDef(null)}
          onSelectLevel={(lvl) => onSelectLevel(selectedDef.id, lvl)}
          onResetExclusion={() => onResetExclusion(selectedDef.id)}
          onToggleSeatedHamstring={onToggleSeatedHamstring}
        />
      )}
    </div>
  );
};
