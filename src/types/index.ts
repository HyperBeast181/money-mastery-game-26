
export interface User {
  id: string;
  name: string;
  avatar: string;
  coins: number;
  xp: number;
  streak: number;
  hearts: number;
  joinedDate: string;
  completedModules: number;
  totalEarned: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export type ModuleStatus = 'не начат' | 'в процессе' | 'завершено' | 'заблокировано';

export interface Module {
  id: string;
  title: string;
  icon: string;
  category: string;
  coins: number;
  progress: number;
  totalParts: number;
  currentPart: number;
  timeEstimate: number;
  participants?: number;
  status: ModuleStatus;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  order: number;
  completed: boolean;
  quiz?: Quiz;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation: string;
}

export interface Option {
  id: string;
  text: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  totalSkills: number;
  totalModules: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  coins: number;
  position: number;
}

export interface TriviaEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  prize: number;
  participants: number;
  icon: string;
}

export interface Reward {
  id: string;
  title: string;
  name: string;
  description: string;
  cost: number;
  image: string;
  type: 'подписка' | 'премиум-контент' | 'другое';
  redeemed?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'достижение' | 'награда' | 'обновление' | 'другое';
  read: boolean;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
