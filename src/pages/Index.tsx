
import React, { FC, useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { Module, Category } from '../types';
import { getModules, getCategories } from '../services';
import { currentUser } from '../data'; // Updated import path
import { useToast } from '@/hooks/use-toast';
import ContinueLearning from '../components/home/ContinueLearning';
import CategoriesSection from '../components/home/CategoriesSection';
import RecommendedModules from '../components/home/RecommendedModules';
import MoreForYou from '../components/home/MoreForYou';
import CompletedModules from '../components/home/CompletedModules';

const Index: FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recommendedModules, setRecommendedModules] = useState<Module[]>([]);
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
        
        // Filter recommended modules (take first 4)
        setRecommendedModules(modulesData.slice(0, 4));
        
        // Limit categories to 4 for display
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
  
  // Find current module (in progress)
  const activeModule = modules.find(module => module.status === 'в процессе');
  // Or take the first one if no active
  const currentModule = activeModule || (modules.length > 0 ? modules[0] : null);
  
  // Get completed modules
  const completedModules = modules.filter(module => module.status === 'завершено');
  
  // Get modules for "More For You" (not completed and not active)
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
            <ContinueLearning currentModule={currentModule} />
            <CategoriesSection categories={categories} />
            <RecommendedModules modules={recommendedModules} />
            <MoreForYou modules={moreForYouModules} />
            <CompletedModules modules={completedModules} />
          </>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default Index;
