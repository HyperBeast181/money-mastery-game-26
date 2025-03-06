
import { supabase } from '../integrations/supabase/client';
import { Reward } from '../types/rewards';
import { Crown, Unlock, Award, Zap, Users, ShieldCheck, BookOpen, Trophy } from 'lucide-react';

// Маппинг для иконок
const iconMap: Record<string, any> = {
  'Crown': Crown,
  'Unlock': Unlock,
  'Award': Award,
  'Zap': Zap,
  'Users': Users,
  'ShieldCheck': ShieldCheck,
  'BookOpen': BookOpen,
  'Trophy': Trophy
};

export const getRewards = async (): Promise<Reward[]> => {
  try {
    // Get a list of rewards
    const { data: rewardsData, error: rewardsError } = await supabase
      .from('rewards')
      .select('*');
    
    if (rewardsError) {
      console.error('Error fetching rewards:', rewardsError);
      return getMockRewards();
    }
    
    // Get currently logged in user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // If user is not logged in, return rewards without redeemed status
      return rewardsData.map(reward => ({
        id: reward.id,
        name: reward.name,
        description: reward.description,
        image: reward.image,
        cost: reward.cost,
        redeemed: false,
        type: reward.type as 'premium' | 'feature' | 'badge' | 'benefit',
        icon: iconMap[reward.icon] || Award
      }));
    }
    
    // Get user's redeemed rewards
    const { data: userRewardsData, error: userRewardsError } = await supabase
      .from('user_rewards')
      .select('reward_id')
      .eq('user_id', user.id);
    
    if (userRewardsError) {
      console.error('Error fetching user rewards:', userRewardsError);
      // Return rewards without redeemed status if there's an error
      return rewardsData.map(reward => ({
        id: reward.id,
        name: reward.name,
        description: reward.description,
        image: reward.image,
        cost: reward.cost,
        redeemed: false,
        type: reward.type as 'premium' | 'feature' | 'badge' | 'benefit',
        icon: iconMap[reward.icon] || Award
      }));
    }
    
    // Create a Set of redeemed reward IDs for faster lookups
    const redeemedRewardIds = new Set(userRewardsData.map(userReward => userReward.reward_id));
    
    // Return rewards with redeemed status
    return rewardsData.map(reward => ({
      id: reward.id,
      name: reward.name,
      description: reward.description,
      image: reward.image,
      cost: reward.cost,
      redeemed: redeemedRewardIds.has(reward.id),
      type: reward.type as 'premium' | 'feature' | 'badge' | 'benefit',
      icon: iconMap[reward.icon] || Award
    }));
  } catch (error) {
    console.error('Error in getRewards:', error);
    return getMockRewards();
  }
};

export const redeemReward = async (userId: string, rewardId: string): Promise<boolean> => {
  try {
    // Check if user has already redeemed this reward
    const { data: existingReward, error: checkError } = await supabase
      .from('user_rewards')
      .select('*')
      .eq('user_id', userId)
      .eq('reward_id', rewardId)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking if reward is already redeemed:', checkError);
      return false;
    }
    
    if (existingReward) {
      console.log(`User ${userId} has already redeemed reward ${rewardId}`);
      return false;
    }
    
    // Get reward cost
    const { data: rewardData, error: rewardError } = await supabase
      .from('rewards')
      .select('cost')
      .eq('id', rewardId)
      .single();
    
    if (rewardError || !rewardData) {
      console.error('Error getting reward cost:', rewardError);
      return false;
    }
    
    // Get user's current coins
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('coins')
      .eq('user_id', userId)
      .single();
    
    if (profileError || !profileData) {
      console.error('Error getting user profile:', profileError);
      return false;
    }
    
    // Check if user has enough coins
    const newCoins = profileData.coins - rewardData.cost;
    if (newCoins < 0) {
      console.error('Not enough coins to redeem reward');
      return false;
    }
    
    // Update user's coins
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ coins: newCoins })
      .eq('user_id', userId);
    
    if (updateError) {
      console.error('Error updating user coins:', updateError);
      return false;
    }
    
    // Record the redemption
    const { error: insertError } = await supabase
      .from('user_rewards')
      .insert({
        user_id: userId,
        reward_id: rewardId
      });
    
    if (insertError) {
      console.error('Error recording reward redemption:', insertError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in redeemReward:', error);
    return false;
  }
};

export const getUserRewards = async (userId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('user_rewards')
      .select('reward_id')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error getting user rewards:', error);
      return [];
    }
    
    return data?.map(item => item.reward_id) || [];
  } catch (error) {
    console.error('Error in getUserRewards:', error);
    return [];
  }
};

// Функция для получения моковых данных в случае отсутствия подключения к базе данных
const getMockRewards = (): Reward[] => {
  return [
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
};
