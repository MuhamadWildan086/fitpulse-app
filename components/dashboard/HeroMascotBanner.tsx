'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Calendar, Users, ArrowRight } from 'lucide-react';

export const HeroMascotBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 text-white shadow-xl shadow-brand-600/15 border border-white/10 p-6 md:p-8 lg:p-10">
      {/* Background Ambient Glow & Shapes */}
      <div className="bg-indigo-400/20 blur-3xl rounded-full absolute -top-10 -right-10 w-72 h-72 pointer-events-none" />
      <div className="bg-brand-500/30 blur-2xl rounded-full absolute -bottom-16 -left-16 w-80 h-80 pointer-events-none" />
      <div className="bg-accent-amber/10 blur-3xl rounded-full absolute top-1/2 left-1/3 w-64 h-64 pointer-events-none" />

      {/* Grid Layout: Left Content (60%), Right Layered 3D Scene (40%) */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Side: Copywriting & CTAs */}
        <div className="flex-1 max-w-2xl space-y-5 text-center lg:text-left">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-sm">
            <div className="relative w-4 h-4 flex-shrink-0">
              <Image
                src="/images/badges/trophy-gold.png"
                alt="3D Gold Trophy"
                width={16}
                height={16}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <span>Family & Community Fitness 🔥</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
            Workout Lebih Seru Bareng <span className="text-amber-300">Coach & Keluarga!</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/85 font-medium leading-relaxed max-w-xl">
            Ajak keluarga atau teman kamu buat bakar kalori bareng hari ini. Sesi bareng Coach Maya & Alex siap dimulai!
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <Link
              href="/workout/active"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-brand-700 hover:bg-brand-50 font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all group"
            >
              <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center">
                <Play className="w-3 h-3 fill-white ml-0.5" />
              </div>
              <span>Mulai Latihan Bersama</span>
              <ArrowRight className="w-4 h-4 text-brand-600 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/schedule"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-xs sm:text-sm backdrop-blur-md transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Jadwalkan Sesi Tamu</span>
            </Link>
          </div>

          {/* Mini social proof / active badge */}
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-white/70 font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              <span>Coach Maya & Alex Live</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>12.400+ Keluarga Aktif</span>
            </div>
          </div>
        </div>

        {/* Right Side: Layered 3D Depth Group Composition */}
        <div className="relative w-full lg:w-auto flex-shrink-0 flex items-center justify-center min-h-[260px] md:min-h-[300px] lg:min-h-[340px] px-4">
          <div className="relative flex items-end justify-center w-72 sm:w-80 md:w-96 h-64 md:h-72 lg:h-80">
            {/* Gym Backdrop Vector (Deep Layer) */}
            <div className="absolute inset-0 -top-6 flex items-center justify-center opacity-30 pointer-events-none scale-90">
              <Image
                src="/images/illustrations/community-group.png"
                alt="Gym Background Backdrop"
                width={360}
                height={220}
                className="w-full h-auto object-contain filter blur-[1px]"
              />
            </div>

            {/* Supporting Figure 1: Andi Avatar (Left-Behind, z-10) */}
            <div className="absolute left-0 bottom-4 z-10 w-24 sm:w-28 md:w-32 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/30 transform -rotate-6 hover:rotate-0 transition-transform duration-300 bg-brand-600/60 backdrop-blur-sm">
              <Image
                src="/images/coaches/andi-avatar.png"
                alt="Andi Pratama - Member"
                width={128}
                height={128}
                priority
                className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-1 inset-x-1 py-0.5 bg-black/50 backdrop-blur-md rounded-md text-[9px] font-bold text-center text-white truncate px-1">
                Andi (Dad)
              </div>
            </div>

            {/* Supporting Figure 2: Girl Avatar (Right-Behind, z-10) */}
            <div className="absolute right-0 bottom-6 z-10 w-24 sm:w-28 md:w-32 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/30 transform rotate-6 hover:rotate-0 transition-transform duration-300 bg-accent-amber/50 backdrop-blur-sm">
              <Image
                src="/images/coaches/girl-avatar.png"
                alt="Family Guest - Kid Avatar"
                width={128}
                height={128}
                priority
                className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-1 inset-x-1 py-0.5 bg-black/50 backdrop-blur-md rounded-md text-[9px] font-bold text-center text-white truncate px-1">
                Kezia (Guest)
              </div>
            </div>

            {/* Primary Figure (Front): Coach Alex or Coach Maya (Large, z-20, floating) */}
            <div className="relative z-20 animate-float flex flex-col items-center">
              <div className="w-36 sm:w-44 md:w-48 lg:w-52 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] ring-4 ring-white bg-gradient-to-b from-brand-500 to-indigo-900 group">
                <Image
                  src="/images/coaches/coach-alex.png"
                  alt="Coach Alex - Head Trainer"
                  width={208}
                  height={208}
                  priority
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Floating Name Badge */}
              <div className="absolute -bottom-3 z-30 px-3 py-1 rounded-full bg-white text-slate-900 text-[11px] font-extrabold shadow-lg flex items-center gap-1.5 border border-brand-100">
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                <span>Coach Alex & Maya</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
