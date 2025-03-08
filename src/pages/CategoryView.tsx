
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { Module, Category } from '../types';
import { currentUser } from '../data';
import { useToast } from '../hooks/use-toast';
import CategoryHeader from '../components/category/CategoryHeader';
import ModuleList from '../components/category/ModuleList';

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
        
        // Получаем модули этой категории
        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('*')
          .eq('category_id', categoryId)
          .order('order_index');
        
        if (modulesError) throw modulesError;
        
        // Transform module data to match the expected format
        const transformedModules: Module[] = modulesData?.map(module => ({
          id: module.id,
          title: module.title,
          icon: module.icon,
          category: module.category,
          category_id: module.category_id,
          coins: module.coins || 0,
          progress: module.progress || 0,
          currentPart: module.current_part || 0,
          totalParts: module.total_parts || 1,
          timeEstimate: module.time_estimate || 5,
          participants: module.participants || 0,
          status: (module.status || 'не начат') as 'не начат' | 'в процессе' | 'завершено' | 'заблокировано',
          description: module.description || ''
        })) || [];
        
        setCategory(categoryData as Category);
        setModules(transformedModules);
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
        <CategoryHeader category={category} loading={loading} />
        <ModuleList modules={modules} loading={loading} />
      </div>
      
      <NavBar />
    </div>
  );
};

export default CategoryView;
