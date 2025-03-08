
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import TutorialOverlay from '../components/TutorialOverlay';
import { supabase } from '../integrations/supabase/client';
import { currentUser } from '../data';
import { useToast } from '../hooks/use-toast';
import { Module, Category as CategoryType } from '../types';

// Import new refactored components
import Header from '../components/learning-path/Header';
import TabToggle from '../components/learning-path/TabToggle';
import CategoryList from '../components/learning-path/CategoryList';
import CurrentModules from '../components/learning-path/CurrentModules';
import PopularModules from '../components/learning-path/PopularModules';

const LearningPath: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [popularModules, setPopularModules] = useState<Module[]>([]);
  const [currentModules, setCurrentModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'skills' | 'completed'>('skills');
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
        const simplifiedCategories: CategoryType[] = categoriesData?.map(category => ({
          id: category.id,
          title: category.title,
          icon: category.icon,
          total_skills: category.total_skills || 0,
          total_modules: category.total_modules || 0
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={currentUser} />
      <TutorialOverlay pageId="learningPath" />
      
      <div className="p-4">
        <Header />
        <TabToggle activeTab={activeTab} setActiveTab={setActiveTab} />
        <CategoryList categories={categories} />
        
        {currentModules.length > 0 && (
          <CurrentModules 
            modules={currentModules} 
            activeTab={activeTab} 
          />
        )}
        
        <PopularModules 
          modules={popularModules} 
          loading={loading} 
          activeTab={activeTab} 
        />
      </div>
      
      <NavBar />
    </div>
  );
};

export default LearningPath;
