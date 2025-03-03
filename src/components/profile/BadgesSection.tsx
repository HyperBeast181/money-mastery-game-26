
import React from 'react';
import { currentUser } from '../../data/modules';
import { useLanguage } from '../../context/LanguageContext';

const BadgesSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="p-4 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse-light mb-3 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-gray-400">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-app-dark mb-1">{t('noBadges')}</h3>
        <p className="text-app-text-light text-sm text-center mb-4">{t('completeBadges')}</p>
        
        <div className="flex justify-between w-full px-4 py-2 border-t border-gray-100">
          <div className="flex items-center">
            <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center mr-2">
              <span className="text-xs text-app-dark">¢</span>
            </span>
            <span className="text-app-dark">{currentUser.totalEarned}</span>
            <span className="mx-2 text-app-text-light">{t('totalEarned')}</span>
          </div>
          
          <div className="flex items-center">
            <span className="text-app-dark">{currentUser.completedModules}</span>
            <span className="ml-2 text-app-text-light">{t('totalModules')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesSection;
