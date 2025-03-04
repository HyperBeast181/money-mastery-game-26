
import React, { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import ProgressTracker from '../components/ProgressTracker';
import CategoryButton from '../components/CategoryButton';
import { ChevronRight, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { currentUser } from '../data/modules';
import { Module, Category } from '../types';
import { getModules, getCategories } from '../services/supabaseService';
import SkillCard from '../components/SkillCard';
import { useToast } from '@/hooks/use-toast';

interface ModuleCardProps {
  module: Module;
  onClick: () => void;
}

const ModuleCard: FC<ModuleCardProps> = ({ module, onClick }) => {
  // Получаем компонент иконки из lucide-react если он существует
  const IconComponent = module.icon && (LucideIcons as any)[module.icon as string] as LucideIcon;
  
  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-app-blue transition-all hover-scale"
      onClick={onClick}
    >
      <div className="flex items-center mb-2">
        {IconComponent && (
          <div className="w-8 h-8 rounded-full bg-app-light-blue flex items-center justify-center mr-2">
            <IconComponent size={16} className="text-app-blue" />
          </div>
        )}
        <h3 className="font-semibold text-app-dark">{module.title}</h3>
      </div>
      
      <div className="flex justify-between items-center text-xs text-app-text-light mb-2">
        <span>{module.timeEstimate} мин</span>
        <span>{module.progress}%</span>
      </div>
      
      <ProgressTracker progress={module.progress} />
    </div>
  );
};

const Index: FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recommendedModules, setRecommendedModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modulesData, categoriesData] = await Promise.all([
          getModules(),
          getCategories()
        ]);
        
        setModules(modulesData);
        
        // Фильтруем рекомендуемые модули (в данном случае берем первые 4)
        setRecommendedModules(modulesData.slice(0, 4));
        
        // Ограничиваем категории до 4 для отображения
        setCategories(categoriesData.slice(0, 4));
        
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить данные. Пожалуйста, попробуйте позже.',
          variant: 'destructive'
        });
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  // Находим текущий модуль (в процессе)
  const activeModule = modules.find(module => module.status === 'в процессе');
  // Или берем первый если нет активного
  const currentModule = activeModule || (modules.length > 0 ? modules[0] : null);
  
  // Получаем завершенные модули
  const completedModules = modules.filter(module => module.status === 'завершено');
  
  // Получаем модули для "Больше для вас" (не завершенные и не активные)
  const moreForYouModules = modules
    .filter(module => module.status !== 'завершено' && module.id !== currentModule?.id)
    .slice(0, 3);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={currentUser} />
      
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-app-dark mb-1">Привет, {currentUser.name.split(' ')[0]}</h1>
          <p className="text-app-text-light">Продолжайте развивать финансовые навыки!</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-app-blue"></div>
          </div>
        ) : (
          <>
            {currentModule && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold text-app-dark">Продолжить обучение</h2>
                  <Link to="/learning-path" className="text-app-blue flex items-center text-sm font-medium">
                    Все <ChevronRight size={16} />
                  </Link>
                </div>
                
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover-scale">
                  <div className="flex items-center mb-3">
                    {currentModule.icon && (LucideIcons as any)[currentModule.icon as string] && (
                      <div className="w-10 h-10 rounded-full bg-app-light-blue flex items-center justify-center mr-3">
                        {React.createElement((LucideIcons as any)[currentModule.icon as string], { 
                          size: 20, 
                          className: 'text-app-blue' 
                        })}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-app-dark">{currentModule.title}</h3>
                      <p className="text-sm text-app-text-light">
                        Модуль {currentModule.currentPart} из {currentModule.totalParts} • {currentModule.progress}% выполнено
                      </p>
                    </div>
                  </div>
                  
                  <ProgressTracker progress={currentModule.progress} />
                  
                  <div className="mt-4">
                    <button 
                      onClick={() => navigate(`/module/${currentModule.id}`)}
                      className="w-full bg-app-blue text-white font-medium py-3 rounded-full"
                    >
                      {currentModule.status === 'в процессе' ? 'Продолжить' : 'Начать'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-app-dark">Категории</h2>
                <Link to="/explore" className="text-app-blue flex items-center text-sm font-medium">
                  Все <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {categories.map(category => (
                  <CategoryButton 
                    key={category.id}
                    icon={category.icon}
                    title={category.title} 
                    onClick={() => navigate('/explore')}
                  />
                ))}
              </div>
            </div>
            
            {recommendedModules.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold text-app-dark">Рекомендуемые</h2>
                  <Link to="/learning-path" className="text-app-blue flex items-center text-sm font-medium">
                    Все <ChevronRight size={16} />
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {recommendedModules.map(module => (
                    <ModuleCard 
                      key={module.id} 
                      module={module} 
                      onClick={() => navigate(`/module/${module.id}`)} 
                    />
                  ))}
                </div>
              </div>
            )}
            
            {moreForYouModules.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold text-app-dark">Больше для вас</h2>
                  <Link to="/explore" className="text-app-blue flex items-center text-sm font-medium">
                    Все <ChevronRight size={16} />
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {moreForYouModules.map(module => (
                    <SkillCard 
                      key={module.id}
                      module={module}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {completedModules.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold text-app-dark">Завершенные ({completedModules.length})</h2>
                  <Link to="/learning-path" className="text-app-blue flex items-center text-sm font-medium">
                    Все <ChevronRight size={16} />
                  </Link>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-app-text-light mb-2">
                    Вы успешно завершили {completedModules.length} {completedModules.length === 1 ? 'модуль' : 
                    completedModules.length < 5 ? 'модуля' : 'модулей'}!
                  </p>
                  <button 
                    onClick={() => navigate('/learning-path')}
                    className="w-full bg-app-light-blue text-app-blue font-medium py-2 rounded-full text-sm"
                  >
                    Посмотреть завершенные
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default Index;
