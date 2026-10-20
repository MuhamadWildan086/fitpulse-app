'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Flame,
  Clock,
  Dumbbell,
  Footprints,
  Play,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Droplets,
  Scale,
} from 'lucide-react';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { StatMetricCard } from '@/components/cards/StatMetricCard';
import { HeroMascotBanner } from '@/components/dashboard/HeroMascotBanner';
import { DonutMacroChart } from '@/components/nutrition/DonutMacroChart';
import { ExerciseListItem } from '@/components/workout/ExerciseListItem';

export default function DashboardPage() {
  const router = useRouter();
  const {
    user,
    activeWorkout,
    nutritionLog,
    bodyProgress,
    toggleExercise,
    setCurrentExerciseIndex,
    addWater,
  } = useFitnessStore();

  const completedExercisesCount = activeWorkout.exercises.filter((e) => e.completed).length;
  const progressPercent = Math.round(
    (completedExercisesCount / activeWorkout.exercises.length) * 100
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Layered 3D Hero Mascot Banner (Coach + Family/Guest Group) */}
      <HeroMascotBanner />

      {/* 2. Kinetic Pulse Hero Stat Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 text-white p-6 md:p-8 shadow-xl shadow-brand-600/15">
        {/* Glow circles */}
        <div className="absolute -right-20 -bottom-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Circular SVG Gauge for Calories */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative flex items-center justify-center flex-shrink-0">
              <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 120 120">
                <circle
                  className="text-white/20"
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  className="text-white transition-all duration-1000 ease-out"
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray="314.159"
                  strokeDashoffset="212"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black tracking-tight leading-none text-white">
                  650
                </span>
                <span className="text-[11px] font-semibold text-brand-100 mt-1">
                  / 2.000 kkal
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                Kalori Terbakar Hari Ini
              </span>
              <p className="text-sm text-white/90 font-medium">
                Terbakar 32.5% dari target harianmu.
              </p>
              <p className="text-xs text-brand-100 font-semibold">
                Tersisa 1.350 kkal untuk dicapai hari ini!
              </p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-3">
            {/* Steps */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-white/80">Langkah</span>
                <Footprints className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <div className="text-xl font-black text-white tracking-tight">7.245</div>
                <div className="text-[10px] text-white/70">Target 10.000</div>
              </div>
            </div>

            {/* Active Time */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-white/80">Aktivitas</span>
                <Clock className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <div className="text-xl font-black text-white tracking-tight">
                  60 <span className="text-xs font-normal">mnt</span>
                </div>
                <div className="text-[10px] text-white/70">+15 mnt dr kemarin</div>
              </div>
            </div>

            {/* Workouts */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-white/80">Latihan</span>
                <Dumbbell className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <div className="text-xl font-black text-white tracking-tight">
                  2 <span className="text-xs font-normal">sesi</span>
                </div>
                <div className="text-[10px] text-white/70">Pagi & Sore</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="lg:col-span-3 flex flex-col justify-center items-stretch gap-2.5">
            <button
              onClick={() => router.push('/workout/active')}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-brand-600 font-extrabold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Lanjutkan Sesi Latihan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-2 text-white font-bold text-xs text-center bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <div className="relative w-6 h-6 flex-shrink-0">
                <Image
                  src="/images/badges/trophy-gold.png"
                  alt="3D Gold Trophy Badge"
                  width={24}
                  height={24}
                  priority
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              <span>Streak {user.streakDays} Hari Aktif! (+100 XP)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Stat Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatMetricCard
          label="Kalori Harian"
          value="1.780"
          unit="/ 2.100 kkal"
          subtext="84.7% dari target nutrisi"
          progressPercent={84.7}
          icon={Flame}
          iconBgColor="bg-amber-50"
          iconColor="text-accent-amber"
          trend={{ value: '+120 kkal', isPositive: true }}
        />
        <StatMetricCard
          label="Durasi Latihan"
          value="40"
          unit="menit"
          subtext="Target hari ini tercapai"
          progressPercent={100}
          icon={Clock}
          iconBgColor="bg-brand-50"
          iconColor="text-brand-600"
          trend={{ value: 'Optimal', isPositive: true }}
        />
        <StatMetricCard
          label="Berat Badan"
          value={bodyProgress.currentWeightKg.toFixed(1)}
          unit="kg"
          subtext={`Target ${bodyProgress.targetWeightKg} kg • BMI ${bodyProgress.bmi}`}
          progressPercent={75}
          icon={Scale}
          iconBgColor="bg-emerald-50"
          iconColor="text-accent-emerald"
          trend={{ value: `${bodyProgress.weeklyChangeKg} kg/mgg`, isPositive: true }}
        />
        <StatMetricCard
          label="Tingkat Level & XP"
          value={`Lv. ${user.level}`}
          unit={`${user.xp} / ${user.nextLevelXp} XP`}
          subtext="350 XP menuju Level 15"
          progressPercent={(user.xp / user.nextLevelXp) * 100}
          icon={Sparkles}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
          trend={{ value: '+150 XP', isPositive: true }}
        />
      </div>

      {/* 4. Main Bento Grid: Left (Program Aktif + Quick Movements) & Right (Donut Chart + Body Metrics) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Section (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Program Aktif Card */}
          <div className="bg-surface-card rounded-3xl border border-borderSubtle p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-6 rounded-full bg-brand-600 inline-block" />
                <h2 className="text-lg font-bold text-slate-900">Program Aktif Hari Ini</h2>
              </div>
              <Link
                href="/programs"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
              >
                Lihat Katalog
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Featured Active Program Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-surface-subtle via-white to-brand-50/50 border border-borderSubtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-brand-100 flex-shrink-0 shadow-sm border border-brand-200">
                  <Image
                    src="/images/exercises/pushup-3d.png"
                    alt="HIIT Cardio Burn & Core"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-700 text-[10px] font-extrabold uppercase tracking-wider">
                      {activeWorkout.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {activeWorkout.durationMinutes} Menit • ~{activeWorkout.caloriesTarget} kkal
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {activeWorkout.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dipandu oleh {user.coachAssigned.name} • 6 Gerakan interval intensif
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push('/workout/active')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Mulai Sesi</span>
              </button>
            </div>

            {/* Overall Workout Progress Track */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-600">Progres Gerakan Selesai</span>
                <span suppressHydrationWarning className="text-brand-600">
                  {progressPercent}% ({completedExercisesCount} dari {activeWorkout.exercises.length} gerakan)
                </span>
              </div>
              <div className="w-full bg-surface-subtle h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Launch Movements List for Today */}
          <div className="bg-surface-card rounded-3xl border border-borderSubtle p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Daftar Gerakan Hari Ini ({activeWorkout.exercises.length})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Klik gerakan untuk langsung masuk ke fokus mode latihan
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-surface-subtle px-3 py-1 rounded-full">
                {activeWorkout.durationMinutes} Menit Total
              </span>
            </div>

            <div className="space-y-2.5">
              {activeWorkout.exercises.map((exercise, index) => (
                <ExerciseListItem
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  isActive={index === activeWorkout.currentExerciseIndex}
                  onSelect={(idx) => {
                    setCurrentExerciseIndex(idx);
                    router.push('/workout/active');
                  }}
                  onToggleComplete={(id) => toggleExercise(id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Donut Macro Chart Card */}
          <DonutMacroChart
            protein={nutritionLog.macros.protein}
            carbs={nutritionLog.macros.carbs}
            fats={nutritionLog.macros.fats}
            consumedCalories={nutritionLog.calories.consumed}
            targetCalories={nutritionLog.calories.target}
          />

          {/* Body Progress & Weight Card */}
          <div className="bg-surface-card rounded-3xl border border-borderSubtle p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-brand-600" />
                <h3 className="text-base font-bold text-slate-900">Progres Tubuh & Berat</h3>
              </div>
              <Link
                href="/progress"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                Riwayat Lengkap
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-surface-subtle border border-borderSubtle">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Berat Saat Ini
                </span>
                <div suppressHydrationWarning className="text-2xl font-black text-slate-900 mt-1">
                  {bodyProgress.currentWeightKg}{' '}
                  <span className="text-xs font-medium text-slate-400">kg</span>
                </div>
                <span suppressHydrationWarning className="text-xs font-bold text-accent-emerald flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {bodyProgress.weeklyChangeKg} kg minggu ini
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-subtle border border-borderSubtle">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Indeks Massa Tubuh (BMI)
                </span>
                <div suppressHydrationWarning className="text-2xl font-black text-slate-900 mt-1">
                  {bodyProgress.bmi}
                </div>
                <span suppressHydrationWarning className="text-xs font-semibold text-brand-600 block mt-1">
                  {bodyProgress.bmiStatus}
                </span>
              </div>
            </div>

            {/* Target Weight tracker */}
            <div className="p-3.5 rounded-2xl bg-brand-50/70 border border-brand-100 flex items-center justify-between">
              <div>
                <span suppressHydrationWarning className="text-xs font-bold text-brand-700 block">
                  Target: {bodyProgress.targetWeightKg} kg
                </span>
                <span suppressHydrationWarning className="text-[11px] text-slate-500">
                  Tersisa {(bodyProgress.currentWeightKg - bodyProgress.targetWeightKg).toFixed(1)} kg lagi menuju target ideal
                </span>
              </div>
              <span className="text-xs font-extrabold px-3 py-1 bg-brand-600 text-white rounded-full">
                Fase 2 / 3
              </span>
            </div>
          </div>

          {/* Hydration Quick Log */}
          <div className="bg-surface-card rounded-3xl border border-borderSubtle p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                <Droplets className="w-5 h-5 fill-blue-500" />
              </div>
              <div>
                <span suppressHydrationWarning className="text-xs font-bold text-slate-900 block">
                  Hidrasi: {nutritionLog.waterIntakeMl} / {nutritionLog.waterTargetMl} ml
                </span>
                <span suppressHydrationWarning className="text-[11px] text-slate-400">
                  {Math.round((nutritionLog.waterIntakeMl / nutritionLog.waterTargetMl) * 100)}% tercapai
                </span>
              </div>
            </div>
            <button
              onClick={() => addWater(250)}
              className="px-3.5 py-1.5 rounded-xl bg-surface-subtle hover:bg-blue-50 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors border border-borderSubtle"
            >
              +250 ml
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
