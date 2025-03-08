
import React from 'react';
import { Category } from '../../types';

interface CategoryHeaderProps {
  category: Category | null;
  loading: boolean;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category, loading }) => {
  if (loading) return null;
  
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-app-dark">{category?.title}</h1>
      {category && 'description' in category && (
        <p className="text-gray-600">{(category as any).description}</p>
      )}
    </div>
  );
};

export default CategoryHeader;
