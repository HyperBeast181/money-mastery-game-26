
import { FC, useState } from 'react';
import { currentUser } from '../data/modules';
import NavBar from '../components/NavBar';
import ProfileContent from '../components/profile/ProfileContent';
import NotificationsView from '../components/profile/NotificationsView';
import InviteView from '../components/profile/InviteView';
import FAQView from '../components/profile/FAQView';
import SettingsView from '../components/profile/SettingsView';

type ActiveTab = 'profile' | 'notifications' | 'invite' | 'faq' | 'settings';

const Profile: FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileContent 
            user={currentUser}
            onNotificationsClick={() => setActiveTab('notifications')}
            onSettingsClick={() => setActiveTab('settings')}
            onFaqClick={() => setActiveTab('faq')}
            onInviteClick={() => setActiveTab('invite')}
          />
        );
      case 'notifications':
        return <NotificationsView onBack={() => setActiveTab('profile')} />;
      case 'invite':
        return <InviteView user={currentUser} onBack={() => setActiveTab('profile')} />;
      case 'faq':
        return <FAQView onBack={() => setActiveTab('profile')} />;
      case 'settings':
        return <SettingsView onBack={() => setActiveTab('profile')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {renderContent()}
      
      {activeTab === 'profile' && <NavBar />}
    </div>
  );
};

export default Profile;
