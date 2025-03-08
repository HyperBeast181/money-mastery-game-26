
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButton from '../CategoryButton';
import { Category } from '../../types';

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-app-dark mb-3">Категории</h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <CategoryButton 
            key={category.id}
            id={category.id}
            title={category.title}
            icon={category.icon}
            color={category.color}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
