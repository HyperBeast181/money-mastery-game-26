
import React, { FC } from 'react';
import { User } from '../types';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

interface TopBarProps {
  user: User | null;
  showBackButton?: boolean;
  title?: string;
  onBackClick?: () => void;
}

const TopBar: FC<TopBarProps> = ({ user, title }) => {
  return (
    <div className="bg-app-blue py-4 px-4 text-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {title ? (
            <h1 className="text-xl font-bold">{title}</h1>
          ) : (
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2 bg-white/10 rounded-full flex items-center justify-center">
                <BookOpen size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">Mani</span>
            </div>
          )}
        </div>
        
        {user && (
          <Link to="/profile" className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src={user.avatar || '/lovable-uploads/66657bf7-1e19-4058-b7e6-4ff8bd5847d3.png'} 
                alt={user.name || 'User'} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-2 hidden sm:block">
              <span className="text-sm font-medium text-white">{user.name}</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopBar;
