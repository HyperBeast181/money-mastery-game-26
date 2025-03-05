
import { ReactNode } from 'react';

export interface Reward {
  id: string;
  name: string;
  description: string;
  image: string;
  cost: number;
  redeemed: boolean;
  type: 'premium' | 'feature' | 'badge' | 'benefit';
  icon: ReactNode;
}

export type RewardFilter = 'all' | 'premium' | 'feature' | 'badge' | 'benefit';
