
import { FC } from 'react';
import RewardCard from './RewardCard';
import { Reward } from '../../types/rewards';

interface RewardsGridProps {
  rewards: Reward[];
  onRewardClick: (reward: Reward) => void;
}

const RewardsGrid: FC<RewardsGridProps> = ({ rewards, onRewardClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {rewards.map(reward => (
        <RewardCard 
          key={reward.id}
          reward={reward}
          onClick={onRewardClick}
        />
      ))}
    </div>
  );
};

export default RewardsGrid;
