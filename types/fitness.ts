export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials: string;
  membership: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  coachAssigned: {
    id: string;
    name: string;
    specialty: string;
    status: 'online' | 'offline' | 'busy';
  };
}

export interface Exercise {
  id: string;
  name: string;
  type: string; // e.g. "Pemanasan", "Kardio Inti", "Kekuatan Otot", "Pendinginan"
  target: string; // e.g. "2 Menit • 60 Repetisi"
  repsTarget: number;
  repsCompleted: number;
  durationSeconds: number;
  completed: boolean;
  caloriesEst: number;
  videoThumbUrl?: string;
  tips: string;
}

export interface ActiveWorkout {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  caloriesTarget: number;
  exercisesCount: number;
  currentExerciseIndex: number;
  exercises: Exercise[];
  status: 'idle' | 'in_progress' | 'paused' | 'completed';
}

export interface MacroDetail {
  current: number;
  target: number;
  unit: string;
}

export interface MealItem {
  id: string;
  time: string;
  type: string; // 'Sarapan' | 'Makan Siang' | 'Camilan' | 'Makan Malam'
  name: string;
  calories: number;
  isLogged: boolean;
}

export interface NutritionLog {
  date: string;
  calories: {
    consumed: number;
    target: number;
    unit: string;
  };
  macros: {
    protein: MacroDetail;
    carbs: MacroDetail;
    fats: MacroDetail;
  };
  waterIntakeMl: number;
  waterTargetMl: number;
  meals: MealItem[];
}

export interface BodyProgress {
  currentWeightKg: number;
  targetWeightKg: number;
  weeklyChangeKg: number;
  bmi: number;
  bmiStatus: string;
  history: {
    date: string;
    weight: number;
  }[];
}
