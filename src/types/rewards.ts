
import { FC } from 'react';
import { LucideIcon } from 'lucide-react';

export interface Reward {
  id: string;
  name: string;
  description: string;
  image: string;
  cost: number;
  redeemed: boolean;
  type: 'premium' | 'feature' | 'badge' | 'benefit';
  icon: LucideIcon;
}

export type RewardFilter = 'all' | 'premium' | 'feature' | 'badge' | 'benefit';
