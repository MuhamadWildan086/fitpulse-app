'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Menu,
  Search,
  Calendar,
  Bell,
  Play,
  Flame,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useFitnessStore } from '@/stores/useFitnessStore';

export const TopNavbar: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, isSidebarCollapsed, toggleSidebar } = useFitnessStore();

  const notifications = [
    {
      id: 1,
      title: 'Streak 7 Hari Dipertahankan!',
      time: '10 menit lalu',
      desc: 'Hebat, Andi! Kamu konsisten menjaga ritme olahraga mingguan.',
      icon: Flame,
      color: 'text-accent-amber',
    },
    {
      id: 2,
      title: 'Target Protein Tercapai',
      time: '1 jam lalu',
      desc: '145g / 145g tercapai dari menu dada ayam & greek yogurt.',
      icon: CheckCircle2,
      color: 'text-accent-emerald',
    },
  ];

  const handleStartWorkout = () => {
    router.push('/workout/active');
  };

  return (
    <header className="h-16 bg-surface-card/90 backdrop-blur-md border-b border-borderSubtle sticky top-0 z-40 px-6 flex items-center justify-between gap-4">
      {/* Left: Sidebar Toggle + Global Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-brand-600 hover:bg-surface-subtle transition-colors border border-borderSubtle flex-shrink-0"
          title={isSidebarCollapsed ? 'Perluas Sidebar' : 'Kecilkan Sidebar'}
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari program, resep makanan, atau gerakan..."
              className="w-full pl-10 pr-9 py-2 text-xs font-medium rounded-full bg-surface-subtle border border-transparent focus:border-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 text-slate-800"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block absolute right-3 text-[10px] bg-white border border-borderSubtle px-1.5 py-0.5 rounded text-slate-400 font-mono">
                /
              </kbd>
            )}
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Date & Streak Chip */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-subtle border border-borderSubtle text-xs font-semibold text-slate-700">
          <Calendar className="w-3.5 h-3.5 text-brand-600" />
          <span>Hari ini: 12 Mei 2024</span>
        </div>

        {/* Streak Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{user.streakDays} Hari Streak!</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full text-slate-500 hover:text-brand-600 hover:bg-surface-subtle transition-colors border border-borderSubtle"
            aria-label="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-rose ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-borderSubtle p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-borderSubtle">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Notifikasi ({notifications.length})
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-brand-600 hover:underline font-semibold"
                >
                  Tutup
                </button>
              </div>
              <div className="divide-y divide-borderSubtle mt-2">
                {notifications.map((n) => {
                  const NIcon = n.icon;
                  return (
                    <div key={n.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3">
                      <div className="p-1.5 rounded-xl bg-surface-subtle mt-0.5">
                        <NIcon className={`w-4 h-4 ${n.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-800">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Primary CTA: Mulai Workout */}
        <button
          onClick={handleStartWorkout}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-white text-white" />
          <span>Mulai Workout</span>
        </button>
      </div>
    </header>
  );
};
