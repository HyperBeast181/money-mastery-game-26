import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Module, Lesson } from '../types';
import LessonView from './LessonView';
import { getLessonsForModule, completeLesson, updateModuleProgress } from '../services/supabaseService';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
  onUpdateProgress: (moduleId: string, newProgress: number) => void;
}

const ModuleDetail: FC<ModuleDetailProps> = ({ module, onBack, onUpdateProgress }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const fetchedLessons = await getLessonsForModule(module.id);
        setLessons(fetchedLessons);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке уроков:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить уроки для этого модуля.",
          variant: "destructive",
        });
        navigate('/learning-path');
      }
    };
    
    fetchLessons();
  }, [module.id, navigate, toast]);
  
  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };
  
  const handleLessonComplete = async (lessonId: string) => {
    try {
      // Отмечаем урок как выполненный в базе данных
      const success = await completeLesson(module.id, lessonId);
      
      if (success) {
        // Обновляем состояние уроков, чтобы отразить завершенный урок
        setLessons(prevLessons =>
          prevLessons.map(lesson =>
            lesson.id === lessonId ? { ...lesson, completed: true } : lesson
          )
        );
        
        // Обновляем прогресс модуля
        const completedLessons = lessons.filter(lesson => lesson.completed || lesson.id === lessonId).length;
        const newProgress = Math.round((completedLessons / lessons.length) * 100);
        
        // Обновляем прогресс в базе данных
        const updateSuccess = await updateModuleProgress(module.id, newProgress, newProgress === 100 ? 'завершено' : 'в процессе');
        
        if (updateSuccess) {
          onUpdateProgress(module.id, newProgress);
        } else {
          toast({
            title: "Ошибка",
            description: "Не удалось обновить прогресс модуля.",
            variant: "destructive",
          });
        }
        
        setCurrentLesson(null); // Возвращаемся к списку уроков
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось отметить урок как выполненный.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Ошибка при завершении урока:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось завершить урок.",
        variant: "destructive",
      });
    }
  };
  
  const handleBackToModule = () => {
    setCurrentLesson(null);
  };
  
  return (
    <div>
      {currentLesson ? (
        <LessonView 
          lesson={currentLesson} 
          onComplete={handleLessonComplete}
          onBack={handleBackToModule}
        />
      ) : (
        <div className="p-6">
          <button 
            onClick={onBack}
            className="flex items-center text-app-blue mb-4 font-medium"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 19L7 12.5L15.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Назад
          </button>
          
          <h2 className="text-2xl font-bold text-app-dark mb-4">{module.title}</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <Loader2 size={32} className="text-app-blue animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {lessons.map(lesson => (
                <div 
                  key={lesson.id}
                  className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleLessonClick(lesson)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-app-dark">{lesson.title}</h3>
                    {lesson.completed && (
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12.5L9 16.5L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleDetail;
