
import { FC } from 'react';
import { Module } from '../types';
import { Link } from 'react-router-dom';
import ProgressTracker from './ProgressTracker';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface LearningModuleProps {
  module: Module;
  index: number;
}

const LearningModule: FC<LearningModuleProps> = ({ module, index }) => {
  const Icon = LucideIcons[module.icon as keyof typeof LucideIcons] as LucideIcon;
  
  const getStatusButton = () => {
    switch(module.status) {
      case 'not-started':
        return (
          <button className="bg-app-light-blue text-app-blue font-medium text-sm py-3 rounded-full w-full">
            Start
          </button>
        );
      case 'in-progress':
        return (
          <button className="bg-app-light-blue text-app-blue font-medium text-sm py-3 rounded-full w-full">
            Continue
          </button>
        );
      case 'completed':
        return (
          <button className="bg-green-100 text-green-600 font-medium text-sm py-3 rounded-full w-full">
            Completed
          </button>
        );
      case 'locked':
        return (
          <button className="bg-gray-100 text-gray-400 font-medium text-sm py-3 rounded-full w-full" disabled>
            Locked
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
              {Icon && (
                <div className="w-8 h-8 rounded-full bg-app-light-blue text-app-blue flex items-center justify-center mr-2">
                  <Icon size={16} />
                </div>
              )}
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
          
          <div className="flex justify-between items-center text-sm text-app-text-light mb-3">
            <span>Module {module.currentPart} of {module.totalParts}</span>
            <span>{module.progress}%</span>
          </div>
          
          <ProgressTracker progress={module.progress} />
          
          <div className="mt-4 flex justify-between gap-3">
            <button className="bg-gray-100 text-app-text font-medium text-sm py-3 rounded-full w-full">
              View
            </button>
            
            {getStatusButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
