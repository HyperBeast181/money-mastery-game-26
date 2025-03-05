
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProgressTracker from '../ProgressTracker';
import { Module } from '../../types';
import * as LucideIcons from 'lucide-react';

interface ContinueLearningProps {
  currentModule: Module | null;
}

const ContinueLearning: FC<ContinueLearningProps> = ({ currentModule }) => {
  const navigate = useNavigate();
  
  if (!currentModule) return null;
  
  // Get the icon component if it exists
  const IconComponent = currentModule.icon && (LucideIcons as any)[currentModule.icon as string];
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-app-dark">Продолжить обучение</h2>
        <Link to="/learning-path" className="text-app-blue flex items-center text-sm font-medium">
          Все <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover-scale">
        <div className="flex items-center mb-3">
          {IconComponent && (
            <div className="w-10 h-10 rounded-full bg-app-light-blue flex items-center justify-center mr-3">
              {React.createElement(IconComponent, { 
                size: 20, 
                className: 'text-app-blue' 
              })}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-app-dark">{currentModule.title}</h3>
            <p className="text-sm text-app-text-light">
              Модуль {currentModule.currentPart} из {currentModule.totalParts} • {currentModule.progress}% выполнено
            </p>
          </div>
        </div>
        
        <ProgressTracker progress={currentModule.progress} />
        
        <div className="mt-4">
          <button 
            onClick={() => navigate(`/module/${currentModule.id}`)}
            className="w-full bg-app-blue text-white font-medium py-3 rounded-full"
          >
            {currentModule.status === 'в процессе' ? 'Продолжить' : 'Начать'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;
