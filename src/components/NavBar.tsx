
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, Trophy, User } from 'lucide-react';

const NavBar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Check if the current path is related to learning (learning-path, module, category)
  const isLearningRelated = path === '/learning-path' || 
                           path.includes('/module/') || 
                           path.includes('/category/');
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-10">
      <div className="flex justify-between items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center ${path === '/' ? 'text-app-blue' : 'text-gray-500'}`}
        >
          <Home size={20} className="mb-1" />
          <span className="text-xs font-medium">Главная</span>
        </Link>
        
        <Link 
          to="/learning-path" 
          className={`flex flex-col items-center ${isLearningRelated ? 'text-app-blue' : 'text-gray-500'}`}
        >
          <BookOpen size={20} className="mb-1" />
          <span className="text-xs font-medium">Обучение</span>
        </Link>
        
        <Link 
          to="/community" 
          className={`flex flex-col items-center ${path === '/community' ? 'text-app-blue' : 'text-gray-500'}`}
        >
          <Users size={20} className="mb-1" />
          <span className="text-xs font-medium">Общество</span>
        </Link>
        
        <Link 
          to="/rewards" 
          className={`flex flex-col items-center ${path === '/rewards' ? 'text-app-blue' : 'text-gray-500'}`}
        >
          <Trophy size={20} className="mb-1" />
          <span className="text-xs font-medium">Награды</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center ${path === '/profile' ? 'text-app-blue' : 'text-gray-500'}`}
        >
          <User size={20} className="mb-1" />
          <span className="text-xs font-medium">Профиль</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
