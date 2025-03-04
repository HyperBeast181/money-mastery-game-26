
import { FC, useState, useEffect } from 'react';
import { Module, Lesson } from '../types';
import * as LucideIcons from 'lucide-react';
import { LucideIcon, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import ProgressTracker from './ProgressTracker';
import LessonView from './LessonView';
import { useToast } from '@/hooks/use-toast';
import { getLessonsForModule, updateModuleProgress } from '../services/supabaseService';

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
  onUpdateProgress: (moduleId: string, newProgress: number) => void;
}

const ModuleDetail: FC<ModuleDetailProps> = ({ module, onBack, onUpdateProgress }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>(
    module.lessons?.filter(lesson => lesson.completed).map(lesson => lesson.id) || []
  );
  const [lessons, setLessons] = useState<Lesson[]>(module.lessons || []);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  const Icon = LucideIcons[module.icon as keyof typeof LucideIcons] as LucideIcon;
  
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsData = await getLessonsForModule(module.id);
        
        // Обновляем статус завершенных уроков на основе completedLessons
        const updatedLessons = lessonsData.map(lesson => ({
          ...lesson,
          completed: completedLessons.includes(lesson.id)
        }));
        
        setLessons(updatedLessons);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке уроков:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить уроки модуля',
          variant: 'destructive'
        });
        setLoading(false);
      }
    };

    fetchLessons();
  }, [module.id, completedLessons, toast]);
  
  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };
  
  const handleLessonComplete = async (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(newCompletedLessons);
      
      // Обновляем lessons с новым статусом completed
      setLessons(prevLessons => 
        prevLessons.map(lesson => 
          lesson.id === lessonId 
            ? { ...lesson, completed: true } 
            : lesson
        )
      );
      
      // Рассчитываем новый процент прогресса
      const totalLessons = lessons.length || 1;
      const newProgress = Math.round((newCompletedLessons.length / totalLessons) * 100);
      
      // Обновляем прогресс модуля
      try {
        const status = newProgress === 100 ? 'завершено' : 'в процессе';
        await updateModuleProgress(module.id, newProgress, status);
        onUpdateProgress(module.id, newProgress);
        
        toast({
          title: 'Урок завершен!',
          description: `Вы заработали ${Math.round(module.coins / module.totalParts)} монет за этот урок.`,
          variant: 'default',
        });
      } catch (error) {
        console.error('Ошибка при обновлении прогресса:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить прогресс',
          variant: 'destructive'
        });
      }
    }
  };
  
  const handleBack = () => {
    setSelectedLesson(null);
    onBack();
  };
  
  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };
  
  if (selectedLesson) {
    return (
      <LessonView 
        lesson={selectedLesson} 
        onComplete={handleLessonComplete} 
        onBack={() => setSelectedLesson(null)} 
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm animate-scale-in">
      <button 
        onClick={handleBack}
        className="flex items-center text-app-blue mb-4 font-medium"
      >
        <ChevronRight size={20} className="rotate-180" /> Назад
      </button>
      
      <div className="flex items-center mb-4">
        {Icon && (
          <div className="w-12 h-12 rounded-full bg-app-light-blue flex items-center justify-center mr-4">
            <Icon size={24} className="text-app-blue" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-app-dark">{module.title}</h2>
          <p className="text-app-text-light">
            {module.currentPart} из {module.totalParts} частей • {module.timeEstimate} мин
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-app-text-light">Ваш прогресс</span>
          <span className="font-medium">{module.progress}%</span>
        </div>
        <ProgressTracker progress={module.progress} colorClass="bg-app-blue" height="h-2" />
      </div>
      
      {module.description && (
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-app-text-light">{module.description}</p>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="font-semibold text-app-dark mb-3">Уроки</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <Loader2 size={24} className="animate-spin mx-auto text-app-blue mb-2" />
            <p className="text-app-text-light">Загрузка уроков...</p>
          </div>
        ) : lessons.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-app-text-light">Уроки для этого модуля еще не добавлены</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                className={`w-full flex items-center justify-between p-4 rounded-xl border ${
                  isLessonCompleted(lesson.id) 
                  ? 'border-green-100 bg-green-50' 
                  : index === 0 || isLessonCompleted(lessons[index - 1]?.id || '')
                  ? 'border-gray-200 hover:border-app-blue' 
                  : 'border-gray-200 opacity-60'
                }`}
                onClick={() => {
                  if (index === 0 || isLessonCompleted(lessons[index - 1]?.id || '')) {
                    handleLessonClick(lesson);
                  } else {
                    toast({
                      title: "Урок заблокирован",
                      description: "Сначала нужно завершить предыдущие уроки!",
                      variant: "destructive",
                    });
                  }
                }}
                disabled={!(index === 0 || isLessonCompleted(lessons[index - 1]?.id || ''))}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${isLessonCompleted(lesson.id) ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
                    {isLessonCompleted(lesson.id) ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <span className="text-app-text-light">{index + 1}</span>
                    )}
                  </div>
                  <span className={`${isLessonCompleted(lesson.id) ? 'text-green-600' : 'text-app-dark'}`}>
                    {lesson.title}
                  </span>
                </div>
                <ChevronRight size={20} className="text-app-text-light" />
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex items-center bg-app-light-blue p-4 rounded-xl">
        <div className="w-10 h-10 bg-app-blue rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-medium">{module.coins}</span>
        </div>
        <div>
          <p className="font-medium text-app-dark">Завершите все уроки</p>
          <p className="text-sm text-app-text-light">Заработайте {module.coins} монет за выполнение этого модуля</p>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
