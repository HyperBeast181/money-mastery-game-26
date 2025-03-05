
import { Reward } from '../types/rewards';
import { supabase } from '../integrations/supabase/client';

export const getRewards = async (): Promise<Reward[]> => {
  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*');
    
    if (error) throw error;
    
    return data as unknown as Reward[];
  } catch (error) {
    console.error('Error fetching rewards:', error);
    return [];
  }
};

export const redeemReward = async (userId: string, rewardId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_rewards')
      .insert({
        user_id: userId,
        reward_id: rewardId,
        redeemed_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error redeeming reward:', error);
    return false;
  }
};

export const getUserRewards = async (userId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('user_rewards')
      .select('reward_id')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    return data.map(item => item.reward_id);
  } catch (error) {
    console.error('Error fetching user rewards:', error);
    return [];
  }
};
