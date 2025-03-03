
import React from 'react';
import { Badge } from '../../types';
import { Award } from 'lucide-react';

interface BadgesSectionProps {
  badges: Badge[];
}

const BadgesSection: React.FC<BadgesSectionProps> = ({ badges }) => {
  const unlockedBadges = badges.filter(badge => badge.unlocked);
  
  return (
    <div className="border-t border-gray-100 px-5 py-4">
      <h3 className="font-semibold text-lg mb-3">Значки</h3>
      
      {unlockedBadges.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {unlockedBadges.map(badge => (
            <div key={badge.id} className="bg-gray-50 rounded-xl p-3 flex flex-col items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                <img src={badge.icon} alt={badge.title} className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium text-center">{badge.title}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
            <Award size={24} className="text-gray-400" />
          </div>
          <h4 className="font-medium mb-1">Пока нет значков</h4>
          <p className="text-sm text-gray-500">Завершите навыки, чтобы получить значки.</p>
        </div>
      )}
    </div>
  );
};

export default BadgesSection;
