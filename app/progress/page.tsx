'use client';

import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useFitnessStore } from '@/stores/useFitnessStore';

export default function ProgressPage() {
  const { bodyProgress, updateWeight } = useFitnessStore();
  const [newWeightInput, setNewWeightInput] = useState('');

  const handleUpdateWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newWeightInput);
    if (!isNaN(val) && val > 30 && val < 200) {
      updateWeight(val);
      setNewWeightInput('');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold border border-brand-100">
              Analisis Komposisi Tubuh
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Terverifikasi Smart Scale
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Progress & Tren Transformasi Fisik
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Pantau pengurangan massa lemak, tren berat badan mingguan, dan indeks massa tubuh (BMI).
          </p>
        </div>

        {/* Form Quick Log Weight */}
        <form onSubmit={handleUpdateWeight} className="flex items-center gap-2">
          <input
            type="number"
            step="0.1"
            placeholder="Berat baru (kg)..."
            value={newWeightInput}
            onChange={(e) => setNewWeightInput(e.target.value)}
            className="w-40 px-3.5 py-2 rounded-full border border-borderSubtle bg-surface-card text-xs font-bold focus:outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all hover:scale-105 active:scale-95"
          >
            Catat Berat
          </button>
        </form>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-card rounded-3xl p-5 border border-borderSubtle shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Berat Badan Saat Ini
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">
              {bodyProgress.currentWeightKg}
            </span>
            <span className="text-xs font-semibold text-slate-400">kg</span>
          </div>
          <span className="text-xs font-bold text-accent-emerald flex items-center gap-1 mt-2">
            <ArrowDown className="w-3.5 h-3.5" />
            {bodyProgress.weeklyChangeKg} kg minggu ini
          </span>
        </div>

        <div className="bg-surface-card rounded-3xl p-5 border border-borderSubtle shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Target Berat Ideal
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">
              {bodyProgress.targetWeightKg}
            </span>
            <span className="text-xs font-semibold text-slate-400">kg</span>
          </div>
          <span className="text-xs font-semibold text-brand-600 mt-2 block">
            Tersisa {(bodyProgress.currentWeightKg - bodyProgress.targetWeightKg).toFixed(1)} kg lagi
          </span>
        </div>

        <div className="bg-surface-card rounded-3xl p-5 border border-borderSubtle shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Indeks Massa Tubuh (BMI)
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">{bodyProgress.bmi}</span>
          </div>
          <span className="text-xs font-bold text-accent-emerald mt-2 block">
            {bodyProgress.bmiStatus}
          </span>
        </div>

        <div className="bg-surface-card rounded-3xl p-5 border border-borderSubtle shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Estimasi Lemak Tubuh
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900">14.2%</span>
          </div>
          <span className="text-xs font-semibold text-accent-emerald mt-2 block">
            Rentang Atletis (Ideal)
          </span>
        </div>
      </div>

      {/* Weight History SVG Trend Chart */}
      <div className="bg-surface-card rounded-3xl p-6 border border-borderSubtle shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Tren Pengurangan Berat Badan</h3>
            <p className="text-xs text-slate-400">
              Konsistensi defisit kalori dan latihan intensitas tinggi membuahkan hasil
            </p>
          </div>
          <span className="text-xs font-bold text-accent-emerald bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Tren Positif (-1.5 kg Total)
          </span>
        </div>

        {/* SVG Graphic */}
        <div className="p-4 rounded-2xl bg-surface-subtle/70 border border-borderSubtle">
          <div className="relative h-48 w-full">
            <svg className="w-full h-full" viewBox="0 0 600 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5b4df3" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#5b4df3" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area */}
              <polygon
                points="50,40 200,65 380,95 550,115 550,140 50,140"
                fill="url(#chartGlow)"
              />

              {/* Line */}
              <polyline
                fill="none"
                stroke="#5b4df3"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="50,40 200,65 380,95 550,115"
              />

              {/* Points */}
              <circle cx="50" cy="40" r="6" fill="#5b4df3" stroke="#ffffff" strokeWidth="2" />
              <circle cx="200" cy="65" r="6" fill="#5b4df3" stroke="#ffffff" strokeWidth="2" />
              <circle cx="380" cy="95" r="6" fill="#5b4df3" stroke="#ffffff" strokeWidth="2" />
              <circle cx="550" cy="115" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex justify-between items-center text-xs font-bold text-slate-500 pt-3 border-t border-borderSubtle px-2">
            {bodyProgress.history.map((h, i) => (
              <div key={i} className="text-center">
                <span className="block text-[11px] text-slate-400">{h.date}</span>
                <span className="block font-black text-slate-800">{h.weight} kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
