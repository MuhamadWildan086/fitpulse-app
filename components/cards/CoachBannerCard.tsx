'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';
import { useFitnessStore } from '@/stores/useFitnessStore';

export const CoachBannerCard: React.FC = () => {
  const user = useFitnessStore((state) => state.user);

  return (
    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5 bg-surface-card p-6 rounded-3xl shadow-sm border border-borderSubtle overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-brand-50/60 to-transparent pointer-events-none" />

      {/* Left: Mascot & Greetings */}
      <div className="flex items-center gap-4 z-10">
        <div className="relative flex items-center -space-x-4 flex-shrink-0">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-4 ring-white shadow-md bg-gradient-to-br from-brand-500 to-indigo-700">
            <Image
              src="/images/coaches/coach-alex.png"
              alt="Coach Alex 3D Mascot"
              width={56}
              height={56}
              priority
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-4 ring-white shadow-md bg-gradient-to-br from-amber-400 to-rose-500 z-10">
            <Image
              src="/images/coaches/coach-maya.png"
              alt="Coach Maya 3D Mascot"
              width={56}
              height={56}
              priority
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hi, {user.name.split(' ')[0]}!
            </h1>
            <span className="text-2xl animate-bounce">👋</span>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-100 text-brand-600 font-bold text-xs">
              Coach Alex & Maya Siap!
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Fokus hari ini: Pertahankan konsistensi latihan kardio dan penuhi target protein harianmu.
          </p>
        </div>
      </div>

      {/* Right: Status Pill & Quick Action */}
      <div className="flex items-center gap-3 z-10 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-subtle border border-borderSubtle text-xs font-semibold text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald animate-pulse" />
          <span>Fase Bakar Lemak Aktif</span>
        </div>

        <Link
          href="/coach"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-600 font-bold text-xs border border-brand-100 transition-all hover:scale-105"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Tanya Coach</span>
        </Link>
      </div>
    </div>
  );
};
