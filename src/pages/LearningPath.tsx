
import { FC, useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import CategoryButton from '../components/CategoryButton';
import LearningModule from '../components/LearningModule';
import TutorialOverlay from '../components/TutorialOverlay';
import { currentUser } from '../data';
import { Filter, PenLine } from 'lucide-react';
import { getModules, getCategories, getModulesByCategory } from '../services';
import { Module, Category } from '../types';
import { useToast } from '@/hooks/use-toast';

const LearningPath: FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'completed'>('skills');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryModules, setCategoryModules] = useState<Module[]>([]);
  const [popularModules, setPopularModules] = useState<Module[]>([]);
  const [currentModules, setCurrentModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modulesData, categoriesData] = await Promise.all([
          getModules(),
          getCategories()
        ]);
        
        setCategories(categoriesData);
        
        // Get popular modules (sort by participants)
        const popular = [...modulesData].sort((a, b) => 
          (b.participants || 0) - (a.participants || 0)
        ).slice(0, 3);
        setPopularModules(popular);
        
        // Get "happening now" modules (could be modules with most recent activity)
        const happening = [...modulesData].filter(m => m.status === 'в процессе' || m.participants && m.participants > 100).slice(0, 3);
        setCurrentModules(happening);
        
        // If a category is selected, load its modules
        if (selectedCategory) {
          const modulesForCategory = await getModulesByCategory(selectedCategory);
          setCategoryModules(modulesForCategory);
        } else {
          // No category selected yet, show all modules
          setCategoryModules(modulesData);
        }
        
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
  }, [toast, selectedCategory]);

  const handleCategorySelect = (categoryId: string) => {
    // If already selected, deselect it
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
      setLoading(true);
    }
  };

  const filterModulesByStatus = (modules: Module[]) => {
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
              onClick={() => handleCategorySelect(category.id)}
              isActive={selectedCategory === category.id}
            />
          ))}
        </div>
        
        {currentModules.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-app-dark mb-3">Происходит сейчас</h2>
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 shadow-sm mb-6">
              <div className="space-y-3">
                {currentModules.map((module) => (
                  <div 
                    key={module.id}
                    className="bg-white rounded-xl p-3 border border-gray-100 hover:shadow-md hover-scale cursor-pointer"
                    onClick={() => window.location.href = `/module/${module.id}`}
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
        
        <h2 className="text-xl font-bold text-app-dark mb-3">
          {selectedCategory 
            ? categories.find(c => c.id === selectedCategory)?.title || 'Выбранная категория' 
            : 'Все модули'}
        </h2>
        
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-app-blue"></div>
          </div>
        ) : filterModulesByStatus(categoryModules).length === 0 ? (
          <div className="text-center p-8">
            <p className="text-app-text-light">
              {selectedCategory 
                ? 'В этой категории пока нет доступных модулей' 
                : activeTab === 'completed' 
                  ? 'У вас пока нет завершенных модулей'
                  : 'Модулей не найдено'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filterModulesByStatus(categoryModules).map((module, index) => (
              <LearningModule key={module.id} module={module} index={index + 1} />
            ))}
          </div>
        )}
        
        {popularModules.length > 0 && !selectedCategory && (
          <>
            <h2 className="text-xl font-bold text-app-dark mt-6 mb-3">Популярные модули</h2>
            <div className="space-y-2">
              {popularModules.map((module, index) => (
                <LearningModule key={module.id} module={module} index={index + 1} />
              ))}
            </div>
          </>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default LearningPath;
