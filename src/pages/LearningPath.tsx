
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import CategoryButton from '../components/CategoryButton';
import LearningModule from '../components/LearningModule';
import TutorialOverlay from '../components/TutorialOverlay';
import { supabase } from '../integrations/supabase/client';
import { currentUser } from '../data'; 
import { useToast } from '../hooks/use-toast';
import { Loader2, Filter, PenLine } from 'lucide-react';

// Define simplified types to avoid circular references
interface Category {
  id: string;
  title: string;
  icon: string;
  color?: string;
  total_skills?: number;
  total_modules?: number;
}

interface Module {
  id: string;
  title: string;
  icon: string;
  category: string;
  category_id?: string;
  coins: number;
  progress: number;
  totalParts: number;
  currentPart: number;
  timeEstimate: number;
  participants?: number;
  status: 'не начат' | 'в процессе' | 'завершено' | 'заблокировано';
  description?: string;
}

const LearningPath: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularModules, setPopularModules] = useState<Module[]>([]);
  const [currentModules, setCurrentModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'skills' | 'completed'>('skills');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем категории
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('title');

        if (categoriesError) throw categoriesError;

        // Получаем популярные модули
        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('*')
          .order('participants', { ascending: false })
          .limit(3);

        if (modulesError) throw modulesError;
        
        // Получаем текущие активные модули для блока "Происходит сейчас"
        const { data: currentModulesData, error: currentModulesError } = await supabase
          .from('modules')
          .select('*')
          .eq('status', 'в процессе')
          .order('participants', { ascending: false })
          .limit(3);
          
        if (currentModulesError) throw currentModulesError;

        // Transform category data to match the expected format
        const simplifiedCategories: Category[] = categoriesData?.map(category => ({
          id: category.id,
          title: category.title,
          icon: category.icon,
          color: 'bg-app-light-blue',
          total_skills: category.total_skills,
          total_modules: category.total_modules
        })) || [];

        // Transform module data to match the expected format with explicit typing
        const simplifiedModules: Module[] = modulesData?.map(module => {
          const statusValue = (module.status || 'не начат') as 'не начат' | 'в процессе' | 'завершено' | 'заблокировано';
          
          return {
            id: module.id,
            title: module.title,
            icon: module.icon,
            category: module.category,
            category_id: module.category_id,
            coins: module.coins || 0,
            status: statusValue,
            progress: module.progress || 0,
            currentPart: module.current_part || 0,
            totalParts: module.total_parts || 1,
            timeEstimate: module.time_estimate || 5,
            participants: module.participants || 0,
            description: module.description
          };
        }) || [];
        
        // Transform current modules data
        const currentModulesList: Module[] = currentModulesData?.map(module => {
          const statusValue = (module.status || 'не начат') as 'не начат' | 'в процессе' | 'завершено' | 'заблокировано';
          
          return {
            id: module.id,
            title: module.title,
            icon: module.icon,
            category: module.category,
            category_id: module.category_id,
            coins: module.coins || 0,
            status: statusValue,
            progress: module.progress || 0,
            currentPart: module.current_part || 0,
            totalParts: module.total_parts || 1,
            timeEstimate: module.time_estimate || 5,
            participants: module.participants || 0,
            description: module.description
          };
        }) || [];
        
        setCategories(simplifiedCategories);
        setPopularModules(simplifiedModules);
        setCurrentModules(currentModulesList);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить данные',
          variant: 'destructive'
        });
      }
    };

    fetchData();
  }, [toast]);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleModuleClick = (moduleId: string) => {
    navigate(`/module/${moduleId}`);
  };

  const filterModulesByTab = (modules: Module[]) => {
    return modules.filter(module => 
      activeTab === 'skills' || (activeTab === 'completed' && module.status === 'завершено')
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={currentUser} />
      <TutorialOverlay pageId="learningPath" />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-app-dark">Обучение</h1>
          
          <div className="flex space-x-2">
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Filter size={18} className="text-app-dark" />
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <PenLine size={18} className="text-app-dark" />
            </button>
          </div>
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
        
        <h2 className="text-xl font-bold text-app-dark mb-3">Категории</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((category) => (
            <CategoryButton 
              key={category.id}
              id={category.id}
              title={category.title}
              icon={category.icon}
              color={category.color}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>
        
        {currentModules.length > 0 && filterModulesByTab(currentModules).length > 0 && (
          <>
            <h2 className="text-xl font-bold text-app-dark mb-3">Происходит сейчас</h2>
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 shadow-sm mb-6">
              <div className="space-y-3">
                {filterModulesByTab(currentModules).map((module) => (
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
        )}
        
        <h2 className="text-xl font-bold text-app-dark mb-3">Популярные модули</h2>
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 size={24} className="text-app-blue animate-spin" />
          </div>
        ) : filterModulesByTab(popularModules).length === 0 ? (
          <div className="text-center p-8">
            <p className="text-app-text-light">
              {activeTab === 'completed' 
                ? 'У вас пока нет завершенных модулей'
                : 'Модулей не найдено'}
            </p>
          </div>
        ) : (
          filterModulesByTab(popularModules).map((module, index) => (
            <LearningModule 
              key={module.id}
              module={module}
              index={index + 1}
            />
          ))
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default LearningPath;
