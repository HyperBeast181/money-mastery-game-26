
import { FC } from 'react';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface CategoryButtonProps {
  id?: string;
  title: string;
  icon: string;
  color?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const CategoryButton: FC<CategoryButtonProps> = ({
  id,
  title,
  icon,
  color = "bg-app-light-blue",
  onClick,
  isActive = false
}) => {
  const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon;
  
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center p-4 ${color} rounded-xl w-full h-20 text-app-blue font-medium transition-all hover:shadow-md hover-scale ${isActive ? 'border-2 border-app-blue' : ''}`}
    >
      {IconComponent && <IconComponent className="mr-2" size={20} />}
      <span>{title}</span>
    </button>
  );
};

export default CategoryButton;
