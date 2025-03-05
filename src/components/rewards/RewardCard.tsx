
import { FC } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Reward } from '../../types/rewards';

interface RewardCardProps {
  reward: Reward;
  onClick: (reward: Reward) => void;
}

const RewardCard: FC<RewardCardProps> = ({ reward, onClick }) => {
  const { language } = useLanguage();
  
  return (
    <div 
      key={reward.id}
      className={`rounded-xl border border-gray-200 shadow-sm p-4 ${reward.redeemed ? 'opacity-50' : 'hover:border-app-blue cursor-pointer hover-scale'}`}
      onClick={() => !reward.redeemed && onClick(reward)}
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
  );
};

export default RewardCard;
