
import React from 'react';
import { Loader2 } from 'lucide-react';
import LearningModule from '../LearningModule';
import { Module } from '../../types';

interface PopularModulesProps {
  modules: Module[];
  loading: boolean;
  activeTab: 'skills' | 'completed';
}

const PopularModules: React.FC<PopularModulesProps> = ({ modules, loading, activeTab }) => {
  const filteredModules = modules.filter(module => 
    activeTab === 'skills' || (activeTab === 'completed' && module.status === 'завершено')
  );

  return (
    <>
      <h2 className="text-xl font-bold text-app-dark mb-3">Популярные модули</h2>
      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 size={24} className="text-app-blue animate-spin" />
        </div>
      ) : filteredModules.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-app-text-light">
            {activeTab === 'completed' 
              ? 'У вас пока нет завершенных модулей'
              : 'Модулей не найдено'}
          </p>
        </div>
      ) : (
        filteredModules.map((module, index) => (
          <LearningModule 
            key={module.id}
            module={module}
            index={index + 1}
          />
        ))
      )}
    </>
  );
};

export default PopularModules;
