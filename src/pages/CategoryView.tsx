
import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import LearningModule from '../components/LearningModule';
import { supabase } from '../integrations/supabase/client';
import { Module, Category } from '../types';
import { currentUser } from '../data/modules';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CategoryView: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!categoryId) {
        navigate('/explore');
        return;
      }
      
      try {
        // Получаем данные категории
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('*')
          .eq('id', categoryId)
          .single();
          
        if (categoryError || !categoryData) {
          throw new Error('Категория не найдена');
        }
        
        // Получаем модули для категории
        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('*')
          .eq('category_id', categoryId)
          .order('order_index');
          
        if (modulesError) {
          throw modulesError;
        }
        
        setCategory(categoryData);
        setModules(modulesData.map(module => ({
          ...module,
          status: module.status || 'не начат',
          progress: module.progress || 0,
          currentPart: module.current_part || 0,
          totalParts: module.total_parts || 1,
          timeEstimate: module.time_estimate || 5,
          participants: module.participants || 0
        })) || []);
        
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных категории:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить данные категории',
          variant: 'destructive'
        });
        navigate('/explore');
      }
    };
    
    fetchData();
  }, [categoryId, navigate, toast]);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar 
        user={currentUser} 
        showBackButton 
        onBackClick={() => navigate('/explore')}
      />
      
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 size={40} className="text-app-blue animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex items-center mb-4">
              <button onClick={() => navigate('/explore')} className="mr-2">
                <ChevronLeft size={24} className="text-app-dark" />
              </button>
              <h1 className="text-2xl font-bold text-app-dark">{category?.title}</h1>
            </div>
            
            {modules.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <p className="text-app-text-light">В этой категории пока нет модулей</p>
              </div>
            ) : (
              <div>
                {modules.map((module, index) => (
                  <LearningModule 
                    key={module.id} 
                    module={module} 
                    index={index + 1} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default CategoryView;
