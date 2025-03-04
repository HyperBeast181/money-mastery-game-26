
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import CategoryButton from '../components/CategoryButton';
import FeatureTip from '../components/FeatureTip';
import LearningModule from '../components/LearningModule';
import { supabase } from '../integrations/supabase/client';
import { ModuleStatus } from '../types';
import { currentUser } from '../data/modules';
import { useToast } from '../hooks/use-toast';

interface SimplifiedCategory {
  id: string;
  title: string;
  icon: string;
  color?: string;
  total_skills?: number;
  total_modules?: number;
}

// Define a completely standalone type without any references to other types
interface SimplifiedModule {
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

const Explore: React.FC = () => {
  const [categories, setCategories] = useState<SimplifiedCategory[]>([]);
  const [featuredModules, setFeaturedModules] = useState<SimplifiedModule[]>([]);
  const [loading, setLoading] = useState(true);
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

        // Получаем избранные модули
        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('*')
          .eq('featured', true)
          .limit(5);

        if (modulesError) throw modulesError;

        // Transform category data to match the expected format
        const simplifiedCategories = categoriesData?.map(category => ({
          id: category.id,
          title: category.title,
          icon: category.icon,
          color: 'bg-app-light-blue', // Добавляем цвет по умолчанию
          total_skills: category.total_skills,
          total_modules: category.total_modules
        })) || [];

        // Transform module data to match the expected format
        // Explicitly type as SimplifiedModule[] to avoid recursive typing issues
        const formattedModules = modulesData?.map(module => {
          const simplifiedModule: SimplifiedModule = {
            id: module.id,
            title: module.title,
            icon: module.icon,
            category: module.category,
            coins: module.coins || 0,
            status: (module.status || 'не начат') as ModuleStatus,
            progress: module.progress || 0,
            currentPart: module.current_part || 0,
            totalParts: module.total_parts || 1,
            timeEstimate: module.time_estimate || 5,
            participants: module.participants || 0
          };
          return simplifiedModule;
        }) || [];
        
        setCategories(simplifiedCategories);
        setFeaturedModules(formattedModules);
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={currentUser} />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold text-app-dark mb-6">Исследуйте навыки</h1>
        
        <h2 className="text-lg font-semibold text-app-dark mb-3">Категории</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((category) => (
            <CategoryButton 
              key={category.id}
              title={category.title}
              icon={category.icon}
              color={category.color}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>
        
        <h2 className="text-lg font-semibold text-app-dark mb-3">Происходит сейчас</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <FeatureTip 
            id="daily-quiz"
            title="Ежедневная викторина"
            description="Проверьте свои знания и заработайте монеты!"
            onClick={() => navigate('/community')}
          />
        </div>
        
        <h2 className="text-lg font-semibold text-app-dark mb-3">Популярные модули</h2>
        <div>
          {featuredModules.map((module, index) => (
            <LearningModule 
              key={module.id}
              module={module}
              index={index + 1}
            />
          ))}
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Explore;
