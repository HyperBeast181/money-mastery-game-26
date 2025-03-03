
import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modules as allModules, currentUser } from '../data/modules';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import ModuleDetail from '../components/ModuleDetail';
import AchievementNotification from '../components/AchievementNotification';
import { Module } from '../types';
import { useToast } from '@/hooks/use-toast';

const ModuleView: FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (moduleId) {
      const foundModule = allModules.find(m => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
      } else {
        navigate('/learning-path');
        toast({
          title: "Модуль не найден",
          description: "Запрашиваемый модуль не существует.",
          variant: "destructive",
        });
      }
    }
  }, [moduleId, navigate, toast]);
  
  const handleUpdateProgress = (moduleId: string, newProgress: number) => {
    setModule(prevModule => {
      if (prevModule) {
        const wasCompleted = prevModule.status === 'completed';
        const newStatus = newProgress === 100 ? 'completed' : 'in-progress';
        
        // Check if module was just completed
        if (newStatus === 'completed' && !wasCompleted) {
          setShowAchievement(true);
        }
        
        return {
          ...prevModule,
          progress: newProgress,
          status: newStatus
        };
      }
      return prevModule;
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={currentUser} showBackButton />
      
      {showAchievement && module && (
        <AchievementNotification
          id={`module-complete-${module.id}`}
          title={`${module.title} завершен!`}
          description="Вы освоили эту тему! Продолжайте учиться дальше."
          coins={module.coins}
          onDismiss={() => setShowAchievement(false)}
        />
      )}
      
      <div className="p-4">
        {module && (
          <ModuleDetail 
            module={module} 
            onBack={() => navigate('/learning-path')}
            onUpdateProgress={handleUpdateProgress}
          />
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default ModuleView;
