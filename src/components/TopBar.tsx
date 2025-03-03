
import React, { FC } from 'react';
import { User } from '../types';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

// Add title to TopBarProps interface
interface TopBarProps {
  user: User;
  showBackButton?: boolean;
  title?: string;
}

// Update the TopBar component to use the title
const TopBar: FC<TopBarProps> = ({ user, showBackButton = false, title }) => {
  // Add logic to display the title if provided
  return (
    <div className="bg-app-blue py-4 px-4 text-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <Link to="/" className="mr-3">
              <ChevronLeft size={24} />
            </Link>
          )}
          {title ? (
            <h1 className="text-xl font-bold">{title}</h1>
          ) : (
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-8 h-8 mr-2"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold">Zogo</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
