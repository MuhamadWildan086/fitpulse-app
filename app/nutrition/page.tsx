'use client';

import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Plus,
  CheckCircle2,
  Droplets,
  Clock,
} from 'lucide-react';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { DonutMacroChart } from '@/components/nutrition/DonutMacroChart';
import { formatTime } from '@/lib/format';

export default function NutritionPage() {
  const { nutritionLog, toggleMealLogged, addMeal, addWater } = useFitnessStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMealName, setNewMealName] = useState('');
  const [newMealCalories, setNewMealCalories] = useState('');
  const [newMealType, setNewMealType] = useState('Makan Siang');

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMealName || !newMealCalories) return;

    addMeal({
      time: formatTime(),
      type: newMealType,
      name: newMealName,
      calories: parseInt(newMealCalories, 10),
      isLogged: true,
    });
    setNewMealName('');
    setNewMealCalories('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold border border-brand-100">
              Smart Nutrition Tracker
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Sinkronisasi Apple Health Aktif
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pelacak Nutrisi & Makanan Harian
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Pantau asupan kalori, distribusi protein, karbohidrat, dan hidrasi harianmu.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Catat Makanan Baru</span>
        </button>
      </div>

      {/* Main Grid: Donut Chart & Detailed Macro breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 Cols) - Donut Chart & Hydration */}
        <div className="lg:col-span-5 space-y-6">
          <DonutMacroChart
            protein={nutritionLog.macros.protein}
            carbs={nutritionLog.macros.carbs}
            fats={nutritionLog.macros.fats}
            consumedCalories={nutritionLog.calories.consumed}
            targetCalories={nutritionLog.calories.target}
          />

          {/* Hydration Widget */}
          <div className="bg-surface-card rounded-3xl p-6 border border-borderSubtle shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Droplets className="w-5 h-5 fill-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Hidrasi & Asupan Air</h3>
                  <p className="text-[11px] text-slate-400">Target harian 3.000 ml</p>
                </div>
              </div>
              <span suppressHydrationWarning className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                {Math.round((nutritionLog.waterIntakeMl / nutritionLog.waterTargetMl) * 100)}%
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-subtle border border-borderSubtle flex items-center justify-between">
              <div>
                <span suppressHydrationWarning className="text-2xl font-black text-slate-900">
                  {nutritionLog.waterIntakeMl}
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1">/ 3.000 ml</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addWater(250)}
                  className="px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-slate-700 hover:text-blue-600 border border-borderSubtle shadow-sm transition-colors"
                >
                  +250 ml
                </button>
                <button
                  type="button"
                  onClick={() => addWater(500)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
                >
                  +500 ml
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols) - Meal Log Items */}
        <div className="lg:col-span-7 bg-surface-card rounded-3xl p-6 border border-borderSubtle shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Log Makanan Hari Ini</h3>
              <p className="text-xs text-slate-400">
                Klik ikon centang untuk menandai makanan yang sudah dikonsumsi
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-surface-subtle px-3 py-1 rounded-full">
              {nutritionLog.meals.length} Waktu Makan
            </span>
          </div>

          <div className="space-y-3">
            {nutritionLog.meals.map((meal) => (
              <div
                key={meal.id}
                className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                  meal.isLogged
                    ? 'bg-surface-subtle/70 border-borderSubtle'
                    : 'bg-white border-borderSubtle hover:border-brand-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs ${
                      meal.isLogged
                        ? 'bg-emerald-100 text-accent-emerald'
                        : 'bg-surface-subtle text-slate-500'
                    }`}
                  >
                    <UtensilsCrossed className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">
                        {meal.type}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {meal.time}
                      </span>
                    </div>
                    <h4
                      className={`text-sm font-bold mt-1 truncate ${
                        meal.isLogged ? 'text-slate-800' : 'text-slate-900'
                      }`}
                    >
                      {meal.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-extrabold text-slate-900">
                    {meal.calories} kkal
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleMealLogged(meal.id)}
                    className={`p-2 rounded-xl transition-all ${
                      meal.isLogged
                        ? 'text-accent-emerald bg-emerald-50 hover:bg-emerald-100'
                        : 'text-slate-400 hover:text-brand-600 bg-surface-subtle hover:bg-brand-50'
                    }`}
                    title={meal.isLogged ? 'Batalkan Status Log' : 'Tandai Sudah Dimakan'}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 ${meal.isLogged ? 'fill-emerald-500 text-white' : ''}`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Add Meal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <form
            onSubmit={handleAddMeal}
            className="bg-white rounded-3xl p-6 max-w-md w-full border border-borderSubtle shadow-xl space-y-4"
          >
            <h3 className="text-lg font-bold text-slate-900">Catat Menu Makanan</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Waktu / Tipe Makan
                </label>
                <select
                  value={newMealType}
                  onChange={(e) => setNewMealType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-borderSubtle bg-surface-subtle text-xs font-semibold focus:outline-none focus:border-brand-500"
                >
                  <option value="Sarapan">Sarapan</option>
                  <option value="Makan Siang">Makan Siang</option>
                  <option value="Camilan">Camilan</option>
                  <option value="Makan Malam">Makan Malam</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Nama Menu Makanan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dada Ayam Rebus + Nasi Merah"
                  value={newMealName}
                  onChange={(e) => setNewMealName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-borderSubtle bg-surface-subtle text-xs font-semibold focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Estimasi Kalori (kkal)
                </label>
                <input
                  type="number"
                  required
                  placeholder="Contoh: 450"
                  value={newMealCalories}
                  onChange={(e) => setNewMealCalories(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-borderSubtle bg-surface-subtle text-xs font-semibold focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-full bg-surface-subtle text-slate-600 font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-full bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition-colors shadow-md shadow-brand-500/20"
              >
                Simpan Menu
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
