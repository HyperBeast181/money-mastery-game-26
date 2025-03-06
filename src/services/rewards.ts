
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
    // Попытка получить награды из Supabase
    const { data, error } = await supabase
      .from('rewards')
      .select('*');
    
    if (error) {
      console.error('Ошибка при получении наград из Supabase:', error);
      return getMockRewards(); // Используем моковые данные в случае ошибки
    }
    
    if (data && data.length > 0) {
      // Преобразуем данные из базы в нужный формат
      return data.map(reward => ({
        id: reward.id,
        name: reward.name,
        description: reward.description,
        image: reward.image,
        cost: reward.cost,
        redeemed: reward.redeemed || false,
        type: reward.type,
        icon: iconMap[reward.icon] || Award // Используем Award как запасной вариант
      }));
    } else {
      // Если в базе нет данных, используем моковые
      return getMockRewards();
    }
  } catch (error) {
    console.error('Ошибка при получении наград:', error);
    return getMockRewards();
  }
};

export const redeemReward = async (userId: string, rewardId: string): Promise<boolean> => {
  try {
    // Проверяем, существует ли таблица user_rewards
    const { data: existingData, error: checkError } = await supabase
      .from('user_rewards')
      .select('*')
      .eq('user_id', userId)
      .eq('reward_id', rewardId)
      .maybeSingle();
    
    if (checkError) {
      console.error('Ошибка при проверке наличия награды у пользователя:', checkError);
      return false;
    }
    
    if (existingData) {
      console.log(`Пользователь ${userId} уже получил награду ${rewardId}`);
      return false;
    }
    
    // Добавляем запись о получении награды
    const { error: insertError } = await supabase
      .from('user_rewards')
      .insert({
        user_id: userId,
        reward_id: rewardId,
        redeemed_at: new Date().toISOString()
      });
    
    if (insertError) {
      console.error('Ошибка при добавлении записи о полученной награде:', insertError);
      return false;
    }
    
    // Обновляем профиль пользователя, уменьшая количество монет
    const { data: rewardData, error: rewardError } = await supabase
      .from('rewards')
      .select('cost')
      .eq('id', rewardId)
      .single();
    
    if (rewardError || !rewardData) {
      console.error('Ошибка при получении стоимости награды:', rewardError);
      return false;
    }
    
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('coins')
      .eq('user_id', userId)
      .single();
    
    if (profileError || !profileData) {
      console.error('Ошибка при получении профиля пользователя:', profileError);
      return false;
    }
    
    const newCoins = profileData.coins - rewardData.cost;
    
    if (newCoins < 0) {
      console.error('Недостаточно монет для получения награды');
      return false;
    }
    
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ coins: newCoins })
      .eq('user_id', userId);
    
    if (updateError) {
      console.error('Ошибка при обновлении количества монет пользователя:', updateError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Ошибка при получении награды:', error);
    return false;
  }
};

export const getUserRewards = async (userId: string): Promise<string[]> => {
  try {
    // Получаем из базы данных список наград пользователя
    const { data, error } = await supabase
      .from('user_rewards')
      .select('reward_id')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Ошибка при получении наград пользователя:', error);
      return [];
    }
    
    // Преобразуем результат в массив ID наград
    return data?.map(item => item.reward_id) || [];
  } catch (error) {
    console.error('Ошибка при получении наград пользователя:', error);
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
