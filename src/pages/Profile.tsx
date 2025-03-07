
import { FC, useState } from 'react';
import { currentUser } from '../data'; // Updated import path
import NavBar from '../components/NavBar';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileContent from '../components/profile/ProfileContent';
import NotificationsView from '../components/profile/NotificationsView';
import InviteView from '../components/profile/InviteView';
import FAQView from '../components/profile/FAQView';
import SettingsView from '../components/profile/SettingsView';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';

type ActiveTab = 'profile' | 'notifications' | 'invite' | 'faq' | 'settings';

const Profile: FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    
    // Показываем тост при смене вкладки для обратной связи
    const tabNames = {
      profile: language === 'en' ? 'Profile' : 'Профиль',
      notifications: language === 'en' ? 'Notifications' : 'Уведомления',
      invite: language === 'en' ? 'Invite Friends' : 'Пригласить друзей',
      faq: language === 'en' ? 'FAQ' : 'Вопросы и ответы',
      settings: language === 'en' ? 'Settings' : 'Настройки',
    };
    
    toast({
      title: tabNames[tab],
      description: language === 'en' ? 'Tab switched successfully' : 'Вкладка успешно изменена',
    });
  };
  
  // Function to return to the profile tab
  const handleBack = () => {
    setActiveTab('profile');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader user={currentUser} />
      
      <div className="px-4 pb-20">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden -mt-16">
          {/* Tabs menu */}
          <div className="flex overflow-x-auto p-2 gap-2 border-b no-scrollbar">
            <button 
              onClick={() => handleTabChange('profile')} 
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium ${activeTab === 'profile' ? 'bg-app-blue text-white' : 'text-app-text-light'}`}
            >
              {language === 'en' ? 'Profile' : 'Профиль'}
            </button>
            <button 
              onClick={() => handleTabChange('notifications')} 
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium ${activeTab === 'notifications' ? 'bg-app-blue text-white' : 'text-app-text-light'}`}
            >
              {language === 'en' ? 'Notifications' : 'Уведомления'}
            </button>
            <button 
              onClick={() => handleTabChange('invite')} 
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium ${activeTab === 'invite' ? 'bg-app-blue text-white' : 'text-app-text-light'}`}
            >
              {language === 'en' ? 'Invite Friends' : 'Пригласить друзей'}
            </button>
            <button 
              onClick={() => handleTabChange('faq')} 
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium ${activeTab === 'faq' ? 'bg-app-blue text-white' : 'text-app-text-light'}`}
            >
              {language === 'en' ? 'FAQ' : 'Вопросы и ответы'}
            </button>
            <button 
              onClick={() => handleTabChange('settings')} 
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium ${activeTab === 'settings' ? 'bg-app-blue text-white' : 'text-app-text-light'}`}
            >
              {language === 'en' ? 'Settings' : 'Настройки'}
            </button>
          </div>
          
          {/* Tab content with proper spacing */}
          <div>
            {activeTab === 'profile' && <ProfileContent user={currentUser} />}
            {activeTab === 'notifications' && <NotificationsView onBack={handleBack} />}
            {activeTab === 'invite' && <InviteView user={currentUser} onBack={handleBack} />}
            {activeTab === 'faq' && <FAQView onBack={handleBack} />}
            {activeTab === 'settings' && <SettingsView onBack={handleBack} />}
          </div>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Profile;
