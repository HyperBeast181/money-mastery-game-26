
import React, { FC } from 'react';
import { User } from '../types';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

interface TopBarProps {
  user: User;
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
      </div>
    </div>
  );
};

export default TopBar;
