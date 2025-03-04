
import React, { FC } from 'react';
import { User } from '../types';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

// Update TopBarProps interface
interface TopBarProps {
  user: User;
  showBackButton?: boolean;
  title?: string;
  onBackClick?: () => void;
}

// Update the TopBar component to use only Russian
const TopBar: FC<TopBarProps> = ({ user, showBackButton = false, title, onBackClick }) => {
  return (
    <div className="bg-app-blue py-4 px-4 text-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <button onClick={onBackClick} className="mr-3">
              <ChevronLeft size={24} />
            </button>
          )}
          {title ? (
            <h1 className="text-xl font-bold">{title}</h1>
          ) : (
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Логотип"
                className="w-8 h-8 mr-2"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold">Zogo</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <img src={user.avatar} alt="Аватар" className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
