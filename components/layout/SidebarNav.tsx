'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Dumbbell,
  PlayCircle,
  CalendarDays,
  TrendingUp,
  UtensilsCrossed,
  Users,
  Settings,
  Flame,
  MessageSquare,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useFitnessStore } from '@/stores/useFitnessStore';

export const SidebarNav: React.FC = () => {
  const pathname = usePathname();
  const { user, isSidebarCollapsed, toggleSidebar } = useFitnessStore();

  const navItems = [
    { label: 'Beranda', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Program Latihan', href: '/programs', icon: Dumbbell },
    { label: 'Workout Sesi', href: '/workout/active', icon: PlayCircle, badge: 'LIVE' },
    { label: 'Jadwal Kalender', href: '/schedule', icon: CalendarDays },
    { label: 'Progress & Data', href: '/progress', icon: TrendingUp },
    { label: 'Nutrisi & Resep', href: '/nutrition', icon: UtensilsCrossed },
    { label: 'Komunitas', href: '/community', icon: Users },
    { label: 'Pengaturan', href: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`${
        isSidebarCollapsed ? 'w-20 p-3' : 'w-64 p-5'
      } flex-shrink-0 min-h-screen bg-surface-card border-r border-borderSubtle flex flex-col justify-between sticky top-0 h-screen select-none transition-all duration-300 ease-in-out z-30`}
    >
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pr-0.5">
        {/* Brand Logo & Toggle Header */}
        {!isSidebarCollapsed ? (
          <div className="flex items-center justify-between mb-6 px-1.5 py-1">
            <Link href="/dashboard" className="flex items-center gap-3 group min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                <Flame className="w-6 h-6 fill-white text-white" />
              </div>
              <div className="overflow-hidden transition-all duration-300">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-none whitespace-nowrap">
                  Fit<span className="text-brand-600">Pulse</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mt-0.5 whitespace-nowrap">
                  Kinetic Tracker
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={toggleSidebar}
              className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-surface-subtle rounded-xl transition-colors border border-transparent hover:border-borderSubtle flex-shrink-0"
              title="Kecilkan Sidebar"
              aria-label="Kecilkan Sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 mb-6">
            <Link href="/dashboard" className="group" title="FitPulse Home">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
                <Flame className="w-6 h-6 fill-white text-white" />
              </div>
            </Link>
            <button
              type="button"
              onClick={toggleSidebar}
              className="p-2 text-slate-400 hover:text-brand-600 hover:bg-surface-subtle rounded-xl transition-colors border border-borderSubtle"
              title="Perluas Sidebar"
              aria-label="Perluas Sidebar"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isSidebarCollapsed ? item.label : undefined}
                className={`relative flex items-center rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  isSidebarCollapsed
                    ? 'justify-center p-3'
                    : 'justify-between px-3.5 py-2.5'
                } ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-surface-subtle'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-600'
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span className="truncate whitespace-nowrap">{item.label}</span>
                  )}
                </div>

                {/* Badge when expanded */}
                {!isSidebarCollapsed && item.badge && !isActive && (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider bg-accent-rose text-white rounded-full animate-pulse flex-shrink-0">
                    {item.badge}
                  </span>
                )}
                {!isSidebarCollapsed && item.badge && isActive && (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider bg-white/20 text-white rounded-full flex-shrink-0">
                    {item.badge}
                  </span>
                )}

                {/* Badge dot when collapsed */}
                {isSidebarCollapsed && item.badge && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-rose ring-2 ring-white animate-pulse" />
                )}

                {/* Floating Tooltip when collapsed */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xl z-50 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    {item.label}
                    {item.badge && (
                      <span className="ml-1.5 px-1 py-0.2 bg-accent-rose text-white text-[9px] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Personal Coach Widget & User Profile */}
      <div className="space-y-3 pt-4 border-t border-borderSubtle mt-2">
        {/* Personal Coach Widget */}
        {!isSidebarCollapsed ? (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-brand-50 to-surface-subtle border border-brand-100 relative overflow-hidden transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-brand-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-500" />
                PERSONAL COACH
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-accent-emerald bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                Online
              </span>
            </div>

            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-brand-500 ring-1 ring-brand-200">
                <Image
                  src="/images/coaches/coach-maya.png"
                  alt="Coach Maya"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 truncate">{user.coachAssigned.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.coachAssigned.specialty}</p>
              </div>
            </div>

            <Link
              href="/coach"
              className="w-full py-1.5 px-3 text-xs font-bold text-center flex items-center justify-center gap-1.5 bg-white text-brand-600 rounded-xl border border-brand-100 hover:bg-brand-50 hover:border-brand-500/30 transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Konsultasi Sekarang
            </Link>
          </div>
        ) : (
          <div className="flex justify-center relative group">
            <Link
              href="/coach"
              className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-sm ring-2 ring-brand-200 hover:scale-105 transition-transform"
              title="Konsultasi Coach Maya (Online)"
            >
              <Image
                src="/images/coaches/coach-maya.png"
                alt="Coach Maya"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-accent-emerald ring-2 ring-white animate-pulse" />
            </Link>
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xl z-50 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 top-1">
              Coach Maya (Online)
            </div>
          </div>
        )}

        {/* User Profile Pill Card */}
        {!isSidebarCollapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-surface-subtle border border-borderSubtle transition-all duration-300">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm ring-2 ring-white flex-shrink-0 bg-brand-600">
              <Image
                src="/images/coaches/andi-avatar.png"
                alt={user.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate leading-snug">{user.name}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-semibold text-brand-600">Lv. {user.level}</span>
                <span>•</span>
                <span className="truncate">{user.membership}</span>
              </div>
            </div>
            <Link
              href="/settings"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors flex-shrink-0"
              title="Pengaturan Profil"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex justify-center relative group">
            <Link
              href="/settings"
              className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm ring-2 ring-white hover:ring-brand-300 hover:scale-105 transition-all"
              title="Profil Andi Pratama"
            >
              <Image
                src="/images/coaches/andi-avatar.png"
                alt={user.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </Link>
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xl z-50 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 top-1">
              {user.name} (Lv. {user.level})
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
