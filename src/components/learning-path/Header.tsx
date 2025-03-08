
import React from 'react';
import { Filter, PenLine } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold text-app-dark">Обучение</h1>
      
      <div className="flex space-x-2">
        <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <Filter size={18} className="text-app-dark" />
        </button>
        <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <PenLine size={18} className="text-app-dark" />
        </button>
      </div>
    </div>
  );
};

export default Header;
