'use client';

import React from 'react';
import Image from 'next/image';
import { Check, Play, Flame, CheckCircle2 } from 'lucide-react';
import { Exercise } from '@/types/fitness';

interface ExerciseListItemProps {
  exercise: Exercise;
  index: number;
  isActive?: boolean;
  onToggleComplete?: (id: string) => void;
  onSelect?: (index: number) => void;
  compact?: boolean;
}

export const ExerciseListItem: React.FC<ExerciseListItemProps> = ({
  exercise,
  index,
  isActive = false,
  onToggleComplete,
  onSelect,
  compact = false,
}) => {
  return (
    <div
      onClick={() => onSelect && onSelect(index)}
      className={`flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 border ${
        isActive
          ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20 ring-2 ring-brand-500/30'
          : exercise.completed
          ? 'bg-surface-subtle/60 border-borderSubtle text-slate-500 opacity-80 hover:opacity-100 hover:bg-surface-subtle'
          : 'bg-white border-borderSubtle text-slate-800 hover:border-brand-200 hover:shadow-sm'
      } ${onSelect ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Thumbnail or icon badge */}
        <div
          className={`relative w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 font-bold text-xs transition-all ${
            isActive
              ? 'ring-2 ring-white shadow-sm'
              : exercise.completed
              ? 'bg-emerald-100 text-accent-emerald ring-1 ring-emerald-300'
              : 'bg-surface-subtle text-slate-600'
          }`}
        >
          {exercise.videoThumbUrl ? (
            <>
              <Image
                src={exercise.videoThumbUrl}
                alt={exercise.name}
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 flex items-center justify-center transition-colors ${
                  exercise.completed
                    ? 'bg-emerald-900/40 text-white'
                    : isActive
                    ? 'bg-brand-600/50 text-white'
                    : 'bg-black/15 text-white'
                }`}
              >
                {exercise.completed ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isActive ? (
                  <Play className="w-4 h-4 fill-white" />
                ) : (
                  <span className="text-[10px] font-black drop-shadow-sm">
                    {index + 1}
                  </span>
                )}
              </div>
            </>
          ) : (
            exercise.completed ? (
              <Check className="w-5 h-5 stroke-[2.5]" />
            ) : isActive ? (
              <Play className="w-4 h-4 fill-white" />
            ) : (
              <span>{index + 1}</span>
            )
          )}
        </div>

        {/* Name and targets */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={`text-sm font-bold truncate leading-snug ${
                isActive
                  ? 'text-white'
                  : exercise.completed
                  ? 'line-through text-slate-400'
                  : 'text-slate-900'
              }`}
            >
              {exercise.name}
            </h4>
            {isActive && (
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-white/20 text-white tracking-wider">
                Aktif
              </span>
            )}
          </div>
          <p
            className={`text-xs mt-0.5 truncate ${
              isActive ? 'text-white/80' : 'text-slate-500'
            }`}
          >
            {exercise.target} • {exercise.type}
          </p>
        </div>
      </div>

      {/* Right Action / Checkbox */}
      <div className="flex items-center gap-3 flex-shrink-0 ml-2">
        {!compact && (
          <span
            className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
              isActive
                ? 'bg-white/15 text-white'
                : 'bg-surface-subtle text-slate-500'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-500" />
            ~{exercise.caloriesEst} kkal
          </span>
        )}

        {onToggleComplete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(exercise.id);
            }}
            className={`p-2 rounded-xl transition-all ${
              exercise.completed
                ? 'text-accent-emerald bg-emerald-50 hover:bg-emerald-100'
                : isActive
                ? 'text-white/70 hover:text-white bg-white/10 hover:bg-white/20'
                : 'text-slate-400 hover:text-brand-600 bg-surface-subtle hover:bg-brand-50'
            }`}
            title={exercise.completed ? 'Batalkan Selesai' : 'Tandai Selesai'}
          >
            <CheckCircle2
              className={`w-5 h-5 ${exercise.completed ? 'fill-emerald-500 text-white' : ''}`}
            />
          </button>
        )}
      </div>
    </div>
  );
};
