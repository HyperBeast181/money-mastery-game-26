
import { FC, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface CategoryButtonProps {
  title: string;
  icon: string;
  onClick?: () => void;
  isActive?: boolean;
}

const CategoryButton: FC<CategoryButtonProps> = ({
  title,
  icon,
  onClick,
  isActive = false
}) => {
  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon;
  
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center p-4 bg-app-light-blue rounded-xl w-full h-20 text-app-blue font-medium transition-all hover:shadow-md hover-scale ${isActive ? 'border-2 border-app-blue' : ''}`}
    >
      {Icon && <Icon className="mr-2" size={20} />}
      <span>{title}</span>
    </button>
  );
};

export default CategoryButton;
