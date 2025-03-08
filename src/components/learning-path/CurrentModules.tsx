
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Module } from '../../types';

interface CurrentModulesProps {
  modules: Module[];
  activeTab: 'skills' | 'completed';
}

const CurrentModules: React.FC<CurrentModulesProps> = ({ modules, activeTab }) => {
  const navigate = useNavigate();

  if (modules.length === 0) return null;

  const filteredModules = modules.filter(module => 
    activeTab === 'skills' || (activeTab === 'completed' && module.status === 'завершено')
  );

  if (filteredModules.length === 0) return null;

  const handleModuleClick = (moduleId: string) => {
    navigate(`/module/${moduleId}`);
  };

  return (
    <>
      <h2 className="text-xl font-bold text-app-dark mb-3">Происходит сейчас</h2>
      <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 shadow-sm mb-6">
        <div className="space-y-3">
          {filteredModules.map((module) => (
            <div 
              key={module.id}
              className="bg-white rounded-xl p-3 border border-gray-100 hover:shadow-md hover-scale cursor-pointer"
              onClick={() => handleModuleClick(module.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{module.title}</h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-2">{module.progress > 0 ? 'В процессе' : 'Не начат'}</span>
                      <span>{module.participants}+ участников</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="flex items-center font-medium text-yellow-600 bg-yellow-50 rounded-full px-2 py-1 text-sm">
                    <span className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center mr-1">
                      <span className="text-xs text-yellow-800">¢</span>
                    </span>
                    {module.coins}+
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CurrentModules;
