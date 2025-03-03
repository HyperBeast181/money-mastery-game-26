
import { FC, useState } from 'react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { rewards } from '../data/modules';
import { currentUser } from '../data/modules';
import { Reward } from '../types';
import { useToast } from '@/hooks/use-toast';

const Rewards: FC = () => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [userCoins, setUserCoins] = useState(currentUser.coins);
  const { toast } = useToast();
  
  const handleRewardSelect = (reward: Reward) => {
    setSelectedReward(reward);
  };
  
  const handlePurchase = () => {
    if (selectedReward) {
      if (userCoins >= selectedReward.cost) {
        setUserCoins(prev => prev - selectedReward.cost);
        toast({
          title: "Reward Purchased!",
          description: `You have successfully purchased ${selectedReward.title}.`,
          variant: "success",
        });
        setSelectedReward(null);
      } else {
        toast({
          title: "Insufficient Coins",
          description: "You don't have enough coins to purchase this reward.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleCancel = () => {
    setSelectedReward(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={{...currentUser, coins: userCoins}} />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold text-app-dark mb-2">Rewards</h1>
        <p className="text-app-text-light mb-6">Exchange your coins for these rewards</p>
        
        {selectedReward ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 animate-scale-in">
            <h2 className="text-xl font-bold text-app-dark mb-2">{selectedReward.title}</h2>
            <p className="text-app-text-light mb-4">{selectedReward.description}</p>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="w-6 h-6 bg-app-yellow rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs text-app-dark">¢</span>
                </span>
                <span className="text-lg font-bold text-app-dark">{selectedReward.cost}</span>
              </div>
              
              <div className="text-sm text-app-text-light">
                Your balance: <span className="font-medium text-app-dark">{userCoins} coins</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 py-3 rounded-full border border-gray-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                className={`flex-1 py-3 rounded-full font-medium ${
                  userCoins >= selectedReward.cost
                    ? 'bg-app-blue text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
                disabled={userCoins < selectedReward.cost}
              >
                Purchase
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {rewards.map(reward => (
              <div 
                key={reward.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover-scale"
                onClick={() => handleRewardSelect(reward)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-app-dark">{reward.title}</h3>
                    <p className="text-sm text-app-text-light">{reward.description}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center mr-1">
                      <span className="text-xs text-app-dark">¢</span>
                    </span>
                    <span className="text-app-dark font-medium">{reward.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 p-4 bg-app-light-blue rounded-xl">
          <h3 className="font-semibold text-app-dark mb-2">How to earn more coins</h3>
          <ul className="list-disc pl-5 text-app-text-light space-y-1">
            <li>Complete learning modules</li>
            <li>Maintain daily streaks</li>
            <li>Take quizzes and tests</li>
            <li>Invite friends to join</li>
            <li>Participate in community events</li>
          </ul>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Rewards;
