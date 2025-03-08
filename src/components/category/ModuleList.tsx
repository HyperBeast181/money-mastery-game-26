
import React from 'react';
import { Loader2 } from 'lucide-react';
import LearningModule from '../LearningModule';
import { Module } from '../../types';
import { cn } from '@/lib/utils';

interface ModuleListProps {
  modules: Module[];
  loading: boolean;
  emptyMessage?: string;
  className?: string;
}

const ModuleList: React.FC<ModuleListProps> = ({ 
  modules, 
  loading, 
  emptyMessage = "В этой категории пока нет модулей",
  className 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 size={24} className="text-app-blue animate-spin" />
      </div>
    );
  }
  
  return (
    <div className={cn("mb-4", className)}>
      <h2 className="text-lg font-semibold text-app-dark mb-3">Модули ({modules.length})</h2>
      {modules.length > 0 ? (
        modules.map((module, index) => (
          <LearningModule 
            key={module.id}
            module={module}
            index={index + 1}
          />
        ))
      ) : (
        <div className="bg-white rounded-lg p-4 text-center text-gray-500">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

export default ModuleList;
