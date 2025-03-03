
import { FC, useState } from 'react';
import { Module, Lesson } from '../types';
import * as LucideIcons from 'lucide-react';
import { LucideIcon, ChevronRight, CheckCircle } from 'lucide-react';
import ProgressTracker from './ProgressTracker';
import LessonView from './LessonView';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  const Icon = LucideIcons[module.icon as keyof typeof LucideIcons] as LucideIcon;
  
  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };
  
  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(newCompletedLessons);
      
      // Calculate new progress percentage
      const totalLessons = module.lessons?.length || 1;
      const newProgress = Math.round((newCompletedLessons.length / totalLessons) * 100);
      
      onUpdateProgress(module.id, newProgress);
      
      toast({
        title: "Lesson Completed!",
        description: `You've earned ${module.coins / module.totalParts} coins for completing this lesson.`,
        variant: "default",
      });
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
        <ChevronRight size={20} className="rotate-180" /> Back
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
            {module.currentPart} of {module.totalParts} parts • {module.timeEstimate} min
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-app-text-light">Your progress</span>
          <span className="font-medium">{module.progress}%</span>
        </div>
        <ProgressTracker progress={module.progress} colorClass="bg-app-blue" height="h-2" />
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold text-app-dark mb-3">Lessons</h3>
        <div className="space-y-3">
          {module.lessons?.map((lesson, index) => (
            <button
              key={lesson.id}
              className={`w-full flex items-center justify-between p-4 rounded-xl border ${
                isLessonCompleted(lesson.id) 
                ? 'border-green-100 bg-green-50' 
                : index === 0 || isLessonCompleted(module.lessons?.[index - 1]?.id || '')
                ? 'border-gray-200 hover:border-app-blue' 
                : 'border-gray-200 opacity-60'
              }`}
              onClick={() => {
                if (index === 0 || isLessonCompleted(module.lessons?.[index - 1]?.id || '')) {
                  handleLessonClick(lesson);
                } else {
                  toast({
                    title: "Lesson Locked",
                    description: "You need to complete the previous lessons first!",
                    variant: "destructive",
                  });
                }
              }}
              disabled={!(index === 0 || isLessonCompleted(module.lessons?.[index - 1]?.id || ''))}
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
      </div>
      
      <div className="flex items-center bg-app-light-blue p-4 rounded-xl">
        <div className="w-10 h-10 bg-app-blue rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-medium">{module.coins}</span>
        </div>
        <div>
          <p className="font-medium text-app-dark">Complete all lessons</p>
          <p className="text-sm text-app-text-light">Earn {module.coins} coins for completing this module</p>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
