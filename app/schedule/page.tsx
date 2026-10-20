'use client';

import React from 'react';
import {
  CheckCircle2,
  Watch,
} from 'lucide-react';
import { useFitnessStore } from '@/stores/useFitnessStore';

export default function SchedulePage() {
  const activeWorkout = useFitnessStore((state) => state.activeWorkout);

  const daysOfWeek = [
    { day: 'Senin', date: '6 Mei', status: 'completed', workout: 'Upper Body Blast', duration: '40m', kcal: 380 },
    { day: 'Selasa', date: '7 Mei', status: 'completed', workout: 'Leg & Core Circuit', duration: '45m', kcal: 420 },
    { day: 'Rabu', date: '8 Mei', status: 'rest', workout: 'Hari Istirahat Aktif', duration: '20m', kcal: 110 },
    { day: 'Kamis', date: '9 Mei', status: 'completed', workout: 'HIIT Cardio Burn', duration: '35m', kcal: 400 },
    { day: 'Jumat', date: '10 Mei', status: 'completed', workout: 'Full Body Mobility', duration: '30m', kcal: 260 },
    { day: 'Sabtu', date: '11 Mei', status: 'completed', workout: 'Cardio Endurance Run', duration: '50m', kcal: 490 },
    { day: 'Minggu', date: '12 Mei', status: 'today', workout: activeWorkout.title, duration: `${activeWorkout.durationMinutes}m`, kcal: activeWorkout.caloriesTarget },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold border border-brand-100">
              Jadwal & Rutinitas Mingguan
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Sinkronisasi Otomatis Jam Tangan Pintar
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kalender Latihan
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Atur keseimbangan antara sesi latihan intensif dan pemulihan tubuh aktif.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card border border-borderSubtle text-xs font-semibold text-slate-700 shadow-sm">
            <Watch className="w-4 h-4 text-brand-600" />
            <span>Apple Watch Series 9 Terhubung</span>
          </div>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
        {daysOfWeek.map((d, index) => {
          const isToday = d.status === 'today';
          const isRest = d.status === 'rest';

          return (
            <div
              key={index}
              className={`rounded-3xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                isToday
                  ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-500/20 ring-2 ring-brand-500/30'
                  : isRest
                  ? 'bg-surface-subtle/50 border-borderSubtle text-slate-500'
                  : 'bg-surface-card border-borderSubtle text-slate-800 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-extrabold uppercase ${
                      isToday ? 'text-white/80' : 'text-slate-400'
                    }`}
                  >
                    {d.day}
                  </span>
                  {isToday ? (
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold text-white">
                      Hari Ini
                    </span>
                  ) : d.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
                  ) : null}
                </div>

                <div className="text-lg font-black tracking-tight mb-3">{d.date}</div>

                <p
                  className={`text-xs font-bold leading-snug line-clamp-2 ${
                    isToday ? 'text-white' : isRest ? 'text-slate-400' : 'text-slate-900'
                  }`}
                >
                  {d.workout}
                </p>
              </div>

              <div
                className={`mt-4 pt-3 border-t text-[11px] font-semibold flex items-center justify-between ${
                  isToday ? 'border-white/20 text-white/90' : 'border-borderSubtle text-slate-400'
                }`}
              >
                <span>{d.duration}</span>
                <span>~{d.kcal} kkal</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
