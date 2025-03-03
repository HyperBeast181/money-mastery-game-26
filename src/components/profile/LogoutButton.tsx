
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LogoutButton: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <button className="w-full text-app-blue font-medium mt-6 py-2">
      {t('logOut')}
    </button>
  );
};

export default LogoutButton;
