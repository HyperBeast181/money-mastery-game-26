
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SkillCard from '../SkillCard';
import { Module } from '../../types';

interface MoreForYouProps {
  modules: Module[];
}

const MoreForYou: FC<MoreForYouProps> = ({ modules }) => {
  if (modules.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-app-dark">Больше для вас</h2>
        <Link to="/explore" className="text-app-blue flex items-center text-sm font-medium">
          Все <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="space-y-3">
        {modules.map(module => (
          <SkillCard 
            key={module.id}
            module={module}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreForYou;
