'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFitnessStore } from '@/stores/useFitnessStore';

export default function WorkoutSummaryPage() {
  const router = useRouter();
  const { activeWorkout, caloriesBurnedRealtime, user } = useFitnessStore();
  const [selectedRpe, setSelectedRpe] = useState<number>(7);

  const rpeLabels: { [key: number]: string } = {
    1: 'Sangat Ringan (Pemulihan)',
    2: 'Ringan',
    3: 'Sedang',
    4: 'Agak Berat',
    5: 'Berat',
    6: 'Cukup Menantang',
    7: 'Menantang & Keringat Deras (RPE 7)',
    8: 'Sangat Berat',
    9: 'Mendekati Batas Maksimal',
    10: 'Maksimal All-Out',
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="text-center space-y-3 py-6">
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <Image
            src="/images/badges/trophy-gold.png"
            alt="3D Gold Victory Trophy"
            width={96}
            height={96}
            priority
            className="w-full h-full object-contain drop-shadow-lg transform hover:scale-110 transition-transform duration-300"
          />
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-accent-emerald text-xs font-bold border border-emerald-100">
          Sesi Berhasil Diselesaikan
        </span>
        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          Latihan Selesai! Kerja Keras Terbayar 🎉
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Kamu telah menyelesaikan <strong>{activeWorkout.title}</strong> bersama {user.coachAssigned.name}.
        </p>
      </div>

      {/* Primary Summary Metrics Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-card rounded-3xl p-5 border border-borderSubtle text-center shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Kalori Terbakar
          </span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {caloriesBurnedRealtime || activeWorkout.caloriesTarget}
            <span className="text-xs font-medium text-slate-400 ml-1">kkal</span>
          </div>
          <span className="text-xs font-bold text-accent-amber mt-1 block">
            +32% Di Atas Rata-rata
          </span>
        </div>

        <div className="bg-surface-card rounded-3xl p-5 border border-borderSubtle text-center shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Durasi Latihan
          </span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {activeWorkout.durationMinutes}
            <span className="text-xs font-medium text-slate-400 ml-1">menit</span>
          </div>
          <span className="text-xs font-bold text-brand-600 mt-1 block">
            6 Gerakan Tuntas
          </span>
        </div>

        <div className="bg-surface-card rounded-3xl p-5 border border-borderSubtle text-center shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Detak Jantung Rata-Rata
          </span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            142
            <span className="text-xs font-medium text-slate-400 ml-1">BPM</span>
          </div>
          <span className="text-xs font-bold text-accent-rose mt-1 block">
            Zona Kardio Efektif
          </span>
        </div>
      </div>

      {/* RPE Scale Selector (1-10) */}
      <div className="bg-surface-card rounded-3xl p-6 border border-borderSubtle shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Tingkat Usaha Fisik (Skala RPE 1 - 10)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Bantu AI Coach mengevaluasi tingkat kesulitan latihan hari ini
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setSelectedRpe(num)}
              className={`w-11 h-11 rounded-2xl font-extrabold text-sm transition-all duration-150 ${
                selectedRpe === num
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 scale-110 ring-2 ring-brand-300'
                  : 'bg-surface-subtle text-slate-600 hover:bg-brand-50 hover:text-brand-600 border border-borderSubtle'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="p-3 rounded-2xl bg-brand-50/70 border border-brand-100 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-600">Evaluasimu:</span>
          <span className="font-bold text-brand-600">{rpeLabels[selectedRpe]}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex-1 py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 text-center transition-all"
        >
          Kembali ke Beranda Dashboard
        </button>
        <button
          onClick={() => router.push('/nutrition')}
          className="flex-1 py-3.5 rounded-full bg-surface-card hover:bg-surface-subtle border border-borderSubtle text-slate-700 font-bold text-sm text-center transition-all"
        >
          Buka Pelacak Nutrisi
        </button>
      </div>
    </div>
  );
}
