
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressTracker from './ProgressTracker';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// Define module type directly here to avoid type issues
interface Module {
  id: string;
  title: string;
  icon: string;
  category: string;
  category_id?: string;
  coins: number;
  progress: number;
  totalParts: number;
  currentPart: number;
  timeEstimate: number;
  participants?: number;
  status: 'не начат' | 'в процессе' | 'завершено' | 'заблокировано';
  description?: string;
}

interface LearningModuleProps {
  module: Module;
  index: number;
}

const LearningModule: FC<LearningModuleProps> = ({ module, index }) => {
  const IconComponent = LucideIcons[module.icon as keyof typeof LucideIcons] as LucideIcon || LucideIcons.BookOpen;
  const navigate = useNavigate();
  
  const handleModuleClick = () => {
    if (module.status !== 'заблокировано') {
      navigate(`/module/${module.id}`);
    }
  };
  
  const getStatusButton = () => {
    switch(module.status) {
      case 'не начат':
        return (
          <button 
            onClick={handleModuleClick}
            className="bg-app-light-blue text-app-blue font-medium text-sm py-3 rounded-full w-full"
          >
            Начать
          </button>
        );
      case 'в процессе':
        return (
          <button 
            onClick={handleModuleClick}
            className="bg-app-light-blue text-app-blue font-medium text-sm py-3 rounded-full w-full"
          >
            Продолжить
          </button>
        );
      case 'завершено':
        return (
          <button 
            onClick={handleModuleClick}
            className="bg-green-100 text-green-600 font-medium text-sm py-3 rounded-full w-full"
          >
            Завершено
          </button>
        );
      case 'заблокировано':
        return (
          <button className="bg-gray-100 text-gray-400 font-medium text-sm py-3 rounded-full w-full" disabled>
            Заблокировано
          </button>
        );
    }
  };

  return (
    <div className="relative mb-6">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-app-light-blue -z-10"></div>
      
      <div className="flex items-start">
        <div className="w-8 h-8 rounded-full bg-app-blue text-white flex items-center justify-center font-semibold text-sm mr-4 z-10">
          {index}
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 w-full animate-scale-in">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-app-light-blue text-app-blue flex items-center justify-center mr-2">
                {IconComponent ? <IconComponent size={16} /> : <LucideIcons.BookOpen size={16} />}
              </div>
              <h3 className="font-semibold text-app-dark">{module.title}</h3>
            </div>
            
            <div className="flex items-center">
              <span className="flex items-center font-medium">
                <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center mr-1">
                  <span className="text-xs text-app-dark">¢</span>
                </span>
                <span className="text-app-dark">{module.coins}+</span>
              </span>
            </div>
          </div>
          
          {module.description && (
            <p className="text-sm text-app-text-light mb-3">{module.description}</p>
          )}
          
          <div className="flex justify-between items-center text-sm text-app-text-light mb-3">
            <span>Модуль {module.currentPart} из {module.totalParts}</span>
            <span>{module.progress}%</span>
          </div>
          
          <ProgressTracker progress={module.progress} />
          
          <div className="mt-4 flex justify-between gap-3">
            <button 
              onClick={handleModuleClick}
              className="bg-gray-100 text-gray-700 font-medium text-sm py-3 rounded-full w-full"
            >
              Просмотр
            </button>
            
            {getStatusButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
