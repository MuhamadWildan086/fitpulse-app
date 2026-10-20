'use client';

import React from 'react';
import { MacroDetail } from '@/types/fitness';

interface DonutMacroChartProps {
  protein?: MacroDetail;
  carbs?: MacroDetail;
  fats?: MacroDetail;
  consumedCalories?: number;
  targetCalories?: number;
}

export const DonutMacroChart: React.FC<DonutMacroChartProps> = ({
  protein = { current: 145, target: 145, unit: 'g' },
  carbs = { current: 164, target: 210, unit: 'g' },
  fats = { current: 52, target: 65, unit: 'g' },
  consumedCalories = 1780,
  targetCalories = 2100,
}) => {
  // Convert macros to approx calories: Protein = 4 kcal/g, Carbs = 4 kcal/g, Fats = 9 kcal/g
  const proteinKcal = protein.current * 4;
  const carbsKcal = carbs.current * 4;
  const fatsKcal = fats.current * 9;
  const totalKcalCalculated = Math.max(1, proteinKcal + carbsKcal + fatsKcal);

  // Percentages based on macro calories
  const proteinPct = Math.round((proteinKcal / totalKcalCalculated) * 100);
  const carbsPct = Math.round((carbsKcal / totalKcalCalculated) * 100);
  const fatsPct = Math.max(0, 100 - proteinPct - carbsPct);

  // Donut geometry
  const radius = 70;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius; // ~439.82

  // Segments calculation:
  // Carbs segment
  const carbsDash = (carbsPct / 100) * circumference;
  // Protein segment
  const proteinDash = (proteinPct / 100) * circumference;
  // Fats segment
  const fatsDash = (fatsPct / 100) * circumference;

  // Offsets
  const carbsOffset = 0;
  const proteinOffset = -carbsDash;
  const fatsOffset = -(carbsDash + proteinDash);

  return (
    <div className="bg-surface-card rounded-3xl border border-borderSubtle p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Keseimbangan Makronutrisi
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">Distribusi Nutrisi Harian</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-100">
          Target Seimbang
        </span>
      </div>

      {/* SVG Donut Visualizer */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
        <div className="relative w-48 h-48 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
            {/* Background Base Ring */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Carbs Segment (Amber) */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#f59e0b"
              strokeWidth={strokeWidth}
              strokeDasharray={`${carbsDash} ${circumference - carbsDash}`}
              strokeDashoffset={carbsOffset}
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />

            {/* Protein Segment (Indigo/Brand) */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#5b4df3"
              strokeWidth={strokeWidth}
              strokeDasharray={`${proteinDash} ${circumference - proteinDash}`}
              strokeDashoffset={proteinOffset}
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />

            {/* Fats Segment (Rose) */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#f43f5e"
              strokeWidth={strokeWidth}
              strokeDasharray={`${fatsDash} ${circumference - fatsDash}`}
              strokeDashoffset={fatsOffset}
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Center Calories Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
            <span
              suppressHydrationWarning
              className="text-2xl font-black text-slate-900 tracking-tight leading-none"
            >
              {consumedCalories.toLocaleString('id-ID')}
            </span>
            <span
              suppressHydrationWarning
              className="text-[11px] font-semibold text-slate-400 mt-0.5"
            >
              / {targetCalories.toLocaleString('id-ID')} kkal
            </span>
            <span
              suppressHydrationWarning
              className="text-[10px] font-bold text-accent-emerald mt-1 bg-emerald-50 px-2 py-0.5 rounded-full"
            >
              {Math.round((consumedCalories / targetCalories) * 100)}% Tercapai
            </span>
          </div>
        </div>

        {/* Legend & Details */}
        <div className="w-full sm:w-auto flex-1 max-w-xs space-y-3">
          {/* Protein */}
          <div className="p-2.5 rounded-2xl bg-surface-subtle/70 border border-borderSubtle flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-brand-600 shadow-sm" />
              <div>
                <span className="text-xs font-bold text-slate-800 block leading-tight">
                  Protein
                </span>
                <span className="text-[11px] text-slate-400">
                  {proteinPct}% energi
                </span>
              </div>
            </div>
            <div className="text-right">
              <span suppressHydrationWarning className="text-xs font-black text-slate-900 block leading-tight">
                {protein.current} / {protein.target}g
              </span>
              <span suppressHydrationWarning className="text-[10px] font-semibold text-brand-600">
                {Math.round((protein.current / protein.target) * 100)}%
              </span>
            </div>
          </div>

          {/* Carbs */}
          <div className="p-2.5 rounded-2xl bg-surface-subtle/70 border border-borderSubtle flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-accent-amber shadow-sm" />
              <div>
                <span className="text-xs font-bold text-slate-800 block leading-tight">
                  Karbohidrat
                </span>
                <span suppressHydrationWarning className="text-[11px] text-slate-400">
                  {carbsPct}% energi
                </span>
              </div>
            </div>
            <div className="text-right">
              <span suppressHydrationWarning className="text-xs font-black text-slate-900 block leading-tight">
                {carbs.current} / {carbs.target}g
              </span>
              <span suppressHydrationWarning className="text-[10px] font-semibold text-amber-600">
                {Math.round((carbs.current / carbs.target) * 100)}%
              </span>
            </div>
          </div>

          {/* Fats */}
          <div className="p-2.5 rounded-2xl bg-surface-subtle/70 border border-borderSubtle flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-accent-rose shadow-sm" />
              <div>
                <span className="text-xs font-bold text-slate-800 block leading-tight">
                  Lemak
                </span>
                <span suppressHydrationWarning className="text-[11px] text-slate-400">
                  {fatsPct}% energi
                </span>
              </div>
            </div>
            <div className="text-right">
              <span suppressHydrationWarning className="text-xs font-black text-slate-900 block leading-tight">
                {fats.current} / {fats.target}g
              </span>
              <span suppressHydrationWarning className="text-[10px] font-semibold text-rose-600">
                {Math.round((fats.current / fats.target) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
