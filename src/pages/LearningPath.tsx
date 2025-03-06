
import { FC, useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import LearningModule from '../components/LearningModule';
import TutorialOverlay from '../components/TutorialOverlay';
import { currentUser } from '../data/modules';
import { PenLine, Filter } from 'lucide-react';
import { getModules, getCategories } from '../services';
import { Module, Category } from '../types';
import CategoryFilter from '../components/CategoryFilter';
import { useToast } from '@/hooks/use-toast';

const LearningPath: FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'completed'>('skills');
  const [modules, setModules] = useState<Module[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modulesData, categoriesData] = await Promise.all([
          getModules(),
          getCategories()
        ]);
        
        setModules(modulesData);
        setCategories(categoriesData);
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

  // Фильтруем модули по выбранной категории и статусу (завершено/не завершено)
  const filteredModules = modules.filter(module => 
    (activeTab === 'skills' || (activeTab === 'completed' && module.status === 'завершено')) &&
    (selectedCategory === null || module.category_id === selectedCategory)
  );

  const toggleCategory = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={currentUser} />
      
      <TutorialOverlay pageId="learningPath" />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-app-dark">Путь обучения</h1>
          
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
        
        {categories.length > 0 && (
          <div className="mb-6 overflow-x-auto">
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory}
              onSelectCategory={toggleCategory}
            />
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-app-blue"></div>
          </div>
        ) : filteredModules.length === 0 ? (
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
            {filteredModules.map((module, index) => (
              <LearningModule key={module.id} module={module} index={index + 1} />
            ))}
          </div>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default LearningPath;
