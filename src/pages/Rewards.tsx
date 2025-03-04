
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { currentUser } from '../data/modules';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { useWindowSize } from '@uidotdev/usehooks';
import { useToast } from '@/hooks/use-toast';
import Confetti from 'react-confetti';
import { Lock, Unlock, Gift, Zap, Crown, Trophy, Users, BookOpen, ShieldCheck, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Reward {
  id: string;
  name: string;
  description: string;
  image: string;
  cost: number;
  redeemed: boolean;
  type: 'premium' | 'feature' | 'badge' | 'benefit';
  icon: React.ReactNode;
}

const Rewards: FC = () => {
  const { language } = useLanguage();
  const [userCoins, setUserCoins] = useState(currentUser.coins);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [filter, setFilter] = useState<'all' | 'premium' | 'feature' | 'badge' | 'benefit'>('all');
  const { width, height } = useWindowSize();
  const { toast } = useToast();
  
  useEffect(() => {
    // Генерируем награды в зависимости от языка
    const rewardsData: Reward[] = [
      {
        id: '1',
        name: language === 'en' ? 'Premium Content Access' : 'Доступ к премиум-контенту',
        description: language === 'en' ? 'Unlock exclusive premium financial lessons and guides' : 'Откройте эксклюзивные премиум-уроки и руководства по финансам',
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop',
        cost: 2000,
        redeemed: false,
        type: 'premium',
        icon: <Crown size={20} className="text-yellow-600" />
      },
      {
        id: '2',
        name: language === 'en' ? 'Dark Mode' : 'Тёмная тема',
        description: language === 'en' ? 'Enable dark mode for a more comfortable learning experience' : 'Включите тёмную тему для более комфортного обучения',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
        cost: 500,
        redeemed: false,
        type: 'feature',
        icon: <Unlock size={20} className="text-app-blue" />
      },
      {
        id: '3',
        name: language === 'en' ? 'Financial Genius Badge' : 'Значок финансового гения',
        description: language === 'en' ? 'Show off your financial knowledge with this exclusive profile badge' : 'Покажите свои финансовые знания с помощью этого эксклюзивного значка профиля',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
        cost: 1000,
        redeemed: false,
        type: 'badge',
        icon: <Award size={20} className="text-purple-600" />
      },
      {
        id: '4',
        name: language === 'en' ? 'Double Coins Booster' : 'Ускоритель двойных монет',
        description: language === 'en' ? 'Earn twice as many coins for completed lessons for 7 days' : 'Зарабатывайте в два раза больше монет за выполненные уроки в течение 7 дней',
        image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2071&auto=format&fit=crop',
        cost: 1500,
        redeemed: false,
        type: 'benefit',
        icon: <Zap size={20} className="text-yellow-500" />
      },
      {
        id: '5',
        name: language === 'en' ? 'Expert Consultation' : 'Консультация эксперта',
        description: language === 'en' ? 'Get a 30-minute personal finance consultation with an expert' : 'Получите 30-минутную консультацию по личным финансам с экспертом',
        image: 'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?q=80&w=2068&auto=format&fit=crop',
        cost: 3000,
        redeemed: false,
        type: 'premium',
        icon: <Users size={20} className="text-green-600" />
      },
      {
        id: '6',
        name: language === 'en' ? 'Offline Mode' : 'Режим офлайн',
        description: language === 'en' ? 'Download lessons to complete them without internet connection' : 'Загружайте уроки для выполнения без подключения к интернету',
        image: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=2070&auto=format&fit=crop',
        cost: 800,
        redeemed: false,
        type: 'feature',
        icon: <ShieldCheck size={20} className="text-blue-600" />
      },
      {
        id: '7',
        name: language === 'en' ? 'Advanced Analytics' : 'Расширенная аналитика',
        description: language === 'en' ? 'Access detailed insights about your learning progress and financial knowledge growth' : 'Получите детальную аналитику о вашем прогрессе обучения и росте финансовых знаний',
        image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070&auto=format&fit=crop',
        cost: 1200,
        redeemed: false,
        type: 'feature',
        icon: <BookOpen size={20} className="text-teal-600" />
      },
      {
        id: '8',
        name: language === 'en' ? 'Investment Master Badge' : 'Значок мастера инвестиций',
        description: language === 'en' ? 'A prestigious badge showing your expertise in investment strategies' : 'Престижный значок, показывающий ваш опыт в инвестиционных стратегиях',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2070&auto=format&fit=crop',
        cost: 1800,
        redeemed: false,
        type: 'badge',
        icon: <Trophy size={20} className="text-yellow-600" />
      }
    ];
    
    setRewards(rewardsData);
  }, [language]);
  
  const handleRewardClick = (reward: Reward) => {
    setSelectedReward(reward);
  };
  
  const handleRedeem = () => {
    if (selectedReward && userCoins >= selectedReward.cost) {
      // Вычитаем монеты пользователя
      setUserCoins(prev => prev - selectedReward.cost);
      
      // Обновляем награды, чтобы отметить как полученную
      setRewards(prevRewards => 
        prevRewards.map(r => 
          r.id === selectedReward.id ? { ...r, redeemed: true } : r
        )
      );
      
      // Показываем конфетти
      setShowConfetti(true);
      
      // Сбрасываем выбранную награду
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={{...currentUser, coins: userCoins}} title={language === 'en' ? "Rewards" : "Награды"} showBackButton />
      
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} />
      )}
      
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-app-dark mb-2">
              {language === 'en' ? "Available Rewards" : "Доступные награды"}
            </h2>
            <p className="text-app-text-light mb-4">
              {language === 'en' ? "Exchange your coins for exclusive rewards" : "Обменяйте ваши монеты на эксклюзивные награды"}
            </p>
            
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <button 
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'all' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
                onClick={() => setFilter('all')}
              >
                {language === 'en' ? "All" : "Все"}
              </button>
              <button 
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'premium' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
                onClick={() => setFilter('premium')}
              >
                {language === 'en' ? "Premium" : "Премиум"}
              </button>
              <button 
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'feature' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
                onClick={() => setFilter('feature')}
              >
                {language === 'en' ? "Features" : "Функции"}
              </button>
              <button 
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'badge' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
                onClick={() => setFilter('badge')}
              >
                {language === 'en' ? "Badges" : "Значки"}
              </button>
              <button 
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'benefit' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
                onClick={() => setFilter('benefit')}
              >
                {language === 'en' ? "Benefits" : "Выгоды"}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {filteredRewards.map(reward => (
              <div 
                key={reward.id}
                className={`rounded-xl border border-gray-200 shadow-sm p-4 ${reward.redeemed ? 'opacity-50' : 'hover:border-app-blue cursor-pointer hover-scale'}`}
                onClick={() => !reward.redeemed && handleRewardClick(reward)}
                aria-disabled={reward.redeemed}
              >
                <div className="relative mb-3">
                  <img src={reward.image} alt={reward.name} className="w-full h-32 object-cover rounded-md" />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm">
                    {reward.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-app-dark">{reward.name}</h3>
                <p className="text-sm text-app-text-light h-10 overflow-hidden">{reward.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center font-medium">
                    <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center mr-1">
                      <span className="text-xs text-app-dark">¢</span>
                    </span>
                    <span className="text-app-dark">{reward.cost}</span>
                  </span>
                  {reward.redeemed ? (
                    <span className="text-green-600 font-medium">
                      {language === 'en' ? "Redeemed" : "Получено"}
                    </span>
                  ) : (
                    <button className="bg-app-light-blue text-app-blue font-medium text-sm py-2 px-3 rounded-full">
                      {language === 'en' ? "Redeem" : "Получить"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {selectedReward && (
            <div className="mt-8 p-4 border border-gray-200 rounded-xl">
              <h3 className="text-xl font-bold text-app-dark mb-3">
                {language === 'en' ? "Redeem Reward" : "Получить награду"}
              </h3>
              <p className="text-app-text-light mb-4">
                {language === 'en' 
                  ? `Are you sure you want to redeem ${selectedReward.name}?` 
                  : `Вы уверены, что хотите получить ${selectedReward.name}?`}
              </p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setSelectedReward(null)}
                  className="py-2 px-4 rounded-full text-app-text-light font-medium hover:bg-gray-100"
                >
                  {language === 'en' ? "Cancel" : "Отмена"}
                </button>
                <button 
                  onClick={handleRedeem}
                  className="bg-app-blue text-white py-2 px-4 rounded-full font-medium"
                >
                  {language === 'en' ? "Redeem" : "Получить"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Rewards;
