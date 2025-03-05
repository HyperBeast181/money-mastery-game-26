
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import ProgressTracker from '../ProgressTracker';
import { Module } from '../../types';

interface ModuleCardProps {
  module: Module;
  onClick: () => void;
}

const ModuleCard: FC<ModuleCardProps> = ({ module, onClick }) => {
  // Get icon component from lucide-react if it exists
  const IconComponent = module.icon && (LucideIcons as any)[module.icon as string] as LucideIcon;
  
  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-app-blue transition-all hover-scale"
      onClick={onClick}
    >
      <div className="flex items-center mb-2">
        {IconComponent && (
          <div className="w-8 h-8 rounded-full bg-app-light-blue flex items-center justify-center mr-2">
            <IconComponent size={16} className="text-app-blue" />
          </div>
        )}
        <h3 className="font-semibold text-app-dark">{module.title}</h3>
      </div>
      
      <div className="flex justify-between items-center text-xs text-app-text-light mb-2">
        <span>{module.timeEstimate} мин</span>
        <span>{module.progress}%</span>
      </div>
      
      <ProgressTracker progress={module.progress} />
    </div>
  );
};

interface RecommendedModulesProps {
  modules: Module[];
}

const RecommendedModules: FC<RecommendedModulesProps> = ({ modules }) => {
  const navigate = useNavigate();
  
  if (modules.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-app-dark">Рекомендуемые</h2>
        <Link to="/learning-path" className="text-app-blue flex items-center text-sm font-medium">
          Все <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {modules.map(module => (
          <ModuleCard 
            key={module.id} 
            module={module} 
            onClick={() => navigate(`/module/${module.id}`)} 
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedModules;
