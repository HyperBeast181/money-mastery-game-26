
import { Module, Category, User, LeaderboardUser, TriviaEvent, Badge } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Bilbo',
  avatar: '/lovable-uploads/37933159-2c9d-4a32-8c8b-d731a46b6ccf.png',
  coins: 404,
  xp: 14250,
  streak: 0,
  hearts: 5,
  joinedDate: 'Jan 14, 2025',
  completedModules: 3,
  totalEarned: 404,
  badges: []
};

export const modules: Module[] = [
  {
    id: '1',
    title: 'Save Money',
    icon: 'dollar-sign',
    category: 'Popular',
    coins: 700,
    progress: 20,
    totalParts: 15,
    currentPart: 3,
    timeEstimate: 5,
    status: 'in-progress'
  },
  {
    id: '2',
    title: 'Shop Smartly',
    icon: 'credit-card',
    category: 'Popular',
    coins: 1000,
    progress: 0,
    totalParts: 22,
    currentPart: 0,
    timeEstimate: 5,
    status: 'not-started'
  },
  {
    id: '3',
    title: 'Get Insured',
    icon: 'shield',
    category: 'Popular',
    coins: 900,
    progress: 0,
    totalParts: 18,
    currentPart: 0,
    timeEstimate: 5,
    status: 'not-started'
  },
  {
    id: '4',
    title: 'Get Health Insurance',
    icon: 'heart',
    category: 'Popular',
    coins: 1000,
    progress: 0,
    totalParts: 20,
    currentPart: 0,
    timeEstimate: 5,
    status: 'not-started'
  },
  {
    id: '5',
    title: 'Apply for Credit',
    icon: 'credit-card',
    category: 'Popular',
    coins: 1000,
    progress: 0,
    totalParts: 22,
    currentPart: 0,
    timeEstimate: 5,
    participants: 165900,
    status: 'not-started'
  },
  {
    id: '6',
    title: 'Start Investing',
    icon: 'trending-up',
    category: 'Popular',
    coins: 900,
    progress: 0,
    totalParts: 18,
    currentPart: 0,
    timeEstimate: 5,
    participants: 84000,
    status: 'not-started'
  },
  {
    id: '7',
    title: 'Pay For College',
    icon: 'graduation-cap',
    category: 'Popular',
    coins: 800,
    progress: 0,
    totalParts: 18,
    currentPart: 0,
    timeEstimate: 5,
    participants: 110800,
    status: 'completed'
  },
  {
    id: '8',
    title: 'Spot Fraud Before It Happens',
    icon: 'search',
    category: 'Popular',
    coins: 900,
    progress: 0,
    totalParts: 16,
    currentPart: 0,
    timeEstimate: 5,
    status: 'not-started'
  },
  {
    id: '9',
    title: 'Choose a Financial Institution',
    icon: 'building',
    category: 'Savings and Spending',
    coins: 600,
    progress: 0,
    totalParts: 11,
    currentPart: 0,
    timeEstimate: 5,
    participants: 167900,
    status: 'not-started'
  },
  {
    id: '10',
    title: 'Live on a Budget',
    icon: 'piggy-bank',
    category: 'Savings and Spending',
    coins: 500,
    progress: 0,
    totalParts: 16,
    currentPart: 0,
    timeEstimate: 5,
    participants: 35800,
    status: 'not-started'
  },
  {
    id: '11',
    title: 'How to Do Your Taxes',
    icon: 'file-text',
    category: 'Tax',
    coins: 90,
    progress: 0,
    totalParts: 1,
    currentPart: 0,
    timeEstimate: 2,
    participants: 2000,
    status: 'not-started'
  },
  {
    id: '12',
    title: 'Marginal Tax Rates',
    icon: 'file-text',
    category: 'Tax',
    coins: 90,
    progress: 0,
    totalParts: 1,
    currentPart: 0,
    timeEstimate: 2,
    participants: 1700,
    status: 'not-started'
  },
  {
    id: '13',
    title: 'Tax-Efficient Investments',
    icon: 'file-text',
    category: 'Tax',
    coins: 100,
    progress: 0,
    totalParts: 1,
    currentPart: 0,
    timeEstimate: 2,
    participants: 1800,
    status: 'not-started'
  }
];

export const categories: Category[] = [
  {
    id: '1',
    title: 'Popular',
    icon: 'trending-up',
    totalSkills: 16,
    totalModules: 233
  },
  {
    id: '2',
    title: 'Financial Basics',
    icon: 'sun',
    totalSkills: 10,
    totalModules: 120
  },
  {
    id: '3',
    title: 'Major Milestones',
    icon: 'flag',
    totalSkills: 8,
    totalModules: 95
  },
  {
    id: '4',
    title: 'Investing',
    icon: 'clock',
    totalSkills: 14,
    totalModules: 185
  },
  {
    id: '5',
    title: 'Career',
    icon: 'briefcase',
    totalSkills: 12,
    totalModules: 145
  },
  {
    id: '6',
    title: 'College',
    icon: 'at-sign',
    totalSkills: 9,
    totalModules: 110
  },
  {
    id: '7',
    title: 'Risk Management',
    icon: 'clock',
    totalSkills: 11,
    totalModules: 130
  },
  {
    id: '8',
    title: 'Entrepreneurship',
    icon: 'zap',
    totalSkills: 13,
    totalModules: 160
  }
];

export const leaderboardUsers: LeaderboardUser[] = [
  {
    id: '1',
    name: 'Dana J',
    avatar: '/lovable-uploads/952baaf1-3300-479d-bc39-0620cd3245c4.png',
    coins: 4600,
    position: 1
  },
  {
    id: '2',
    name: 'Amanda D',
    avatar: '/lovable-uploads/370b4395-13f8-44ab-af20-7d4025c1a871.png',
    coins: 2600,
    position: 2
  },
  {
    id: '3',
    name: 'Madison M',
    avatar: '/lovable-uploads/4ab33fd4-b662-40e2-849e-b8972ae3bb31.png',
    coins: 2600,
    position: 3
  },
  {
    id: '4',
    name: 'Zeroxyyy P',
    avatar: '/lovable-uploads/ea0fa254-09b7-46aa-a906-16282dc66579.png',
    coins: 2600,
    position: 4
  },
  {
    id: '5',
    name: 'Kendra K',
    avatar: '/lovable-uploads/4337a96e-fcbc-405b-b65a-c19f7eb95f9b.png',
    coins: 2600,
    position: 5
  }
];

export const triviaEvents: TriviaEvent[] = [
  {
    id: '1',
    title: 'Trivia Party',
    description: 'Join the daily financial trivia party and win prizes up to',
    date: 'Feb 27, 2025',
    prize: 5000,
    participants: 645,
    icon: '/lovable-uploads/0c7467f7-361d-4300-9676-24e68102a1f0.png'
  }
];
