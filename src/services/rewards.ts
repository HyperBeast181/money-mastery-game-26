
import { Reward } from '../types/rewards';
import { Crown, Unlock, Award, Zap, Users, ShieldCheck, BookOpen, Trophy } from 'lucide-react';

// Since we don't have the rewards table in Supabase yet, we'll use local data
const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'Premium Content Access',
    description: 'Unlock exclusive premium financial lessons and guides',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop',
    cost: 2000,
    redeemed: false,
    type: 'premium',
    icon: Crown
  },
  {
    id: '2',
    name: 'Dark Mode',
    description: 'Enable dark mode for a more comfortable learning experience',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    cost: 500,
    redeemed: false,
    type: 'feature',
    icon: Unlock
  },
  {
    id: '3',
    name: 'Financial Genius Badge',
    description: 'Show off your financial knowledge with this exclusive profile badge',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
    cost: 1000,
    redeemed: false,
    type: 'badge',
    icon: Award
  }
];

// Mock user rewards
const mockUserRewards: string[] = [];

export const getRewards = async (): Promise<Reward[]> => {
  try {
    // Return mock rewards for now until we set up the Supabase table
    return mockRewards;
  } catch (error) {
    console.error('Error fetching rewards:', error);
    return [];
  }
};

export const redeemReward = async (userId: string, rewardId: string): Promise<boolean> => {
  try {
    // Mock redeeming a reward
    mockUserRewards.push(rewardId);
    console.log(`Reward ${rewardId} redeemed by user ${userId}`);
    
    return true;
  } catch (error) {
    console.error('Error redeeming reward:', error);
    return false;
  }
};

export const getUserRewards = async (userId: string): Promise<string[]> => {
  try {
    // Return mock user rewards for now
    return mockUserRewards;
  } catch (error) {
    console.error('Error fetching user rewards:', error);
    return [];
  }
};
