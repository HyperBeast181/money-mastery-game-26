
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ReferralCardProps {
  coins: number;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ coins }) => {
  return (
    <div className="px-5 py-4 border-t border-gray-100">
      <div className="bg-app-blue rounded-xl p-4 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold mb-1">Всего заработано</h3>
            <div className="text-2xl font-bold mb-3">
              {coins.toLocaleString()} <span className="text-sm font-normal">монет</span>
            </div>
            <p className="text-sm text-white/80 mb-3">
              Зарабатывайте монеты, когда ваши друзья присоединяются к Zogo
            </p>
          </div>
          <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center">
            <ArrowUpRight size={20} className="text-white" />
          </div>
        </div>
        
        <button className="bg-white text-app-blue font-medium py-2 px-4 rounded-lg w-full">
          Пригласить друзей
        </button>
      </div>
    </div>
  );
};

export default ReferralCard;
