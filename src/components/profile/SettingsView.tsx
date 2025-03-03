
import React from 'react';
import { ChevronRight, LogOut } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SettingsViewProps {
  onBackClick: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBackClick }) => {
  const { t } = useLanguage();
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBackClick}
          className="text-app-blue font-medium"
        >
          {t('back')}
        </button>
        <h2 className="text-lg font-bold text-app-dark">{t('settings')}</h2>
        <div className="w-10"></div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm mb-4">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-app-dark mb-1">{t('account')}</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          <div className="p-4 flex justify-between items-center">
            <span className="text-app-dark">{t('email')}</span>
            <span className="text-app-text-light">user@example.com</span>
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <span className="text-app-dark">{t('changePassword')}</span>
            <ChevronRight size={18} className="text-app-text-light" />
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <span className="text-app-dark">{t('editProfile')}</span>
            <ChevronRight size={18} className="text-app-text-light" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm mb-4">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-app-dark mb-1">{t('preferences')}</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          <div className="p-4 flex justify-between items-center">
            <span className="text-app-dark">{t('pushNotifications')}</span>
            <div className="w-10 h-6 bg-app-blue rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <span className="text-app-dark">{t('emailNotifications')}</span>
            <div className="w-10 h-6 bg-gray-200 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <span className="text-app-dark">{t('darkMode')}</span>
            <div className="w-10 h-6 bg-gray-200 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-app-dark mb-1">{t('about')}</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          <div className="p-4 flex justify-between items-center">
            <span className="text-app-dark">{t('termsOfService')}</span>
            <ChevronRight size={18} className="text-app-text-light" />
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <span className="text-app-dark">{t('privacyPolicy')}</span>
            <ChevronRight size={18} className="text-app-text-light" />
          </div>
          
          <div className="p-4 flex justify-between items-center">
            <span className="text-app-dark">{t('version')}</span>
            <span className="text-app-text-light">1.0.0</span>
          </div>
        </div>
      </div>
      
      <button className="w-full flex items-center justify-center text-red-500 font-medium py-3 border border-red-200 rounded-full mb-4">
        <LogOut size={18} className="mr-2" /> {t('logOut')}
      </button>
      
      <button className="w-full text-red-500 font-medium">
        {t('deleteAccount')}
      </button>
    </div>
  );
};

export default SettingsView;
