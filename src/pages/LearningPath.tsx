
import { FC, useState } from 'react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import LearningModule from '../components/LearningModule';
import TutorialOverlay from '../components/TutorialOverlay';
import { modules, currentUser } from '../data/modules';
import { PenLine } from 'lucide-react';

const LearningPath: FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'completed'>('skills');
  
  const activeModules = modules.filter(module => 
    activeTab === 'skills' || (activeTab === 'completed' && module.status === 'completed')
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={currentUser} />
      
      <TutorialOverlay pageId="learningPath" />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-app-dark">Путь обучения</h1>
          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <PenLine size={16} className="text-app-dark" />
          </button>
        </div>
        
        <div className="bg-gray-100 p-1 rounded-full mb-6 flex">
          <button 
            className={`tab-button flex-1 ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Мои навыки
          </button>
          <button 
            className={`tab-button flex-1 ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Завершено
          </button>
        </div>
        
        <div className="space-y-2">
          {activeModules.map((module, index) => (
            <LearningModule key={module.id} module={module} index={index + 1} />
          ))}
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default LearningPath;
