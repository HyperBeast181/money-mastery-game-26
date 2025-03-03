
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { currentUser, modules } from '../data/modules';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import SkillCard from '../components/SkillCard';
import TutorialOverlay from '../components/TutorialOverlay';
import FeatureTip from '../components/FeatureTip';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, TrendingUp, Award, BookOpen, ChevronRight } from 'lucide-react';

const Index: FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'savings' | 'insurance' | 'education'>('savings');
  const recommendedModules = modules.filter(m => 
    (activeTab === 'savings' && (m.title.includes('Money') || m.title.includes('Budget') || m.title.includes('Financial'))) ||
    (activeTab === 'insurance' && m.title.includes('Insurance')) ||
    (activeTab === 'education' && m.title.includes('College'))
  );
  
  const inProgressModules = modules.filter(m => m.status === 'in-progress');
  const completedModules = modules.filter(m => m.status === 'completed');
  
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
        title={t('welcomeTip')}
        description={t('welcomeDescription')}
      />
      
      {/* Hero Section */}
      <div className="px-4 pt-6 pb-4">
        <div className="bg-gradient-to-r from-app-blue to-indigo-600 rounded-2xl p-5 text-white mb-4 shadow-md animate-scale-in">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">{t('welcomeBack')}, {currentUser.name}!</h1>
              <p className="text-white/80 mb-3">{t('continueJourney')}</p>
              <Link to="/learning-path" className="inline-flex items-center bg-white text-app-blue px-4 py-2 rounded-full font-medium text-sm hover:bg-opacity-90 transition-colors">
                {t('viewPath')} <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles size={28} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics Section */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-app-dark mb-3">{t('yourStats')}</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-app-light-blue rounded-full flex items-center justify-center mb-2">
              <TrendingUp size={18} className="text-app-blue" />
            </div>
            <div className="text-sm text-app-text-light">{t('streak')}</div>
            <div className="text-xl font-bold text-app-dark">{currentUser.streak}{t('days')}</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
              <Award size={18} className="text-yellow-600" />
            </div>
            <div className="text-sm text-app-text-light">{t('coins')}</div>
            <div className="text-xl font-bold text-app-dark">{currentUser.coins}</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <BookOpen size={18} className="text-green-600" />
            </div>
            <div className="text-sm text-app-text-light">{t('completed')}</div>
            <div className="text-xl font-bold text-app-dark">{completedModules.length}</div>
          </div>
        </div>
      </div>
      
      {inProgressModules.length > 0 && (
        <div className="px-4 continue-learning mb-6">
          <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-app-dark mb-4">{t('continue')}</h2>
            {inProgressModules.map(module => (
              <SkillCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      )}
      
      <div className="px-4 py-2">
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
