
import { FC } from 'react';
import { GiftCard } from '../../types/rewards';

interface GiftCardsGridProps {
  gifts: GiftCard[];
  onGiftSelect: (gift: GiftCard) => void;
}

const GiftCardsGrid: FC<GiftCardsGridProps> = ({ gifts, onGiftSelect }) => {
  return (
    <div className="space-y-4">
      {gifts.map(gift => (
        <div 
          key={gift.id}
          onClick={() => onGiftSelect(gift)}
          className="relative overflow-hidden rounded-xl cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <div className={`p-5 ${gift.bgColor || 'bg-blue-500'}`}>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src={gift.logo} alt={gift.name} className="w-8 h-8 object-contain" />
              </div>
              <h3 className="ml-3 text-xl font-semibold text-white">{gift.name}</h3>
            </div>
            
            <div className="flex justify-between items-center mt-8">
              <div className="h-[2px] w-3/4 bg-white/20"></div>
              <div className="flex items-center">
                <span className="font-bold text-white mr-2">{gift.costDisplay || gift.cost.toLocaleString()}</span>
                <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center">
                  <span className="text-xs text-app-dark">¢</span>
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <span className="font-bold text-white text-xl">${gift.value}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GiftCardsGrid;
