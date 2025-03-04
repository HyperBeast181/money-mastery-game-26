
import React from 'react';
import { Category } from '../types';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="flex space-x-2 pb-2">
      {categories.map(category => {
        const Icon = LucideIcons[category.icon as keyof typeof LucideIcons] as LucideIcon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <button
            key={category.id}
            className={`flex flex-col items-center justify-center p-3 rounded-xl min-w-[100px] transition-all ${
              isSelected ? 'bg-app-blue text-white' : 'bg-white border border-gray-200 text-app-dark'
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {Icon && <Icon size={20} className="mb-1" />}
            <span className="text-sm font-medium">{category.title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
