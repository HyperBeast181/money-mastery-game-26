
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';
import { Reward, RewardFilter } from '../types/rewards';
import { getRewards, redeemReward, getUserRewards } from '../services/rewards';
import { supabase } from '../integrations/supabase/client';

export const useRewards = (initialCoins: number) => {
  const { language } = useLanguage();
  const [userCoins, setUserCoins] = useState(initialCoins);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [filter, setFilter] = useState<RewardFilter>('all');
  const { toast } = useToast();
  
  useEffect(() => {
    // Fetch rewards from the database
    const fetchRewards = async () => {
      const fetchedRewards = await getRewards();
      setRewards(fetchedRewards);
    };
    
    fetchRewards();
  }, []);
  
  const handleRewardClick = (reward: Reward) => {
    setSelectedReward(reward);
  };
  
  const handleRedeem = async () => {
    if (!selectedReward) return;
    
    if (userCoins < selectedReward.cost) {
      toast({
        title: language === 'en' ? "Not Enough Coins" : "Недостаточно монет",
        description: language === 'en' ? "Complete more modules to earn coins" : "Завершите больше модулей, чтобы заработать монеты",
        variant: "destructive",
      });
      return;
    }
    
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: language === 'en' ? "Authentication Required" : "Требуется авторизация",
        description: language === 'en' ? "Please log in to redeem rewards" : "Пожалуйста, войдите в систему, чтобы получить награду",
        variant: "destructive",
      });
      return;
    }
    
    // Attempt to redeem the reward
    const success = await redeemReward(user.id, selectedReward.id);
    
    if (success) {
      // Update local state
      setUserCoins(prev => prev - selectedReward.cost);
      
      // Update rewards list
      setRewards(prevRewards => 
        prevRewards.map(r => 
          r.id === selectedReward.id ? { ...r, redeemed: true } : r
        )
      );
      
      // Show confetti
      setShowConfetti(true);
      
      toast({
        title: language === 'en' ? "Congratulations!" : "Поздравляем!",
        description: language === 'en' ? `You've received ${selectedReward.name}` : `Вы получили ${selectedReward.name}`,
        variant: "default",
      });
      
      // Hide confetti after a few seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } else {
      toast({
        title: language === 'en' ? "Failed to Redeem" : "Не удалось получить награду",
        description: language === 'en' ? "There was an error redeeming the reward" : "Произошла ошибка при получении награды",
        variant: "destructive",
      });
    }
    
    // Reset selected reward
    setSelectedReward(null);
  };

  // Filter rewards based on the selected filter
  const filteredRewards = filter === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.type === filter);
    
  return {
    userCoins,
    rewards: filteredRewards,
    selectedReward,
    showConfetti,
    filter,
    setFilter,
    handleRewardClick,
    handleRedeem,
    cancelRedemption: () => setSelectedReward(null)
  };
};
