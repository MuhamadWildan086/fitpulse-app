import { create } from 'zustand';
import { UserProfile, ActiveWorkout, NutritionLog, BodyProgress, Exercise, MealItem } from '@/types/fitness';

interface FitnessState {
  user: UserProfile;
  activeWorkout: ActiveWorkout;
  nutritionLog: NutritionLog;
  bodyProgress: BodyProgress;
  
  // Timer state
  timerSecondsLeft: number;
  isTimerRunning: boolean;
  totalWorkoutElapsedSeconds: number;
  heartRateBpm: number;
  caloriesBurnedRealtime: number;

  // Sidebar state
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Actions
  toggleExercise: (exerciseId: string) => void;
  setCurrentExerciseIndex: (index: number) => void;
  nextExercise: () => void;
  prevExercise: () => void;
  updateCurrentExerciseReps: (delta: number) => void;
  
  // Workout timer actions
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: (newDuration?: number) => void;
  tickTimer: () => void;
  completeWorkout: () => void;
  restartWorkout: () => void;

  // Nutrition actions
  toggleMealLogged: (mealId: string) => void;
  addMeal: (meal: Omit<MealItem, 'id'>) => void;
  addWater: (amountMl: number) => void;

  // Body progress actions
  updateWeight: (newWeight: number) => void;
}

const initialExercises: Exercise[] = [
  {
    id: 'ex_01',
    name: 'Jumping Jacks',
    type: 'Pemanasan',
    target: '2 Menit • 60 Repetisi',
    repsTarget: 60,
    repsCompleted: 60,
    durationSeconds: 120,
    completed: true,
    caloriesEst: 45,
    videoThumbUrl: '/images/exercises/stretching-poses.png',
    tips: 'Mendaratlah dengan ujung jari kaki secara lembut dan jaga ritme pernapasan konstan.',
  },
  {
    id: 'ex_02',
    name: 'Push Up Standar & Hold',
    type: 'Kekuatan Dada & Inti',
    target: '3 Set x 12 Repetisi',
    repsTarget: 12,
    repsCompleted: 8,
    durationSeconds: 45,
    completed: false,
    caloriesEst: 65,
    videoThumbUrl: '/images/exercises/pushup-3d.png',
    tips: 'Jaga tulang belakang lurus, kunci perut (core), dan siku membentuk sudut 45 derajat dari tubuh.',
  },
  {
    id: 'ex_03',
    name: 'High Knees Interval',
    type: 'Kardio Inti',
    target: '4 Set x 45 Detik',
    repsTarget: 50,
    repsCompleted: 0,
    durationSeconds: 45,
    completed: false,
    caloriesEst: 75,
    videoThumbUrl: '/images/exercises/stretching-poses.png',
    tips: 'Angkat lutut setinggi pinggul secara eksplosif, dorong tenaga dari telapak kaki.',
  },
  {
    id: 'ex_04',
    name: 'Bodyweight Squats',
    type: 'Tubuh Bagian Bawah',
    target: '4 Set x 15 Repetisi',
    repsTarget: 15,
    repsCompleted: 0,
    durationSeconds: 50,
    completed: false,
    caloriesEst: 70,
    videoThumbUrl: '/images/exercises/squat-3d.png',
    tips: 'Dorong pinggul ke belakang seolah hendak duduk di kursi, pastikan lutut searah jemari kaki.',
  },
  {
    id: 'ex_05',
    name: 'Mountain Climbers',
    type: 'Kardio & Inti',
    target: '3 Set x 40 Detik',
    repsTarget: 40,
    repsCompleted: 0,
    durationSeconds: 40,
    completed: false,
    caloriesEst: 80,
    videoThumbUrl: '/images/exercises/pushup-3d.png',
    tips: 'Pertahankan posisi plank sempurna tanpa mengangkat pinggul terlalu tinggi.',
  },
  {
    id: 'ex_06',
    name: 'Bicycle Crunches & Pendinginan',
    type: 'Inti & Relaksasi',
    target: '3 Set x 20 Repetisi',
    repsTarget: 20,
    repsCompleted: 0,
    durationSeconds: 60,
    completed: false,
    caloriesEst: 50,
    videoThumbUrl: '/images/exercises/stretching-poses.png',
    tips: 'Fokus pada rotasi bahu menuju lutut berlawanan, bukan sekadar menarik leher.',
  },
];

export const useFitnessStore = create<FitnessState>((set, get) => ({
  user: {
    id: 'usr_andi_01',
    name: 'Andi Pratama',
    email: 'andi.pratama@fitpulse.id',
    avatarUrl: '/images/coaches/andi-avatar.png',
    initials: 'AP',
    membership: 'Member Premium',
    level: 14,
    xp: 1650,
    nextLevelXp: 2000,
    streakDays: 7,
    coachAssigned: {
      id: 'cch_maya_01',
      name: 'Coach Maya',
      specialty: 'Functional HIIT & Mobilitas',
      status: 'online',
    },
  },

  activeWorkout: {
    id: 'wk_hiit_01',
    title: 'HIIT Cardio Burn & Core',
    category: 'Intensitas Tinggi',
    durationMinutes: 40,
    caloriesTarget: 420,
    exercisesCount: 6,
    currentExerciseIndex: 1, // Currently on Push Up (index 1)
    exercises: initialExercises,
    status: 'in_progress',
  },

  nutritionLog: {
    date: '2024-05-12',
    calories: {
      consumed: 1780,
      target: 2100,
      unit: 'kkal',
    },
    macros: {
      protein: { current: 145, target: 145, unit: 'g' },
      carbs: { current: 164, target: 210, unit: 'g' },
      fats: { current: 52, target: 65, unit: 'g' },
    },
    waterIntakeMl: 2200,
    waterTargetMl: 3000,
    meals: [
      {
        id: 'meal_01',
        time: '07:30',
        type: 'Sarapan',
        name: 'Oatmeal Pisang & Chia Seeds',
        calories: 420,
        isLogged: true,
      },
      {
        id: 'meal_02',
        time: '12:30',
        type: 'Makan Siang',
        name: 'Dada Ayam Panggang Herb & Quinoa',
        calories: 580,
        isLogged: true,
      },
      {
        id: 'meal_03',
        time: '16:00',
        type: 'Camilan',
        name: 'Greek Yogurt & Roasted Almonds',
        calories: 260,
        isLogged: true,
      },
      {
        id: 'meal_04',
        time: '19:30',
        type: 'Makan Malam',
        name: 'Fillet Salmon Panggang & Brokoli Kukus',
        calories: 520,
        isLogged: false,
      },
    ],
  },

  bodyProgress: {
    currentWeightKg: 72.0,
    targetWeightKg: 68.0,
    weeklyChangeKg: -0.5,
    bmi: 22.4,
    bmiStatus: 'Normal & Proporsional',
    history: [
      { date: '2024-04-20', weight: 73.8 },
      { date: '2024-04-27', weight: 73.2 },
      { date: '2024-05-04', weight: 72.5 },
      { date: '2024-05-11', weight: 72.0 },
    ],
  },

  // Realtime active workout stats
  timerSecondsLeft: 45,
  isTimerRunning: false,
  totalWorkoutElapsedSeconds: 1720, // ~28m 40s
  heartRateBpm: 142,
  caloriesBurnedRealtime: 185,

  // Sidebar state
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  // Actions
  toggleExercise: (exerciseId: string) => {
    set((state) => {
      const updatedExercises = state.activeWorkout.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
      );
      return {
        activeWorkout: {
          ...state.activeWorkout,
          exercises: updatedExercises,
        },
      };
    });
  },

  setCurrentExerciseIndex: (index: number) => {
    const { activeWorkout } = get();
    if (index >= 0 && index < activeWorkout.exercises.length) {
      const targetEx = activeWorkout.exercises[index];
      set({
        activeWorkout: {
          ...activeWorkout,
          currentExerciseIndex: index,
        },
        timerSecondsLeft: targetEx.durationSeconds || 45,
        isTimerRunning: false,
      });
    }
  },

  nextExercise: () => {
    const { activeWorkout } = get();
    const nextIdx = activeWorkout.currentExerciseIndex + 1;
    if (nextIdx < activeWorkout.exercises.length) {
      // Mark current as completed when moving forward
      const updated = [...activeWorkout.exercises];
      updated[activeWorkout.currentExerciseIndex] = {
        ...updated[activeWorkout.currentExerciseIndex],
        completed: true,
      };
      set({
        activeWorkout: {
          ...activeWorkout,
          currentExerciseIndex: nextIdx,
          exercises: updated,
        },
        timerSecondsLeft: updated[nextIdx].durationSeconds || 45,
        isTimerRunning: false,
        caloriesBurnedRealtime: get().caloriesBurnedRealtime + 40,
      });
    } else {
      get().completeWorkout();
    }
  },

  prevExercise: () => {
    const { activeWorkout } = get();
    const prevIdx = activeWorkout.currentExerciseIndex - 1;
    if (prevIdx >= 0) {
      set({
        activeWorkout: {
          ...activeWorkout,
          currentExerciseIndex: prevIdx,
        },
        timerSecondsLeft: activeWorkout.exercises[prevIdx].durationSeconds || 45,
        isTimerRunning: false,
      });
    }
  },

  updateCurrentExerciseReps: (delta: number) => {
    set((state) => {
      const currentIdx = state.activeWorkout.currentExerciseIndex;
      const currentEx = state.activeWorkout.exercises[currentIdx];
      if (!currentEx) return state;

      const newReps = Math.max(0, currentEx.repsCompleted + delta);
      const isCompleted = newReps >= currentEx.repsTarget;

      const newExercises = [...state.activeWorkout.exercises];
      newExercises[currentIdx] = {
        ...currentEx,
        repsCompleted: newReps,
        completed: isCompleted ? true : currentEx.completed,
      };

      return {
        activeWorkout: {
          ...state.activeWorkout,
          exercises: newExercises,
        },
        caloriesBurnedRealtime: delta > 0 ? state.caloriesBurnedRealtime + 3 : state.caloriesBurnedRealtime,
      };
    });
  },

  startTimer: () => set({ isTimerRunning: true }),
  pauseTimer: () => set({ isTimerRunning: false }),
  
  resetTimer: (newDuration?: number) => {
    const currentEx = get().activeWorkout.exercises[get().activeWorkout.currentExerciseIndex];
    set({
      timerSecondsLeft: newDuration ?? (currentEx?.durationSeconds || 45),
      isTimerRunning: false,
    });
  },

  tickTimer: () => {
    const { timerSecondsLeft, isTimerRunning } = get();
    if (isTimerRunning && timerSecondsLeft > 0) {
      set({
        timerSecondsLeft: timerSecondsLeft - 1,
        totalWorkoutElapsedSeconds: get().totalWorkoutElapsedSeconds + 1,
      });
    } else if (timerSecondsLeft === 0 && isTimerRunning) {
      set({ isTimerRunning: false });
    }
  },

  completeWorkout: () => {
    set((state) => {
      const allCompleted = state.activeWorkout.exercises.map((e) => ({ ...e, completed: true }));
      return {
        activeWorkout: {
          ...state.activeWorkout,
          status: 'completed',
          exercises: allCompleted,
        },
        user: {
          ...state.user,
          xp: state.user.xp + 150,
        },
        isTimerRunning: false,
      };
    });
  },

  restartWorkout: () => {
    set((state) => ({
      activeWorkout: {
        ...state.activeWorkout,
        currentExerciseIndex: 0,
        status: 'in_progress',
        exercises: initialExercises.map((e) => ({ ...e, completed: false, repsCompleted: 0 })),
      },
      timerSecondsLeft: 45,
      isTimerRunning: false,
      caloriesBurnedRealtime: 0,
      totalWorkoutElapsedSeconds: 0,
    }));
  },

  toggleMealLogged: (mealId: string) => {
    set((state) => {
      const targetMeal = state.nutritionLog.meals.find((m) => m.id === mealId);
      if (!targetMeal) return state;

      const willBeLogged = !targetMeal.isLogged;
      const calorieDelta = willBeLogged ? targetMeal.calories : -targetMeal.calories;

      const updatedMeals = state.nutritionLog.meals.map((m) =>
        m.id === mealId ? { ...m, isLogged: willBeLogged } : m
      );

      return {
        nutritionLog: {
          ...state.nutritionLog,
          calories: {
            ...state.nutritionLog.calories,
            consumed: Math.max(0, state.nutritionLog.calories.consumed + calorieDelta),
          },
          meals: updatedMeals,
        },
      };
    });
  },

  addMeal: (meal) => {
    set((state) => {
      const newMeal: MealItem = {
        ...meal,
        id: `meal_${Date.now()}`,
      };
      return {
        nutritionLog: {
          ...state.nutritionLog,
          calories: {
            ...state.nutritionLog.calories,
            consumed: state.nutritionLog.calories.consumed + meal.calories,
          },
          meals: [...state.nutritionLog.meals, newMeal],
        },
      };
    });
  },

  addWater: (amountMl: number) => {
    set((state) => ({
      nutritionLog: {
        ...state.nutritionLog,
        waterIntakeMl: Math.min(5000, state.nutritionLog.waterIntakeMl + amountMl),
      },
    }));
  },

  updateWeight: (newWeight: number) => {
    set((state) => ({
      bodyProgress: {
        ...state.bodyProgress,
        currentWeightKg: newWeight,
        weeklyChangeKg: Number((newWeight - 72.5).toFixed(1)),
        bmi: Number((newWeight / (1.79 * 1.79)).toFixed(1)),
      },
    }));
  },
}));
