
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';
import { Reward, RewardFilter } from '../types/rewards';
import { Crown, Unlock, Award, Zap, Users, ShieldCheck, BookOpen, Trophy } from 'lucide-react';
import { getRewards, redeemReward } from '../services/rewards';

export const useRewards = (initialCoins: number) => {
  const { language } = useLanguage();
  const [userCoins, setUserCoins] = useState(initialCoins);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [filter, setFilter] = useState<RewardFilter>('all');
  const { toast } = useToast();
  
  useEffect(() => {
    // Generate rewards based on language
    const rewardsData: Reward[] = [
      {
        id: '1',
        name: language === 'en' ? 'Premium Content Access' : 'Доступ к премиум-контенту',
        description: language === 'en' ? 'Unlock exclusive premium financial lessons and guides' : 'Откройте эксклюзивные премиум-уроки и руководства по финансам',
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop',
        cost: 2000,
        redeemed: false,
        type: 'premium',
        icon: Crown
      },
      {
        id: '2',
        name: language === 'en' ? 'Dark Mode' : 'Тёмная тема',
        description: language === 'en' ? 'Enable dark mode for a more comfortable learning experience' : 'Включите тёмную тему для более комфортного обучения',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
        cost: 500,
        redeemed: false,
        type: 'feature',
        icon: Unlock
      },
      {
        id: '3',
        name: language === 'en' ? 'Financial Genius Badge' : 'Значок финансового гения',
        description: language === 'en' ? 'Show off your financial knowledge with this exclusive profile badge' : 'Покажите свои финансовые знания с помощью этого эксклюзивного значка профиля',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
        cost: 1000,
        redeemed: false,
        type: 'badge',
        icon: Award
      },
      {
        id: '4',
        name: language === 'en' ? 'Double Coins Booster' : 'Ускоритель двойных монет',
        description: language === 'en' ? 'Earn twice as many coins for completed lessons for 7 days' : 'Зарабатывайте в два раза больше монет за выполненные уроки в течение 7 дней',
        image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2071&auto=format&fit=crop',
        cost: 1500,
        redeemed: false,
        type: 'benefit',
        icon: Zap
      },
      {
        id: '5',
        name: language === 'en' ? 'Expert Consultation' : 'Консультация эксперта',
        description: language === 'en' ? 'Get a 30-minute personal finance consultation with an expert' : 'Получите 30-минутную консультацию по личным финансам с экспертом',
        image: 'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?q=80&w=2068&auto=format&fit=crop',
        cost: 3000,
        redeemed: false,
        type: 'premium',
        icon: Users
      },
      {
        id: '6',
        name: language === 'en' ? 'Offline Mode' : 'Режим офлайн',
        description: language === 'en' ? 'Download lessons to complete them without internet connection' : 'Загружайте уроки для выполнения без подключения к интернету',
        image: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=2070&auto=format&fit=crop',
        cost: 800,
        redeemed: false,
        type: 'feature',
        icon: ShieldCheck
      },
      {
        id: '7',
        name: language === 'en' ? 'Advanced Analytics' : 'Расширенная аналитика',
        description: language === 'en' ? 'Access detailed insights about your learning progress and financial knowledge growth' : 'Получите детальную аналитику о вашем прогрессе обучения и росте финансовых знаний',
        image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070&auto=format&fit=crop',
        cost: 1200,
        redeemed: false,
        type: 'feature',
        icon: BookOpen
      },
      {
        id: '8',
        name: language === 'en' ? 'Investment Master Badge' : 'Значок мастера инвестиций',
        description: language === 'en' ? 'A prestigious badge showing your expertise in investment strategies' : 'Престижный значок, показывающий ваш опыт в инвестиционных стратегиях',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2070&auto=format&fit=crop',
        cost: 1800,
        redeemed: false,
        type: 'badge',
        icon: Trophy
      }
    ];
    
    setRewards(rewardsData);
  }, [language]);
  
  const handleRewardClick = (reward: Reward) => {
    setSelectedReward(reward);
  };
  
  const handleRedeem = () => {
    if (selectedReward && userCoins >= selectedReward.cost) {
      // Subtract user's coins
      setUserCoins(prev => prev - selectedReward.cost);
      
      // Update rewards to mark as redeemed
      setRewards(prevRewards => 
        prevRewards.map(r => 
          r.id === selectedReward.id ? { ...r, redeemed: true } : r
        )
      );
      
      // Show confetti
      setShowConfetti(true);
      
      // Reset selected reward
      setSelectedReward(null);
    } else {
      toast({
        title: language === 'en' ? "Not Enough Coins" : "Недостаточно монет",
        description: language === 'en' ? "Complete more modules to earn coins" : "Завершите больше модулей, чтобы заработать монеты",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (showConfetti) {
      toast({
        title: language === 'en' ? "Congratulations!" : "Поздравляем!",
        description: language === 'en' ? `You've received ${selectedReward?.name}` : `Вы получили ${selectedReward?.name}`,
        variant: "default",
      });
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  }, [showConfetti, selectedReward, toast, language]);

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
