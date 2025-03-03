
import React from 'react';
import { Bell, Settings, HelpCircle, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MenuSectionProps {
  onNotificationsClick: () => void;
  onSettingsClick: () => void;
  onFaqClick: () => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  onNotificationsClick,
  onSettingsClick,
  onFaqClick
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="divide-y divide-gray-100">
        <button 
          className="w-full flex items-center justify-between p-4 text-left"
          onClick={onNotificationsClick}
        >
          <div className="flex items-center">
            <Bell size={20} className="text-app-text-light mr-3" />
            <span className="font-medium text-app-dark">{t('notifications')}</span>
          </div>
          <ChevronRight size={18} className="text-app-text-light" />
        </button>
        
        <button 
          className="w-full flex items-center justify-between p-4 text-left"
          onClick={onSettingsClick}
        >
          <div className="flex items-center">
            <Settings size={20} className="text-app-text-light mr-3" />
            <span className="font-medium text-app-dark">{t('settings')}</span>
          </div>
          <ChevronRight size={18} className="text-app-text-light" />
        </button>
        
        <button 
          className="w-full flex items-center justify-between p-4 text-left"
          onClick={onFaqClick}
        >
          <div className="flex items-center">
            <HelpCircle size={20} className="text-app-text-light mr-3" />
            <span className="font-medium text-app-dark">{t('faqs')}</span>
          </div>
          <ChevronRight size={18} className="text-app-text-light" />
        </button>
      </div>
    </div>
  );
};

export default MenuSection;
