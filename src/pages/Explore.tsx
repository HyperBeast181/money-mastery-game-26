
import { FC, useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import CategoryButton from '../components/CategoryButton';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Module, Category } from '../types';
import { currentUser } from '../data/modules';
import { Zap, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Explore: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingModules, setTrendingModules] = useState<Module[]>([]);
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
        
        // Получаем популярные модули (с наибольшим числом участников)
        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('*')
          .order('participants', { ascending: false })
          .limit(5);
          
        if (modulesError) throw modulesError;
        
        setCategories(categoriesData || []);
        setTrendingModules(modulesData.map(module => ({
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
        console.error('Ошибка при загрузке данных:', error);
        toast({
          title: 'Ошибка загрузки',
          description: 'Не удалось загрузить данные категорий',
          variant: 'destructive'
        });
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={currentUser} title="Обзор" />
      
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 size={40} className="text-app-blue animate-spin" />
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-app-dark mb-3">Категории</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {categories.slice(0, 8).map(category => (
                <CategoryButton
                  key={category.id}
                  title={category.title}
                  icon={category.icon}
                  onClick={() => handleCategoryClick(category.id)}
                />
              ))}
            </div>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-app-yellow flex items-center justify-center mr-4">
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-app-dark">Происходит сейчас</h2>
                  <p className="text-app-text-light">Актуальные темы и курсы</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {trendingModules.map(module => (
                  <div 
                    key={module.id} 
                    className="bg-white rounded-xl p-3 border border-gray-100 hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/module/${module.id}`)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                          <Zap className="text-app-yellow" size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium text-app-dark">{module.title}</h3>
                          <div className="flex items-center text-xs text-app-text-light">
                            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            {module.timeEstimate} мин
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="flex items-center mb-1">
                          <span className="w-4 h-4 bg-app-yellow rounded-full flex items-center justify-center mr-1">
                            <span className="text-[10px] text-app-dark">¢</span>
                          </span>
                          <span className="text-sm text-app-dark font-medium">{module.coins}+</span>
                        </div>
                        <div className="flex items-center text-xs text-app-text-light">
                          <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {module.participants?.toLocaleString() || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default Explore;
