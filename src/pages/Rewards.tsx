
import { FC } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import Confetti from 'react-confetti';
import { currentUser } from '../data'; // Updated import path
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import RewardFilter from '../components/rewards/RewardFilter';
import RewardsGrid from '../components/rewards/RewardsGrid';
import RedeemConfirmation from '../components/rewards/RedeemConfirmation';
import { useRewards } from '../hooks/useRewards';
import { useLanguage } from '../context/LanguageContext';

const Rewards: FC = () => {
  const { language } = useLanguage();
  const { width, height } = useWindowSize();
  const { 
    userCoins, 
    rewards, 
    selectedReward, 
    showConfetti, 
    filter, 
    setFilter, 
    handleRewardClick, 
    handleRedeem,
    cancelRedemption
  } = useRewards(currentUser.coins);
  
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
            
            <RewardFilter currentFilter={filter} onFilterChange={setFilter} />
          </div>
          
          <RewardsGrid rewards={rewards} onRewardClick={handleRewardClick} />
          
          {selectedReward && (
            <RedeemConfirmation 
              reward={selectedReward} 
              onCancel={cancelRedemption}
              onConfirm={handleRedeem}
            />
          )}
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Rewards;
