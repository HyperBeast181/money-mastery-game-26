
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

export interface GiftCard {
  id: string;
  name: string;
  logo: string;
  value: number;
  cost: number;
  costDisplay: string;
  bgColor: string;
}

export type RewardFilter = 'all' | 'premium' | 'feature' | 'badge' | 'benefit';

export interface GiftCardRedeem {
  giftCardId: string;
  userId: string;
  code?: string;
}
