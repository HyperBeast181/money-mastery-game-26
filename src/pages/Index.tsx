
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { currentUser, modules } from '../data/modules';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import SkillCard from '../components/SkillCard';
import TutorialOverlay from '../components/TutorialOverlay';
import FeatureTip from '../components/FeatureTip';
import { useLanguage } from '../context/LanguageContext';

const Index: FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'savings' | 'insurance' | 'education'>('savings');
  const recommendedModules = modules.filter(m => 
    (activeTab === 'savings' && (m.title.includes('Money') || m.title.includes('Budget') || m.title.includes('Financial'))) ||
    (activeTab === 'insurance' && m.title.includes('Insurance')) ||
    (activeTab === 'education' && m.title.includes('College'))
  );
  
  const inProgressModules = modules.filter(m => m.status === 'in-progress');
  
  // Wave animation effect for dots
  const [wave, setWave] = useState<boolean>(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWave(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={currentUser} />
      
      <TutorialOverlay pageId="home" />
      
      <FeatureTip 
        id="welcome-tip"
        title="Welcome to Financial Literacy App!"
        description="Complete lessons to earn coins and unlock rewards. Swipe through the categories to explore different financial topics."
      />
      
      {inProgressModules.length > 0 && (
        <div className="px-4 pt-4 continue-learning">
          <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm mb-4">
            <h2 className="text-xl font-bold text-app-dark mb-4">{t('continue')}</h2>
            {inProgressModules.map(module => (
              <SkillCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      )}
      
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-app-dark">{t('moreForYou')}</h2>
        </div>
        <p className="text-app-text-light mb-4">{t('basedOnInterests')}</p>
        
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <button 
            className={`px-4 py-2 rounded-full font-medium ${activeTab === 'savings' ? 'bg-app-dark text-white' : 'bg-gray-200 text-app-text-light'}`}
            onClick={() => setActiveTab('savings')}
          >
            {t('savings')}
          </button>
          <button 
            className={`px-4 py-2 rounded-full font-medium ${activeTab === 'insurance' ? 'bg-app-dark text-white' : 'bg-gray-200 text-app-text-light'}`}
            onClick={() => setActiveTab('insurance')}
          >
            {t('insurance')}
          </button>
          <button 
            className={`px-4 py-2 rounded-full font-medium ${activeTab === 'education' ? 'bg-app-dark text-white' : 'bg-gray-200 text-app-text-light'}`}
            onClick={() => setActiveTab('education')}
          >
            {t('education')}
          </button>
        </div>
        
        <div className="space-y-4 mb-8">
          {recommendedModules.map(module => (
            <SkillCard key={module.id} module={module} isDetailed />
          ))}
        </div>
        
        <div className="w-full flex justify-center">
          <div className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center wave-dots">
            <div className="flex space-x-1">
              <div className={`w-1.5 h-1.5 rounded-full bg-app-blue ${wave ? 'animate-wave' : ''}`} style={{ animationDelay: '0ms' }}></div>
              <div className={`w-1.5 h-1.5 rounded-full bg-app-blue ${wave ? 'animate-wave' : ''}`} style={{ animationDelay: '200ms' }}></div>
              <div className={`w-1.5 h-1.5 rounded-full bg-app-blue ${wave ? 'animate-wave' : ''}`} style={{ animationDelay: '400ms' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Index;
