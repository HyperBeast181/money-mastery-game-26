
import React, { useState } from 'react';
import { User } from '../../types';
import StatsGrid from './StatsGrid';
import BadgesSection from './BadgesSection';
import ReferralCard from './ReferralCard';
import MenuSection from './MenuSection';
import NotificationsView from './NotificationsView';
import FAQView from './FAQView';
import SettingsView from './SettingsView';
import InviteView from './InviteView';

interface ProfileContentProps {
  user: User;
}

type View = 'main' | 'notifications' | 'settings' | 'faqs' | 'invite';

const ProfileContent: React.FC<ProfileContentProps> = ({ user }) => {
  const [activeView, setActiveView] = useState<View>('main');
  
  const handleBack = () => {
    setActiveView('main');
  };
  
  const renderView = () => {
    switch (activeView) {
      case 'notifications':
        return <NotificationsView onBack={handleBack} />;
      case 'settings':
        return <SettingsView onBack={handleBack} />;
      case 'faqs':
        return <FAQView onBack={handleBack} />;
      case 'invite':
        return <InviteView user={user} onBack={handleBack} />;
      default:
        return (
          <>
            <StatsGrid user={user} />
            <BadgesSection badges={user.badges} />
            <ReferralCard coins={user.totalEarned} />
            <MenuSection 
              onNavigate={(view) => setActiveView(view as View)} 
            />
          </>
        );
    }
  };
  
  return (
    <div className="p-4 -mt-16">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {renderView()}
      </div>
    </div>
  );
};

export default ProfileContent;
