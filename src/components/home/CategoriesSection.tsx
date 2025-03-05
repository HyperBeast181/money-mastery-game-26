
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import CategoryButton from '../CategoryButton';
import { Category } from '../../types';

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: FC<CategoriesSectionProps> = ({ categories }) => {
  const navigate = useNavigate();
  
  if (categories.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-app-dark">Категории</h2>
        <Link to="/explore" className="text-app-blue flex items-center text-sm font-medium">
          Все <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {categories.map(category => (
          <CategoryButton 
            key={category.id}
            id={category.id}
            icon={category.icon}
            title={category.title} 
            onClick={() => navigate('/explore')}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
