'use client';

import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface CircularWorkoutTimerProps {
  initialSeconds?: number;
  secondsLeft?: number;
  isRunning?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onComplete?: () => void;
  label?: string;
  subLabel?: string;
}

export const CircularWorkoutTimer: React.FC<CircularWorkoutTimerProps> = ({
  initialSeconds = 45,
  secondsLeft: controlledSeconds,
  isRunning: controlledIsRunning,
  onPlay,
  onPause,
  onReset,
  onComplete,
  label = 'Sisa Waktu',
  subLabel,
}) => {
  // If controlled, use parent props; otherwise maintain internal state
  const isControlled = typeof controlledSeconds === 'number';
  const [internalSeconds, setInternalSeconds] = useState(initialSeconds);
  const [internalIsRunning, setInternalIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const seconds = isControlled ? controlledSeconds : internalSeconds;
  const isRunning = isControlled ? !!controlledIsRunning : internalIsRunning;

  useEffect(() => {
    if (isControlled) return;

    let interval: NodeJS.Timeout | null = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setInternalSeconds((prev) => {
          if (prev <= 1) {
            setInternalIsRunning(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds, isControlled, onComplete]);

  // Audio beep effect when time hits 3, 2, 1
  useEffect(() => {
    if (soundEnabled && isRunning && seconds > 0 && seconds <= 3) {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = seconds === 1 ? 880 : 587.33;
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } catch {
        // AudioContext not allowed or not supported in background
      }
    }
  }, [seconds, soundEnabled, isRunning]);

  const radius = 86;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const total = Math.max(1, initialSeconds);
  const ratio = Math.max(0, Math.min(1, seconds / total));
  const strokeDashoffset = circumference - ratio * circumference;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    return `${secs}s`;
  };

  const handleTogglePlay = () => {
    if (isRunning) {
      if (onPause) onPause();
      if (!isControlled) setInternalIsRunning(false);
    } else {
      if (onPlay) onPlay();
      if (!isControlled) {
        if (seconds === 0) setInternalSeconds(initialSeconds);
        setInternalIsRunning(true);
      }
    }
  };

  const handleReset = () => {
    if (onReset) onReset();
    if (!isControlled) {
      setInternalSeconds(initialSeconds);
      setInternalIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-surface-card rounded-3xl border border-borderSubtle shadow-sm relative overflow-hidden">
      {/* Sound toggle at top right */}
      <button
        type="button"
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-brand-600 rounded-full hover:bg-surface-subtle transition-colors"
        title={soundEnabled ? 'Matikan Suara Beep' : 'Nyalakan Suara Beep'}
      >
        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      {/* SVG Circular Dial */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 220 220">
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#5b4df3" />
            </linearGradient>
            <filter id="timerGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#5b4df3" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background Track Circle */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Dynamic Progress Circle */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="url(#timerGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-linear"
            filter="url(#timerGlow)"
          />
        </svg>

        {/* Center Timer Numeric Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
          <span
            suppressHydrationWarning
            className="text-5xl font-black text-slate-900 tracking-tight leading-none font-sans"
          >
            {formatTime(seconds)}
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
            {label}
          </span>
          {subLabel && (
            <span className="text-[11px] font-semibold text-brand-600 mt-0.5">
              {subLabel}
            </span>
          )}
        </div>
      </div>

      {/* Action Control Buttons */}
      <div className="flex items-center gap-4 mt-8">
        {/* Reset Button */}
        <button
          type="button"
          onClick={handleReset}
          className="p-3.5 rounded-2xl text-slate-400 hover:text-slate-700 bg-surface-subtle hover:bg-slate-200/70 border border-borderSubtle transition-all active:scale-95"
          title="Reset Waktu"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm text-white shadow-lg transition-all duration-200 active:scale-95 ${
            isRunning
              ? 'bg-accent-amber hover:bg-amber-600 shadow-amber-500/25'
              : 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/30 hover:scale-105'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              <span>Jeda Latihan</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white ml-0.5" />
              <span>{seconds === 0 ? 'Mulai Ulang' : 'Mulai Latihan'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
