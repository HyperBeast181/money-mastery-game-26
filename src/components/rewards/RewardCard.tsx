
import { FC } from 'react';
import { Reward } from '../../types/rewards';

interface RewardCardProps {
  reward: Reward;
  onClick: (reward: Reward) => void;
}

const RewardCard: FC<RewardCardProps> = ({ reward, onClick }) => {
  const Icon = reward.icon;
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow"
      onClick={() => onClick(reward)}
    >
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
          <Icon size={20} className={`${reward.type === 'premium' ? 'text-yellow-600' : 
                                      reward.type === 'feature' ? 'text-app-blue' : 
                                      reward.type === 'badge' ? 'text-purple-600' : 
                                      'text-yellow-500'}`} />
        </div>
        <h3 className="font-semibold">{reward.name}</h3>
      </div>
      
      <div className="h-24 overflow-hidden mb-3">
        <img
          src={reward.image}
          alt={reward.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <p className="text-sm text-app-text-light mb-3 line-clamp-2">{reward.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-semibold">{reward.cost}</span>
          <span className="ml-1 text-app-orange">🪙</span>
        </div>
        
        <button
          className={`px-3 py-1 rounded-full text-sm ${
            reward.redeemed
              ? 'bg-gray-100 text-gray-500'
              : 'bg-app-blue text-white'
          }`}
          disabled={reward.redeemed}
        >
          {reward.redeemed ? 'Получено' : 'Получить'}
        </button>
      </div>
    </div>
  );
};

export default RewardCard;
