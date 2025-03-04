
import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { currentUser } from '../data/modules';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import ModuleDetail from '../components/ModuleDetail';
import AchievementNotification from '../components/AchievementNotification';
import { Module, ModuleStatus } from '../types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '../integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const ModuleView: FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchModule = async () => {
      if (!moduleId) {
        navigate('/learning-path');
        return;
      }
      
      try {
        // Получаем данные модуля
        const { data: moduleData, error: moduleError } = await supabase
          .from('modules')
          .select('*')
          .eq('id', moduleId)
          .single();
        
        if (moduleError || !moduleData) {
          navigate('/learning-path');
          toast({
            title: "Модуль не найден",
            description: "Запрашиваемый модуль не существует.",
            variant: "destructive",
          });
          return;
        }
        
        // Проверяем прогресс пользователя для этого модуля
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: userModule, error: userModuleError } = await supabase
            .from('user_modules')
            .select('*')
            .eq('user_id', user.id)
            .eq('module_id', moduleId)
            .single();
          
          if (!userModuleError && userModule) {
            // У пользователя есть запись прогресса для этого модуля
            moduleData.progress = userModule.progress || 0;
            moduleData.status = userModule.status as ModuleStatus;
          }
        }
        
        // Преобразуем данные в формат Module
        const formattedModule: Module = {
          ...moduleData,
          status: moduleData.status as ModuleStatus,
          progress: moduleData.progress || 0,
          currentPart: moduleData.current_part || 0,
          totalParts: moduleData.total_parts || 1,
          timeEstimate: moduleData.time_estimate || 5,
          participants: moduleData.participants || 0
        };
        
        setModule(formattedModule);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке модуля:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить данные модуля.",
          variant: "destructive",
        });
        navigate('/learning-path');
      }
    };
    
    fetchModule();
  }, [moduleId, navigate, toast]);
  
  const handleUpdateProgress = (moduleId: string, newProgress: number) => {
    setModule(prevModule => {
      if (prevModule) {
        const wasCompleted = prevModule.status === 'завершено';
        const newStatus: ModuleStatus = newProgress === 100 ? 'завершено' : 'в процессе';
        
        // Check if module was just completed
        if (newStatus === 'завершено' && !wasCompleted) {
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
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm">
            <Loader2 size={40} className="text-app-blue animate-spin mb-4" />
            <p className="text-app-text-light">Загрузка модуля...</p>
          </div>
        ) : module ? (
          <ModuleDetail 
            module={module} 
            onBack={() => navigate('/learning-path')}
            onUpdateProgress={handleUpdateProgress}
          />
        ) : (
          <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
            <p className="text-app-text-light">Модуль не найден</p>
          </div>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default ModuleView;
