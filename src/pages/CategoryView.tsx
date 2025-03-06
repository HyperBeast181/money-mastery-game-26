
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import LearningModule from '../components/LearningModule';
import { Module, Category, ModuleStatus } from '../types';
import { currentUser } from '../data/modules';
import { useToast } from '../hooks/use-toast';
import { getModulesByCategory } from '../services';

const CategoryView: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategoryAndModules = async () => {
      try {
        if (!categoryId) return;

        // Запрашиваем информацию о категории
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('*')
          .eq('id', categoryId)
          .single();

        if (categoryError) throw categoryError;
        
        // Получаем модули этой категории используя функцию getModulesByCategory
        const modulesData = await getModulesByCategory(categoryId);
        
        setCategory(categoryData as Category);
        setModules(modulesData);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить данные категории',
          variant: 'destructive'
        });
        setLoading(false);
      }
    };

    fetchCategoryAndModules();
  }, [categoryId, toast]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar 
        user={currentUser} 
        showBackButton={true} 
        onBackClick={handleBack}
        title={category?.title}
      />
      
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-gray-400">Загрузка...</div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-app-dark">{category?.title}</h1>
              {category && 'description' in category && (
                <p className="text-gray-600">{(category as any).description}</p>
              )}
            </div>
            
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-app-dark mb-3">Модули</h2>
              {modules.length > 0 ? (
                modules.map((module, index) => (
                  <LearningModule 
                    key={module.id}
                    module={module}
                    index={index + 1}
                  />
                ))
              ) : (
                <div className="bg-white rounded-lg p-4 text-center text-gray-500">
                  В этой категории пока нет модулей
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default CategoryView;
