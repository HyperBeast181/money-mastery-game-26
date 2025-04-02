import React, { FC, useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { Module, Category } from '../types';
import { getModules, getCategories } from '../services';
import { useToast } from '@/hooks/use-toast';
import ContinueLearning from '../components/home/ContinueLearning';
import CategoriesSection from '../components/home/CategoriesSection';
import RecommendedModules from '../components/home/RecommendedModules';
import MoreForYou from '../components/home/MoreForYou';
import CompletedModules from '../components/home/CompletedModules';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../integrations/supabase/client';

const Index: FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recommendedModules, setRecommendedModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { toast } = useToast();
  const { user, profile } = useAuth();
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        if (profile) {
          setUserProfile(profile);
          return;
        }
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }
        
        if (data) {
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Error in fetchProfile:', error);
      }
    };
    
    fetchProfile();
  }, [user, profile]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modulesData, categoriesData] = await Promise.all([
          getModules(),
          getCategories()
        ]);
        
        setModules(modulesData);
        
        setRecommendedModules(modulesData.slice(0, 4));
        
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
  
  const activeModule = modules.find(module => module.status === 'в процессе');
  const currentModule = activeModule || (modules.length > 0 ? modules[0] : null);
  
  const completedModules = modules.filter(module => module.status === 'завершено');
  
  const moreForYouModules = modules
    .filter(module => module.status !== 'завершено' && module.id !== currentModule?.id)
    .slice(0, 3);
  
  const userName = userProfile?.name || user?.user_metadata?.name || 'Пользователь';
  
  const userObject = userProfile ? {
    id: user?.id || '1',
    name: userName,
    avatar: userProfile.avatar || '/lovable-uploads/66657bf7-1e19-4058-b7e6-4ff8bd5847d3.png',
    coins: userProfile.coins || 0,
    xp: userProfile.xp || 0,
    streak: userProfile.streak || 0,
    hearts: userProfile.hearts || 5,
    joinedDate: new Date(userProfile.joined_date).toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }),
    completedModules: userProfile.completed_modules || 0,
    totalEarned: userProfile.total_earned || 0,
    badges: []
  } : null;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={userObject} />
      
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-app-dark mb-1">
            Привет, {userName.split(' ')[0]}
          </h1>
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
