
import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      aria-label={t('language')}
    >
      <Languages size={18} className="text-white" />
      <span className="ml-1 text-xs font-medium text-white uppercase">
        {language === 'en' ? 'RU' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
