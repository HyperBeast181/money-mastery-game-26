
import React from 'react';
import { User } from '../../types';
import TopBar from '../TopBar';
import { PenSquare } from 'lucide-react';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div>
      <TopBar 
        user={user} 
        showBackButton={true} 
        title="Профиль"
      />
      <div className="relative p-5 pt-3 pb-20 bg-app-blue text-white">
        <div className="absolute right-5 top-5">
          <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <PenSquare size={16} className="text-white" />
          </button>
        </div>
        
        <div className="flex items-center mt-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-xl overflow-hidden">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-2 border-app-blue"></div>
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-white/80 text-sm">
              Присоединился: {user.joinedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
