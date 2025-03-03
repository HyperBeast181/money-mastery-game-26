
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface ReferralCardProps {
  onInviteClick: () => void;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ onInviteClick }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-app-dark">{t('referFriends')}</h3>
          <p className="text-app-text-light text-sm">{t('referDescription')}</p>
        </div>
        <div className="flex items-center">
          <span className="text-app-dark font-medium mr-1">1.0k</span>
          <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center">
            <span className="text-xs text-app-dark">¢</span>
          </span>
        </div>
      </div>
      
      <button 
        className="w-full bg-app-light-blue text-app-blue font-medium py-3 rounded-full"
        onClick={onInviteClick}
      >
        {t('share')}
      </button>
    </div>
  );
};

export default ReferralCard;
