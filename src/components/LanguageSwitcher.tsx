
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
      className="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      aria-label={t('language')}
    >
      <Languages size={18} className="text-app-dark" />
      <span className="ml-1 text-xs font-medium">{language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSwitcher;
