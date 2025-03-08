
import React from 'react';
import { Category } from '../../types';
import { Loader2 } from 'lucide-react';

interface CategoryHeaderProps {
  category: Category | null;
  loading: boolean;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <Loader2 size={24} className="text-app-blue animate-spin" />
      </div>
    );
  }
  
  if (!category) {
    return <div className="mb-6 text-center text-gray-500">Категория не найдена</div>;
  }
  
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-app-dark">{category.title}</h1>
      {category && 'description' in category && (
        <p className="text-gray-600">{(category as any).description}</p>
      )}
      <div className="flex items-center mt-2 text-sm text-app-text-light">
        <span className="flex items-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Модулей: {category.total_modules || 0}
        </span>
      </div>
    </div>
  );
};

export default CategoryHeader;
