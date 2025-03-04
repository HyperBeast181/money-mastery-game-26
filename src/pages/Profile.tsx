import { FC, useState } from 'react';
import { currentUser } from '../data/modules';
import NavBar from '../components/NavBar';
import ProfileHeader from '../components/profile/ProfileHeader';

type ActiveTab = 'profile' | 'notifications' | 'invite' | 'faq' | 'settings';

const Profile: FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ProfileHeader user={currentUser} />
      
      <div className="p-4 -mt-16">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5">
            {activeTab === 'profile' && (
              <>
                <h2 className="text-2xl font-bold text-app-dark mb-4">Профиль</h2>
                <p className="text-app-text-light">Здесь будет содержимое профиля</p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Profile;
