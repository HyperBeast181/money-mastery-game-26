
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { currentUser, rewards as allRewards } from '../data/modules';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { Reward } from '../types';
import { useWindowSize } from '@uidotdev/usehooks';
import { useToast } from '@/hooks/use-toast';
import Confetti from 'react-confetti';

const Rewards: FC = () => {
  const [rewards, setRewards] = useState<Reward[]>(allRewards);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const { toast } = useToast();
  
  const handleRewardClick = (reward: Reward) => {
    setSelectedReward(reward);
  };
  
  const handleRedeem = () => {
    if (selectedReward && currentUser.coins >= selectedReward.cost) {
      // Deduct coins from user
      currentUser.coins -= selectedReward.cost;
      
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
        title: "Недостаточно монет",
        description: "Завершите больше модулей, чтобы заработать монеты",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    if (showConfetti) {
      toast({
        title: "Поздравляем!",
        description: `Вы получили ${selectedReward?.name}`,
        variant: "default",
      });
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  }, [showConfetti, selectedReward, toast]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={currentUser} title="Награды" showBackButton />
      
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} />
      )}
      
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-app-dark mb-4">Доступные награды</h2>
          <p className="text-app-text-light mb-6">Обменяйте ваши монеты на эксклюзивные награды</p>
          
          <div className="grid grid-cols-2 gap-4">
            {rewards.map(reward => (
              <div 
                key={reward.id}
                className={`rounded-xl border border-gray-200 shadow-sm p-4 ${reward.redeemed ? 'opacity-50' : 'hover:border-app-blue cursor-pointer'}`}
                onClick={() => !reward.redeemed && handleRewardClick(reward)}
                aria-disabled={reward.redeemed}
              >
                <img src={reward.image} alt={reward.name} className="w-full h-32 object-cover rounded-md mb-3" />
                <h3 className="font-semibold text-app-dark">{reward.name}</h3>
                <p className="text-sm text-app-text-light">{reward.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center font-medium">
                    <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center mr-1">
                      <span className="text-xs text-app-dark">¢</span>
                    </span>
                    <span className="text-app-dark">{reward.cost}</span>
                  </span>
                  {reward.redeemed ? (
                    <span className="text-green-600 font-medium">Получено</span>
                  ) : (
                    <button className="bg-app-light-blue text-app-blue font-medium text-sm py-2 px-3 rounded-full">
                      Получить
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {selectedReward && (
            <div className="mt-8 p-4 border border-gray-200 rounded-xl">
              <h3 className="text-xl font-bold text-app-dark mb-3">Получить награду</h3>
              <p className="text-app-text-light mb-4">Вы уверены, что хотите получить {selectedReward.name}?</p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setSelectedReward(null)}
                  className="py-2 px-4 rounded-full text-app-text-light font-medium hover:bg-gray-100"
                >
                  Отмена
                </button>
                <button 
                  onClick={handleRedeem}
                  className="bg-app-blue text-white py-2 px-4 rounded-full font-medium"
                >
                  Получить
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
