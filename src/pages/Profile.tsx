
import { FC, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileContent from '../components/profile/ProfileContent';
import NotificationsView from '../components/profile/NotificationsView';
import InviteView from '../components/profile/InviteView';
import FAQView from '../components/profile/FAQView';
import SettingsView from '../components/profile/SettingsView';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';
import { supabase } from '../integrations/supabase/client';

type ActiveTab = 'profile' | 'notifications' | 'invite' | 'faq' | 'settings';

const Profile: FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const { toast } = useToast();
  const { language } = useLanguage();
  const { user, profile } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Get profile data if not already available in context
        let profileData = profile;
        
        if (!profileData) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();
            
          if (error) {
            console.error('Error fetching profile:', error);
            return;
          }
          
          profileData = data;
        }
        
        if (profileData) {
          // Transform profile data to User type
          setUserData({
            id: user.id,
            name: profileData.name || user.user_metadata?.name || 'Пользователь',
            avatar: profileData.avatar || '/lovable-uploads/66657bf7-1e19-4058-b7e6-4ff8bd5847d3.png',
            coins: profileData.coins || 0,
            xp: profileData.xp || 0,
            streak: profileData.streak || 0,
            hearts: profileData.hearts || 0,
            joinedDate: new Date(profileData.joined_date).toLocaleDateString('ru-RU', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            }),
            completedModules: profileData.completed_modules || 0,
            totalEarned: profileData.total_earned || 0,
            badges: []
          });
        }
      } catch (error) {
        console.error('Error in fetchUserData:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, profile]);
  
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
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-app-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-xl font-semibold text-gray-800 mb-2">
            Профиль не найден
          </div>
          <p className="text-gray-600">
            Не удалось загрузить данные профиля
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader user={userData} />
      
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
            {activeTab === 'profile' && <ProfileContent user={userData} />}
            {activeTab === 'notifications' && <NotificationsView onBack={handleBack} />}
            {activeTab === 'invite' && <InviteView user={userData} onBack={handleBack} />}
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
