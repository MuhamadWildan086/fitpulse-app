'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Send,
  Video,
  Calendar,
  Clock,
} from 'lucide-react';
import { formatTime } from '@/lib/format';

export default function CoachPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'Coach Maya',
      avatarUrl: '/images/coaches/coach-maya.png',
      time: '14:20',
      text: 'Halo Andi! Melihat tren 7 hari streak-mu, pemulihan otot dan hidrasi sangat krusial hari ini. Pastikan mencapai minimal 3.000 ml air putih ya!',
      isCoach: true,
    },
    {
      sender: 'Andi Pratama',
      avatarUrl: '/images/coaches/andi-avatar.png',
      time: '14:22',
      text: 'Siap Coach! Apakah saya sebaiknya menambah repetisi push up hari ini atau menjaga tempo stabil?',
      isCoach: false,
    },
    {
      sender: 'Coach Alex',
      avatarUrl: '/images/coaches/coach-alex.png',
      time: '14:23',
      text: 'Fokus pada tempo eksentrik (turun perlahan 2-3 detik) dulu Andi. Begitu postur terkunci sempurna, kita tingkatkan ke 15 reps minggu depan!',
      isCoach: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = {
      sender: 'Andi Pratama',
      avatarUrl: '/images/coaches/andi-avatar.png',
      time: formatTime(),
      text: inputValue,
      isCoach: false,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');

    // Mock quick coach response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'Coach Maya',
          avatarUrl: '/images/coaches/coach-maya.png',
          time: formatTime(),
          text: 'Pesan diterima, Andi! Kami pantau terus progres repetisimu di dashboard sesi aktif. Tetap semangat!',
          isCoach: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold border border-brand-100 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            FitPulse AI & Certified Trainer Hub
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          Konsultasi Pelatih Pribadi
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Dapatkan panduan postur form gerakan, rekomendasi nutrisi, dan jadwalkan sesi video 1-on-1.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Chat Window (7 Cols) */}
        <div className="lg:col-span-7 bg-surface-card rounded-3xl p-6 border border-borderSubtle shadow-sm flex flex-col h-[580px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-borderSubtle">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center -space-x-3">
                <div className="relative w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-white shadow-sm bg-brand-500 flex-shrink-0">
                  <Image
                    src="/images/coaches/coach-alex.png"
                    alt="Coach Alex"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-white shadow-sm bg-accent-amber flex-shrink-0 z-10">
                  <Image
                    src="/images/coaches/coach-maya.png"
                    alt="Coach Maya"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Coach Alex & Maya</h3>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-accent-emerald">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                  Online & Siap Membimbing
                </span>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold hover:bg-brand-100 transition-colors"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Jadwalkan Video</span>
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${
                  m.isCoach ? 'mr-auto' : 'ml-auto flex-row-reverse'
                }`}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-borderSubtle bg-surface-subtle">
                  <Image
                    src={m.avatarUrl}
                    alt={m.sender}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div
                    className={`flex items-center gap-2 mb-1 ${
                      m.isCoach ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-slate-600">{m.sender}</span>
                    <span className="text-[10px] text-slate-400">{m.time}</span>
                  </div>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.isCoach
                        ? 'bg-surface-subtle text-slate-800 border border-borderSubtle rounded-tl-sm'
                        : 'bg-brand-600 text-white rounded-tr-sm shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendMessage}
            className="pt-3 border-t border-borderSubtle flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ketik pertanyaan terkait form latihan atau nutrisi..."
              className="flex-1 px-4 py-2.5 rounded-full bg-surface-subtle border border-borderSubtle text-xs font-medium focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right: Coach Profiles & Video Consultation Booking (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-card rounded-3xl p-6 border border-borderSubtle shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Profil Tim Pelatih</h3>

            {/* Coach Maya */}
            <div className="p-4 rounded-2xl bg-surface-subtle border border-borderSubtle flex items-start gap-3.5 hover:border-brand-200 transition-colors">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-amber-100 flex-shrink-0 shadow-sm ring-1 ring-amber-200">
                <Image
                  src="/images/coaches/coach-maya.png"
                  alt="Coach Maya S."
                  width={56}
                  height={56}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">Coach Maya S.</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-accent-emerald text-[9px] font-extrabold">
                    Online
                  </span>
                </div>
                <p className="text-xs text-brand-600 font-semibold mt-0.5">
                  Spesialis Functional HIIT, Mobilitas & Core
                </p>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  8+ tahun pengalaman mendampingi atlet lari & HIIT conditioning.
                </p>
              </div>
            </div>

            {/* Coach Alex */}
            <div className="p-4 rounded-2xl bg-surface-subtle border border-borderSubtle flex items-start gap-3.5 hover:border-brand-200 transition-colors">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-brand-100 flex-shrink-0 shadow-sm ring-1 ring-brand-200">
                <Image
                  src="/images/coaches/coach-alex.png"
                  alt="Coach Alex T."
                  width={56}
                  height={56}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">Coach Alex T.</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-accent-emerald text-[9px] font-extrabold">
                    Online
                  </span>
                </div>
                <p className="text-xs text-brand-600 font-semibold mt-0.5">
                  Spesialis Hipertrofi & Biomekanika Otot
                </p>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Fokus pada postur ergonomis dan program penambahan massa otot bebas cedera.
                </p>
              </div>
            </div>
          </div>

          {/* Next Video Session Info */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-brand-50 to-surface-subtle border border-brand-100 shadow-sm space-y-3">
            <span className="text-[10px] font-extrabold text-brand-600 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3 text-brand-500" />
              SESI LIVE BERIKUTNYA
            </span>
            <h4 className="text-sm font-extrabold text-slate-900">
              Evaluasi Form & Penyesuaian Beban Mingguan
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-brand-600" />
              <span>Selasa, 14 Mei 2024 • 19:00 WIB (30 Menit)</span>
            </div>
            <button
              type="button"
              className="w-full py-2.5 rounded-full bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition-colors shadow-md shadow-brand-500/20"
            >
              Masuk Ruang Tunggu Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
