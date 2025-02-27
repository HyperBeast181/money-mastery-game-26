
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
  status: 'not-started' | 'in-progress' | 'completed' | 'locked';
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
