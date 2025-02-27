
import { FC, useState } from 'react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import CategoryButton from '../components/CategoryButton';
import { categories, modules } from '../data/modules';
import { Zap } from 'lucide-react';

const Explore: FC = () => {
  const taxModules = modules.filter(m => m.category === 'Tax');
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Explore" />
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.slice(0, 8).map(category => (
            <CategoryButton
              key={category.id}
              title={category.title}
              icon={category.icon}
            />
          ))}
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-app-yellow flex items-center justify-center mr-4">
              <Zap className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-app-dark">Happening now</h2>
              <p className="text-app-text-light">Take the stress out of tax season!</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {taxModules.map(module => (
              <div key={module.id} className="bg-white rounded-xl p-3 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                      <Zap className="text-app-yellow" size={16} />
                    </div>
                    <div>
                      <h3 className="font-medium text-app-dark">{module.title}</h3>
                      <div className="flex items-center text-xs text-app-text-light">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {module.timeEstimate} min
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center mb-1">
                      <span className="w-4 h-4 bg-app-yellow rounded-full flex items-center justify-center mr-1">
                        <span className="text-[10px] text-app-dark">¢</span>
                      </span>
                      <span className="text-sm text-app-dark font-medium">{module.coins}+</span>
                    </div>
                    <div className="flex items-center text-xs text-app-text-light">
                      <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {module.participants?.toLocaleString() || 0}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Explore;
