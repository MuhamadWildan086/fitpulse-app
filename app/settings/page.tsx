'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  CheckCircle2,
  Save,
} from 'lucide-react';
import { useFitnessStore } from '@/stores/useFitnessStore';

export default function SettingsPage() {
  const { user, bodyProgress } = useFitnessStore();
  const [audioCue, setAudioCue] = useState(true);
  const [smartSync, setSmartSync] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold border border-brand-100">
            Akun & Preferensi
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pengaturan Pengguna
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Kelola profil kebugaran, target fisik, serta preferensi perangkat terhubung.
        </p>
      </div>

      <div className="bg-surface-card rounded-3xl p-6 border border-borderSubtle shadow-sm space-y-6">
        {/* Profile Card */}
        <div className="flex items-center gap-4 pb-6 border-b border-borderSubtle">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-brand-600 shadow-md ring-2 ring-white flex-shrink-0">
            <Image
              src="/images/coaches/andi-avatar.png"
              alt={user.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold">
                {user.membership}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
            <p className="text-xs font-semibold text-brand-600 mt-1">
              Level {user.level} ({user.xp} XP) • {user.streakDays} Hari Streak
            </p>
          </div>
        </div>

        {/* Physical Metrics Form */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Parameter Fisik & Target
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Tinggi Badan (cm)
              </label>
              <input
                type="number"
                defaultValue={179}
                className="w-full p-2.5 rounded-xl border border-borderSubtle bg-surface-subtle text-xs font-semibold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Berat Saat Ini (kg)
              </label>
              <input
                type="number"
                defaultValue={bodyProgress.currentWeightKg}
                disabled
                className="w-full p-2.5 rounded-xl border border-borderSubtle bg-surface-subtle text-xs font-semibold text-slate-400"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Target Berat (kg)
              </label>
              <input
                type="number"
                defaultValue={bodyProgress.targetWeightKg}
                className="w-full p-2.5 rounded-xl border border-borderSubtle bg-surface-subtle text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-4 pt-4 border-t border-borderSubtle">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Preferensi Sesi & Perangkat
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-subtle">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Audio & Voice Cue Pelatih
                </span>
                <span className="text-[11px] text-slate-400">
                  Bunyi beep countdown dan petunjuk repetisi suara AI saat workout
                </span>
              </div>
              <input
                type="checkbox"
                checked={audioCue}
                onChange={() => setAudioCue(!audioCue)}
                className="w-4 h-4 accent-brand-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-subtle">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Sinkronisasi Otomatis Smartwatch
                </span>
                <span className="text-[11px] text-slate-400">
                  Sinkronisasi otomatis BPM detak jantung dan langkah kaki dari Apple Watch
                </span>
              </div>
              <input
                type="checkbox"
                checked={smartSync}
                onChange={() => setSmartSync(!smartSync)}
                className="w-4 h-4 accent-brand-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-subtle">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Pengingat Streak Harian
                </span>
                <span className="text-[11px] text-slate-400">
                  Kirim notifikasi setiap pagi pukul 07:00 jika sesi belum diselesaikan
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="w-4 h-4 accent-brand-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 flex items-center justify-between">
          {saved && (
            <span className="text-xs font-bold text-accent-emerald flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Perubahan berhasil disimpan!
            </span>
          )}
          <div className="ml-auto">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
