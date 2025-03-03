
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NavBar: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center shadow-sm z-50">
      <Link 
        to="/" 
        className={`flex flex-col items-center ${isActive('/') ? 'text-app-blue' : 'text-app-text-light'}`}
      >
        <Home className={`h-6 w-6 ${isActive('/') ? 'fill-app-blue' : ''}`} />
        <span className="text-xs mt-1 font-medium">{t('home')}</span>
      </Link>
      
      <Link 
        to="/explore" 
        className={`flex flex-col items-center ${isActive('/explore') ? 'text-app-blue' : 'text-app-text-light'}`}
      >
        <BookOpen className={`h-6 w-6 ${isActive('/explore') ? 'fill-app-blue' : ''}`} />
        <span className="text-xs mt-1 font-medium">{t('explore')}</span>
      </Link>
      
      <Link 
        to="/rewards" 
        className={`flex flex-col items-center ${isActive('/rewards') ? 'text-app-blue' : 'text-app-text-light'}`}
      >
        <Award className={`h-6 w-6 ${isActive('/rewards') ? 'fill-app-blue' : ''}`} />
        <span className="text-xs mt-1 font-medium">{t('rewards')}</span>
      </Link>
      
      <Link 
        to="/community" 
        className={`flex flex-col items-center ${isActive('/community') ? 'text-app-blue' : 'text-app-text-light'}`}
      >
        <Users className={`h-6 w-6 ${isActive('/community') ? 'fill-app-blue' : ''}`} />
        <span className="text-xs mt-1 font-medium">{t('community')}</span>
      </Link>
    </nav>
  );
};

export default NavBar;
