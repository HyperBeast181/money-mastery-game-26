
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import CategoryButton from '../components/CategoryButton';
import FeatureTip from '../components/FeatureTip';
import LearningModule from '../components/LearningModule';
import { supabase } from '../integrations/supabase/client';
import { Category, Module, ModuleStatus } from '../types';
import { currentUser } from '../data/modules';
import { useToast } from '@/hooks/use-toast';

const Explore: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredModules, setFeaturedModules] = useState<Module[]>([]);
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

        setCategories(categoriesData || []);
        setFeaturedModules(modulesData.map(module => ({
          ...module,
          status: (module.status || 'не начат') as ModuleStatus,
          progress: module.progress || 0,
          currentPart: module.current_part || 0,
          totalParts: module.total_parts || 1,
          timeEstimate: module.time_estimate || 5,
          participants: module.participants || 0
        })));
        
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
              category={category}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>
        
        <h2 className="text-lg font-semibold text-app-dark mb-3">Происходит сейчас</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <FeatureTip 
            title="Ежедневная викторина"
            description="Проверьте свои знания и заработайте монеты!"
            buttonText="Участвовать"
            onClick={() => navigate('/community')}
            icon="🎯"
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
