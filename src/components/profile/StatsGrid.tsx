
import React from 'react';
import { currentUser } from '../../data/modules';
import { useLanguage } from '../../context/LanguageContext';

const StatsGrid: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-4 gap-2 mb-6">
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
        <div className="flex items-center mb-1">
          <span className="w-6 h-6 bg-app-yellow rounded-full flex items-center justify-center">
            <span className="text-xs text-app-dark">¢</span>
          </span>
        </div>
        <span className="text-lg font-bold text-app-dark">{currentUser.coins}</span>
        <span className="text-xs text-app-text-light">{t('coins')}</span>
      </div>
      
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
        <div className="flex items-center mb-1">
          <span className="w-6 h-6 bg-app-red rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </span>
        </div>
        <span className="text-lg font-bold text-app-dark">{currentUser.streak}</span>
        <span className="text-xs text-app-text-light">{t('dayStreak')}</span>
      </div>
      
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
        <div className="flex items-center mb-1">
          <span className="w-6 h-6 bg-app-blue rounded-full flex items-center justify-center">
            <span className="text-xs text-white">XP</span>
          </span>
        </div>
        <span className="text-lg font-bold text-app-dark">{currentUser.xp.toLocaleString()}</span>
        <span className="text-xs text-app-text-light">XP</span>
      </div>
      
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
        <div className="flex items-center mb-1">
          <span className="w-6 h-6 bg-app-red rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </span>
        </div>
        <span className="text-lg font-bold text-app-dark">{currentUser.hearts}</span>
        <span className="text-xs text-app-text-light">{t('hearts')}</span>
      </div>
    </div>
  );
};

export default StatsGrid;
