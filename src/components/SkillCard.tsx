
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Module } from '../types';
import ProgressTracker from './ProgressTracker';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface SkillCardProps {
  module: Module;
  showButtons?: boolean;
  showProgress?: boolean;
  isDetailed?: boolean;
}

const SkillCard: FC<SkillCardProps> = ({
  module,
  showButtons = true,
  showProgress = true,
  isDetailed = false
}) => {
  const Icon = LucideIcons[module.icon as keyof typeof LucideIcons] as LucideIcon;
  const moduleStatus = module.status;
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/module/${module.id}`);
  };
  
  const getActionButton = () => {
    if (!showButtons) return null;
    
    switch(moduleStatus) {
      case 'не начат':
        return (
          <button 
            onClick={handleClick}
            className="bg-app-light-blue text-app-blue font-medium text-sm px-8 py-2 rounded-full"
          >
            Начать
          </button>
        );
      case 'в процессе':
        return (
          <button 
            onClick={handleClick}
            className="bg-app-light-blue text-app-blue font-medium text-sm px-8 py-2 rounded-full"
          >
            Продолжить
          </button>
        );
      case 'завершено':
        return (
          <button 
            onClick={handleClick}
            className="bg-app-light-blue text-green-600 font-medium text-sm px-8 py-2 rounded-full flex items-center"
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Добавлено
          </button>
        );
      default:
        return (
          <button 
            onClick={handleClick}
            className="bg-app-light-blue text-app-blue font-medium text-sm px-8 py-2 rounded-full flex items-center"
          >
            <span className="mr-1">Добавить</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        );
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 animate-scale-in hover-scale cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-app-light-blue flex items-center justify-center text-app-blue mr-3">
            {Icon && <Icon size={20} />}
          </div>
          <div>
            <h3 className="font-semibold text-app-dark">{module.title}</h3>
            <div className="text-sm text-app-text-light">
              Модуль {module.currentPart} из {module.totalParts}
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center mr-1">
              <span className="text-xs text-app-dark">¢</span>
            </span>
            <span className="text-app-dark font-medium">{module.coins}+</span>
          </div>
        </div>
      </div>
      
      {showProgress && module.progress > 0 && (
        <div className="mt-3">
          <ProgressTracker progress={module.progress} />
        </div>
      )}
      
      {isDetailed && module.participants && (
        <div className="mt-2 text-sm text-app-text-light flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {module.participants.toLocaleString()}
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center">
        <button className="bg-gray-100 text-app-text font-medium text-sm px-6 py-2 rounded-full">
          Посмотреть навык
        </button>
        
        {getActionButton()}
      </div>
    </div>
  );
};

export default SkillCard;
