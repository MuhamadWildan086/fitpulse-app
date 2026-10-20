'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Trophy,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react';

export default function CommunityPage() {
  const [highFives, setHighFives] = useState<{ [key: number]: number }>({
    1: 42,
    2: 19,
    3: 88,
  });

  const handleHighFive = (id: number) => {
    setHighFives((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const feedPosts = [
    {
      id: 1,
      author: 'Budi Santoso',
      initials: 'BS',
      avatarUrl: '/images/coaches/coach-alex.png',
      badge: 'Marathoner',
      time: '15 menit lalu',
      content: 'Baru saja menyelesaikan HIIT Cardio 40 menit bersama Coach Maya! Detak jantung puncak mencapai 165 BPM. Rasanya luar biasa!',
      stats: '420 kkal • 40 mnt',
    },
    {
      id: 2,
      author: 'Clarissa Dewi',
      initials: 'CD',
      avatarUrl: '/images/coaches/girl-avatar.png',
      badge: 'Streak 14 Hari',
      time: '1 jam lalu',
      content: 'Push Up target tercapai 50 repetisi hari ini! Terima kasih untuk tips form dari FitPulse, bahu jadi tidak pegal lagi.',
      stats: '180 kkal • 25 mnt',
    },
    {
      id: 3,
      author: 'Coach Maya',
      initials: 'CM',
      avatarUrl: '/images/coaches/coach-maya.png',
      badge: 'Official Coach',
      time: '3 jam lalu',
      content: 'Selamat untuk semua member yang sudah menyelesaikan tantangan 100 Push-Up minggu ini! Jangan lupa hidrasi dan konsumsi protein berkualitas tinggi hari ini ya.',
      stats: 'Tips Pelatih FitPulse',
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Reza Pratama', xp: '4.850 XP', level: 22, streak: '24 Hari', avatar: '/images/coaches/coach-alex.png' },
    { rank: 2, name: 'Andi Pratama (Kamu)', xp: '1.650 XP', level: 14, streak: '7 Hari', isUser: true, avatar: '/images/coaches/andi-avatar.png' },
    { rank: 3, name: 'Clarissa Dewi', xp: '1.580 XP', level: 13, streak: '6 Hari', avatar: '/images/coaches/girl-avatar.png' },
    { rank: 4, name: 'Coach Maya', xp: '1.420 XP', level: 12, streak: '5 Hari', avatar: '/images/coaches/coach-maya.png' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold border border-brand-100">
            Komunitas & Leaderboard FitPulse
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          Komunitas & Tantangan Atletik
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Saling dukung sesama penggiat kebugaran, kirim High-Five, dan raih posisi puncak leaderboard!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Feed Posts (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Community Group Illustration Hero */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-700 to-indigo-900 text-white p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-md z-10">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold inline-block">
                FitPulse Athletic Club
              </span>
              <h2 className="text-2xl font-black tracking-tight">
                Latihan Bareng Lebih Seru & Konsisten!
              </h2>
              <p className="text-xs text-white/80 leading-relaxed">
                Bergabunglah dengan lebih dari 12.000 member aktif di seluruh Indonesia yang saling berbagi progres harian.
              </p>
            </div>
            <div className="relative w-44 h-32 md:w-56 md:h-36 flex-shrink-0 z-10">
              <Image
                src="/images/illustrations/community-group.png"
                alt="FitPulse Athletic Group"
                width={240}
                height={160}
                priority
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
          </div>

          {/* Active Challenge Card */}
          <div className="p-6 rounded-3xl bg-surface-card border border-borderSubtle shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 inline-flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-accent-amber" />
                  TANTANGAN MINGGU INI
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">100 Push-Up Challenge</h3>
                <p className="text-xs text-slate-500 max-w-lg">
                  Selesaikan total 100 repetisi push-up sepanjang minggu ini untuk mendapatkan lencana eksklusif Kinetic Master.
                </p>
              </div>

              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src="/images/badges/trophy-gold.png"
                  alt="3D Gold Trophy"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
            </div>

            <div className="w-full bg-surface-subtle h-2.5 rounded-full overflow-hidden">
              <div className="bg-brand-600 h-full rounded-full transition-all duration-500" style={{ width: '64%' }} />
            </div>

            <div className="flex justify-between text-xs text-slate-700 font-bold">
              <span>Progresmu: 64 / 100 Reps</span>
              <span className="text-brand-600">64% Tercapai</span>
            </div>
          </div>

          {/* Social Feed Items */}
          <div className="space-y-4">
            {feedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-surface-card rounded-3xl p-6 border border-borderSubtle shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-brand-100 flex-shrink-0 ring-2 ring-brand-100">
                      <Image
                        src={post.avatarUrl}
                        alt={post.author}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{post.author}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-surface-subtle text-slate-600 text-[10px] font-bold">
                          {post.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{post.time}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                    {post.stats}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{post.content}</p>

                <div className="flex items-center justify-between pt-3 border-t border-borderSubtle">
                  <button
                    type="button"
                    onClick={() => handleHighFive(post.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-600 bg-surface-subtle hover:bg-brand-50 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>High-Five ({highFives[post.id]})</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Beri Semangat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Leaderboard (4 Cols) */}
        <div className="lg:col-span-4 bg-surface-card rounded-3xl p-6 border border-borderSubtle shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent-amber" />
              Leaderboard Klub
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">Mingguan</span>
          </div>

          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`p-3.5 rounded-2xl flex items-center justify-between border ${
                  user.isUser
                    ? 'bg-brand-50 border-brand-200 shadow-sm'
                    : 'bg-surface-subtle/60 border-borderSubtle'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 text-center font-black text-sm ${
                      user.rank === 1
                        ? 'text-amber-500'
                        : user.rank === 2
                        ? 'text-brand-600'
                        : 'text-slate-400'
                    }`}
                  >
                    #{user.rank}
                  </span>
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white ring-1 ring-borderSubtle flex-shrink-0">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-tight">
                      {user.name}
                    </h5>
                    <span className="text-[10px] text-slate-400">
                      Lv. {user.level} • {user.streak}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black text-brand-600">{user.xp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
