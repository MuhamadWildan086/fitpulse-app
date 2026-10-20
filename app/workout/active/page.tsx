'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Flame,
  SkipBack,
  SkipForward,
  Flag,
  Lightbulb,
  Plus,
  Minus,
  Sparkles,
  Check,
} from 'lucide-react';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { CircularWorkoutTimer } from '@/components/workout/CircularWorkoutTimer';
import { ExerciseListItem } from '@/components/workout/ExerciseListItem';

export default function ActiveWorkoutPage() {
  const router = useRouter();
  const {
    activeWorkout,
    timerSecondsLeft,
    isTimerRunning,
    totalWorkoutElapsedSeconds,
    heartRateBpm,
    caloriesBurnedRealtime,
    startTimer,
    pauseTimer,
    resetTimer,
    tickTimer,
    nextExercise,
    prevExercise,
    setCurrentExerciseIndex,
    toggleExercise,
    updateCurrentExerciseReps,
    completeWorkout,
  } = useFitnessStore();

  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // Timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, tickTimer]);

  const currentIndex = activeWorkout.currentExerciseIndex;
  const currentExercise = activeWorkout.exercises[currentIndex] || activeWorkout.exercises[0];
  const nextExerciseItem = activeWorkout.exercises[currentIndex + 1];

  const completedCount = activeWorkout.exercises.filter((e) => e.completed).length;
  const totalCount = activeWorkout.exercises.length;
  const sessionProgress = Math.round((completedCount / totalCount) * 100);

  const formatDuration = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinishWorkout = () => {
    completeWorkout();
    setShowCompleteModal(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Live Workout Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <Link href="/programs" className="hover:text-brand-600 transition-colors">
              Program Latihan
            </Link>
            <span>/</span>
            <span className="text-slate-600">{activeWorkout.title}</span>
            <span>/</span>
            <span className="text-brand-600 font-bold">
              Gerakan {currentIndex + 1} dari {totalCount}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeWorkout.title}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-accent-rose text-xs font-bold border border-rose-100">
              <span className="w-2 h-2 rounded-full bg-accent-rose animate-ping" />
              LIVE WORKOUT
            </span>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleFinishWorkout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-card hover:bg-rose-50 text-accent-rose border border-rose-200 font-bold text-xs shadow-sm hover:border-rose-300 transition-all active:scale-95"
          >
            <Flag className="w-4 h-4" />
            <span>Selesai Workout</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Focus Player (7 cols) & Right Biometrics + Queue (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Focus Player (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Focus Execution Card */}
          <div className="bg-surface-card rounded-3xl p-6 lg:p-8 border border-borderSubtle shadow-sm relative overflow-hidden space-y-6">
            {/* Header info */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-600 text-[11px] font-extrabold uppercase tracking-wider">
                    Latihan {currentIndex + 1} / {totalCount}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-accent-amber" />
                    ~{currentExercise.caloriesEst} kkal
                  </span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">
                  {currentExercise.name}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Target: <strong className="text-slate-800">{currentExercise.target}</strong> • Fokus: {currentExercise.type}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleExercise(currentExercise.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currentExercise.completed
                    ? 'bg-emerald-50 text-accent-emerald border border-emerald-200'
                    : 'bg-surface-subtle text-slate-600 hover:bg-brand-50 hover:text-brand-600'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{currentExercise.completed ? 'Selesai' : 'Tandai Selesai'}</span>
              </button>
            </div>

            {/* 3D Exercise Demonstration Scene */}
            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-surface-subtle border border-borderSubtle flex items-center justify-center group shadow-inner">
              <Image
                src={
                  currentExercise.videoThumbUrl ||
                  (currentExercise.name.toLowerCase().includes('squat')
                    ? '/images/exercises/squat-3d.png'
                    : '/images/exercises/pushup-3d.png')
                }
                alt={currentExercise.name}
                width={640}
                height={280}
                priority
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

              {/* Angle & Alignment Tag */}
              <div className="absolute bottom-3.5 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-[11px] font-bold flex items-center gap-2 border border-white/10 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                <span>Panduan Postur 3D: Biomekanika Optimal</span>
              </div>
            </div>

            {/* Circular Workout Timer in Focus */}
            <CircularWorkoutTimer
              initialSeconds={currentExercise.durationSeconds || 45}
              secondsLeft={timerSecondsLeft}
              isRunning={isTimerRunning}
              onPlay={startTimer}
              onPause={pauseTimer}
              onReset={() => resetTimer(currentExercise.durationSeconds || 45)}
              onComplete={() => {
                pauseTimer();
                nextExercise();
              }}
              label="Sisa Waktu Gerakan"
              subLabel={currentExercise.name}
            />

            {/* Rep Adjuster Box */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-surface-subtle/80 border border-borderSubtle">
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Progres Repetisi
                </span>
                <div className="flex items-baseline gap-2 mt-0.5 justify-center sm:justify-start">
                  <span suppressHydrationWarning className="text-3xl font-black text-slate-900">
                    {currentExercise.repsCompleted}
                  </span>
                  <span suppressHydrationWarning className="text-sm font-semibold text-slate-500">
                    / {currentExercise.repsTarget} Reps
                  </span>
                </div>
              </div>

              {/* + / - Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateCurrentExerciseReps(-1)}
                  className="w-10 h-10 rounded-xl bg-white border border-borderSubtle text-slate-700 hover:text-brand-600 hover:border-brand-300 flex items-center justify-center font-bold shadow-sm active:scale-95 transition-all"
                  title="Kurangi 1 Rep"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-600 px-1">Atur Reps</span>
                <button
                  type="button"
                  onClick={() => updateCurrentExerciseReps(1)}
                  className="w-10 h-10 rounded-xl bg-white border border-borderSubtle text-slate-700 hover:text-brand-600 hover:border-brand-300 flex items-center justify-center font-bold shadow-sm active:scale-95 transition-all"
                  title="Tambah 1 Rep"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Previous & Next Exercise Navigator */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={prevExercise}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold border border-borderSubtle transition-all active:scale-95 ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-surface-subtle text-slate-400'
                    : 'bg-surface-card hover:bg-surface-subtle text-slate-700'
                }`}
              >
                <SkipBack className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                type="button"
                onClick={nextExercise}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>{currentIndex === totalCount - 1 ? 'Selesai Latihan' : 'Latihan Berikutnya'}</span>
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Coach Tips Banner */}
          <div className="bg-surface-card rounded-2xl p-5 border border-borderSubtle shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-accent-amber border border-amber-100 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 fill-accent-amber text-amber-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Panduan Form & Postur Coach Maya
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {currentExercise.tips}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Biometrics & Next Queue (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Real-time Biometrics Card */}
          <div className="bg-surface-card rounded-3xl p-6 border border-borderSubtle shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent-rose fill-rose-500 animate-pulse" />
                <h3 className="text-base font-bold text-slate-900">Metrik Sesi Real-Time</h3>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-accent-emerald border border-emerald-100">
                Tersinkronisasi
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* Heart Rate */}
              <div className="p-3.5 rounded-2xl bg-surface-subtle border border-borderSubtle flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Detak Jantung
                </span>
                <div className="my-1.5">
                  <span suppressHydrationWarning className="text-2xl font-black text-slate-900">
                    {heartRateBpm}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 ml-1">BPM</span>
                </div>
                <span className="text-[10px] font-bold text-accent-rose bg-rose-50 px-1.5 py-0.5 rounded-md inline-block w-fit">
                  Zona Kardio
                </span>
              </div>

              {/* Calories */}
              <div className="p-3.5 rounded-2xl bg-surface-subtle border border-borderSubtle flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Kalori
                </span>
                <div className="my-1.5">
                  <span suppressHydrationWarning className="text-2xl font-black text-slate-900">
                    {caloriesBurnedRealtime}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 ml-1">kkal</span>
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md inline-block w-fit">
                  Optimal
                </span>
              </div>

              {/* Elapsed Time */}
              <div className="p-3.5 rounded-2xl bg-surface-subtle border border-borderSubtle flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Total Waktu
                </span>
                <div className="my-1.5">
                  <span suppressHydrationWarning className="text-2xl font-black text-slate-900">
                    {formatDuration(totalWorkoutElapsedSeconds)}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">
                  / {activeWorkout.durationMinutes}:00 mnt
                </span>
              </div>
            </div>

            {/* Session Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-600">Total Progres Sesi</span>
                <span suppressHydrationWarning className="text-brand-600">
                  {sessionProgress}% ({completedCount} dari {totalCount} selesai)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-subtle overflow-hidden">
                <div
                  className="h-full bg-brand-600 rounded-full transition-all duration-500"
                  style={{ width: `${sessionProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Next Exercise Preview Queue */}
          {nextExerciseItem && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-brand-50 to-surface-subtle border border-brand-100 shadow-sm space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-500" />
                GERAKAN BERIKUTNYA
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {nextExerciseItem.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {nextExerciseItem.target} • {nextExerciseItem.type}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentExerciseIndex(currentIndex + 1)}
                  className="px-3.5 py-1.5 rounded-xl bg-white text-brand-600 font-bold text-xs border border-brand-200 hover:bg-brand-50 transition-colors shadow-sm"
                >
                  Loncat ke Sini
                </button>
              </div>
            </div>
          )}

          {/* Exercise Queue Playlist */}
          <div className="bg-surface-card rounded-3xl p-6 border border-borderSubtle shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Antrean Gerakan Sesi</h3>
                <p className="text-xs text-slate-400">Pilih gerakan untuk berpindah</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-subtle text-slate-600">
                {totalCount} Gerakan
              </span>
            </div>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {activeWorkout.exercises.map((exercise, index) => (
                <ExerciseListItem
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  compact
                  isActive={index === currentIndex}
                  onSelect={(idx) => setCurrentExerciseIndex(idx)}
                  onToggleComplete={(id) => toggleExercise(id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-borderSubtle shadow-2xl text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <Image
                src="/images/badges/trophy-gold.png"
                alt="3D Gold Trophy"
                width={80}
                height={80}
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>

            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Workout Berhasil Selesai!
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Luar Biasa, Andi! 🎉
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Kamu telah menyelesaikan <strong>{activeWorkout.title}</strong> dan membakar ~
                <strong>{caloriesBurnedRealtime || activeWorkout.caloriesTarget} kkal</strong>!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-surface-subtle border border-borderSubtle text-left">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">XP Diperoleh</span>
                <p className="text-lg font-black text-brand-600">+150 XP</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Streak Baru</span>
                <p className="text-lg font-black text-accent-amber">7 Hari 🔥</p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="w-full py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all"
              >
                Kembali ke Beranda
              </button>
              <button
                type="button"
                onClick={() => router.push('/nutrition')}
                className="w-full py-2.5 rounded-full bg-surface-subtle hover:bg-slate-200/80 text-slate-700 font-semibold text-xs transition-colors"
              >
                Catat Makanan Pemulihan (Nutrisi)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
