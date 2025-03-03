
import React from 'react';
import { Share, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface InviteViewProps {
  onBackClick: () => void;
}

const InviteView: React.FC<InviteViewProps> = ({ onBackClick }) => {
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
        <h2 className="text-lg font-bold text-app-dark">{t('invite')}</h2>
        <div className="w-10"></div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-app-light-blue rounded-full flex items-center justify-center">
            <Users size={28} className="text-app-blue" />
          </div>
        </div>
        
        <h3 className="font-semibold text-app-dark text-center mb-2">{t('inviteFriends')}</h3>
        <p className="text-app-text-light text-center mb-4">
          {t('inviteDescription')}
        </p>
        
        <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center mb-4">
          <span className="text-app-text-light font-medium">FRIEND1000</span>
          <button className="text-app-blue font-medium text-sm">{t('copy')}</button>
        </div>
        
        <button className="w-full flex items-center justify-center bg-app-blue text-white font-medium py-3 rounded-full mb-3">
          <Share size={18} className="mr-2" /> {t('shareInvitation')}
        </button>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-app-dark mb-3">{t('howItWorks')}</h3>
        <ol className="list-decimal pl-4 space-y-2 text-app-text-light">
          <li>{t('inviteStep1')}</li>
          <li>{t('inviteStep2')}</li>
          <li>{t('inviteStep3')}</li>
          <li>{t('inviteStep4')}</li>
        </ol>
      </div>
    </div>
  );
};

export default InviteView;
