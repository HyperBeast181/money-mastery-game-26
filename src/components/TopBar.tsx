
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, PenLine } from 'lucide-react';
import { User } from '../types';

interface TopBarProps {
  user?: User;
  title?: string;
  showBackButton?: boolean;
  transparent?: boolean;
  showEdit?: boolean;
  color?: 'white' | 'blue';
}

const TopBar: FC<TopBarProps> = ({ 
  user, 
  title, 
  showBackButton = false, 
  transparent = false,
  showEdit = false,
  color = 'white'
}) => {
  return (
    <div className={`w-full px-4 py-4 flex items-center justify-between ${transparent ? 'bg-transparent' : color === 'white' ? 'bg-white' : 'bg-app-blue text-white'}`}>
      <div className="flex items-center">
        {showBackButton && (
          <Link to="/learning-path" className="mr-4">
            <ChevronLeft className={`h-6 w-6 ${color === 'blue' ? 'text-white' : 'text-app-dark'}`} />
          </Link>
        )}
        
        {user && (
          <div className="flex items-center">
            <Link to="/profile">
              <img src={user.avatar} alt="User avatar" className="w-8 h-8 rounded-full object-cover" />
            </Link>
            <div className="ml-2">
              <Link to="/profile" className="text-app-dark font-medium text-sm">
                {user.name}
              </Link>
            </div>
          </div>
        )}
        
        {title && (
          <h1 className={`font-semibold text-xl ${color === 'blue' ? 'text-white' : 'text-app-dark'}`}>
            {title}
          </h1>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        {user && (
          <div className="flex items-center">
            <span className="flex items-center font-medium">
              <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center mr-1">
                <span className="text-xs text-app-dark">¢</span>
              </span>
              <span className={color === 'blue' ? 'text-white' : 'text-app-dark'}>
                {user.coins}
              </span>
            </span>
          </div>
        )}
        
        {showEdit && (
          <button className="bg-white px-4 py-1 rounded-full text-app-blue font-medium text-sm">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
