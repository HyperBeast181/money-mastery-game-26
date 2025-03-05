
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Module } from '../../types';

interface CompletedModulesProps {
  modules: Module[];
}

const CompletedModules: FC<CompletedModulesProps> = ({ modules }) => {
  const navigate = useNavigate();
  
  if (modules.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-app-dark">Завершенные ({modules.length})</h2>
        <Link to="/learning-path" className="text-app-blue flex items-center text-sm font-medium">
          Все <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-app-text-light mb-2">
          Вы успешно завершили {modules.length} {modules.length === 1 ? 'модуль' : 
          modules.length < 5 ? 'модуля' : 'модулей'}!
        </p>
        <button 
          onClick={() => navigate('/learning-path')}
          className="w-full bg-app-light-blue text-app-blue font-medium py-2 rounded-full text-sm"
        >
          Посмотреть завершенные
        </button>
      </div>
    </div>
  );
};

export default CompletedModules;
