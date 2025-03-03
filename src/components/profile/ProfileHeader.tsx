
import React from 'react';
import TopBar from '../../components/TopBar';
import { currentUser } from '../../data/modules';
import { useLanguage } from '../../context/LanguageContext';

const ProfileHeader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="bg-app-blue h-40 relative">
        <TopBar showBackButton color="blue" showEdit />
        
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-app-blue/0 to-app-blue"></div>
      </div>
      
      <div className="flex flex-col items-center -mt-16 mb-4">
        <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mb-2">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold text-app-dark">{currentUser.name}</h2>
        <p className="text-app-text-light text-sm">{t('joined')} {currentUser.joinedDate}</p>
      </div>
    </>
  );
};

export default ProfileHeader;
