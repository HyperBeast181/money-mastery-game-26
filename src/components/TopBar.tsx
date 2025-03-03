
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { ArrowLeft, MessageCircle, Bell } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

interface TopBarProps {
  user?: User;
  showBackButton?: boolean;
  color?: 'white' | 'blue';
  showEdit?: boolean;
}

const TopBar: FC<TopBarProps> = ({ 
  user, 
  showBackButton = false,
  color = 'white',
  showEdit = false
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className={`py-4 px-4 flex items-center justify-between ${color === 'blue' ? 'text-white' : 'text-app-dark'}`}>
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={handleBackClick}
            className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20"
            aria-label={t('back')}
          >
            <ArrowLeft size={18} />
          </button>
        )}
        
        {user && (
          <div 
            className="flex items-center cursor-pointer"
            onClick={handleProfileClick}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-sm">
                {user.name}
              </p>
              <div className="flex items-center mt-0.5">
                <span className="flex items-center mr-2">
                  <span className="w-3 h-3 bg-app-yellow rounded-full flex items-center justify-center mr-1">
                    <span className="text-[8px] text-app-dark">¢</span>
                  </span>
                  <span className="text-xs">{user.coins}</span>
                </span>
                <span className="flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1 text-app-red">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span className="text-xs">{user.hearts}</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center">
        <LanguageSwitcher />
        <button 
          className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
          onClick={() => navigate('/profile')}
        >
          <Bell size={18} className="text-app-dark" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
