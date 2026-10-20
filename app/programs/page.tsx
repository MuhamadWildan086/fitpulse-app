'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Flame,
  Dumbbell,
  Play,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export default function ProgramsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const programs = [
    {
      id: 'wk_hiit_01',
      title: 'HIIT Cardio Burn & Core',
      category: 'HIIT',
      durationMinutes: 40,
      caloriesTarget: 420,
      exercisesCount: 6,
      level: 'Menengah',
      coach: 'Coach Maya',
      isCurrent: true,
      coverImage: '/images/exercises/pushup-3d.png',
      description: 'Latihan kombinasi kardio interval tinggi dan penguatan otot perut untuk pembakaran kalori maksimal.',
    },
    {
      id: 'wk_upper_02',
      title: 'Upper Body Hypertrophy',
      category: 'Kekuatan',
      durationMinutes: 45,
      caloriesTarget: 380,
      exercisesCount: 8,
      level: 'Lanjutan',
      coach: 'Coach Alex',
      isCurrent: false,
      coverImage: '/images/exercises/stretching-poses.png',
      description: 'Fokus isolasi dada, trisep, bisep, dan deltoid menggunakan teknik drop set terpandu.',
    },
    {
      id: 'wk_fullbody_03',
      title: 'Full Body Burn & Tone',
      category: 'Kekuatan',
      durationMinutes: 35,
      caloriesTarget: 350,
      exercisesCount: 7,
      level: 'Pemula',
      coach: 'Coach Alex & Maya',
      isCurrent: false,
      coverImage: '/images/exercises/squat-3d.png',
      description: 'Aktivasi seluruh kelompok otot tubuh utama dengan gerakan fungsional dinamis.',
    },
    {
      id: 'wk_core_04',
      title: 'Core Stability & Abs Blast',
      category: 'Kardio',
      durationMinutes: 25,
      caloriesTarget: 220,
      exercisesCount: 5,
      level: 'Menengah',
      coach: 'Coach Maya',
      isCurrent: false,
      coverImage: '/images/badges/fitness-icons-3d.png',
      description: 'Memperkuat otot punggung bawah, diafragma, dan membentuk otot perut yang kokoh.',
    },
  ];

  const categories = ['Semua', 'HIIT', 'Kekuatan', 'Kardio'];

  const filteredPrograms =
    selectedCategory === 'Semua'
      ? programs
      : programs.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold border border-brand-100">
              Katalog Latihan FitPulse
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Disusun oleh Pelatih Bersertifikasi
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Program Latihan Terpandu
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Pilih program latihan sesuai sasaran kebugaran, level keahlian, dan durasi harianmu.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-surface-card p-1.5 rounded-2xl border border-borderSubtle">
          <Filter className="w-4 h-4 text-slate-400 ml-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-surface-subtle'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => (
          <div
            key={program.id}
            className={`bg-surface-card rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden ${
              program.isCurrent
                ? 'border-brand-500 shadow-lg shadow-brand-500/10 ring-2 ring-brand-500/20'
                : 'border-borderSubtle hover:border-brand-200 hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-extrabold uppercase tracking-wider">
                    {program.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-subtle text-slate-600 text-[10px] font-bold">
                    {program.level}
                  </span>
                </div>

                {program.isCurrent && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-accent-emerald bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Sedang Aktif
                  </span>
                )}
              </div>

              {/* Cover Image & Title Row */}
              <div className="flex items-center gap-4 my-2">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-brand-50 border border-brand-100 flex-shrink-0 shadow-sm">
                  <Image
                    src={program.coverImage}
                    alt={program.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {program.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Dipandu oleh {program.coach}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {program.description}
              </p>

              {/* Meta metrics */}
              <div className="grid grid-cols-3 gap-3 my-5 p-3 rounded-2xl bg-surface-subtle border border-borderSubtle">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-600" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Durasi</span>
                    <span className="text-xs font-black text-slate-800">
                      {program.durationMinutes} mnt
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-accent-amber" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Kalori</span>
                    <span className="text-xs font-black text-slate-800">
                      ~{program.caloriesTarget} kkal
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-accent-emerald" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Gerakan</span>
                    <span className="text-xs font-black text-slate-800">
                      {program.exercisesCount} variasi
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-borderSubtle">
              <span className="text-xs font-semibold text-slate-500">
                Instruktur: <strong className="text-slate-800">{program.coach}</strong>
              </span>

              <button
                onClick={() => router.push('/workout/active')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs transition-all ${
                  program.isCurrent
                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 hover:scale-105 active:scale-95'
                    : 'bg-surface-subtle hover:bg-brand-50 text-slate-700 hover:text-brand-600'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{program.isCurrent ? 'Buka Sesi Aktif' : 'Mulai Program Ini'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
