
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  element: string;
  position: 'top' | 'right' | 'bottom' | 'left';
}

const tutorials: {
  [key: string]: TutorialStep[];
} = {
  home: [
    {
      id: 'home-intro',
      title: 'Добро пожаловать в приложение по финансовой грамотности!',
      description: 'Это приложение поможет вам изучить финансовые понятия через веселые интерактивные уроки.',
      element: 'body',
      position: 'bottom'
    },
    {
      id: 'home-continue',
      title: 'Продолжить обучение',
      description: 'Ваши незавершенные уроки появляются здесь для быстрого доступа.',
      element: '.continue-learning',
      position: 'bottom'
    },
    {
      id: 'home-navigation',
      title: 'Навигация',
      description: 'Используйте эти кнопки для навигации между разными разделами приложения.',
      element: 'nav',
      position: 'top'
    }
  ],
  learningPath: [
    {
      id: 'learning-path-intro',
      title: 'Ваш путь обучения',
      description: 'Здесь вы можете увидеть все доступные модули и отслеживать свой прогресс.',
      element: 'body',
      position: 'bottom'
    }
  ]
};

interface TutorialOverlayProps {
  pageId: string;
  onComplete?: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ pageId, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const steps = tutorials[pageId] || [];
  const currentTutorial = steps[currentStep];
  
  useEffect(() => {
    // Check if the tutorial has been seen before
    const seenTutorials = localStorage.getItem('seenTutorials') || '{}';
    const seenTutorialsObj = JSON.parse(seenTutorials);
    
    if (!seenTutorialsObj[pageId]) {
      setShowTutorial(true);
    }
  }, [pageId]);
  
  if (!showTutorial || steps.length === 0) return null;
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark this tutorial as seen
      const seenTutorials = localStorage.getItem('seenTutorials') || '{}';
      const seenTutorialsObj = JSON.parse(seenTutorials);
      seenTutorialsObj[pageId] = true;
      localStorage.setItem('seenTutorials', JSON.stringify(seenTutorialsObj));
      
      setShowTutorial(false);
      if (onComplete) onComplete();
    }
  };
  
  const handleSkip = () => {
    // Mark this tutorial as seen
    const seenTutorials = localStorage.getItem('seenTutorials') || '{}';
    const seenTutorialsObj = JSON.parse(seenTutorials);
    seenTutorialsObj[pageId] = true;
    localStorage.setItem('seenTutorials', JSON.stringify(seenTutorialsObj));
    
    setShowTutorial(false);
    if (onComplete) onComplete();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-5 max-w-xs mx-4 animate-scale-in">
        <h3 className="text-xl font-bold text-app-dark mb-2">
          {currentTutorial.title}
        </h3>
        <p className="text-app-text-light mb-4">
          {currentTutorial.description}
        </p>
        <div className="flex justify-between items-center">
          <button 
            onClick={handleSkip}
            className="text-app-text-light"
          >
            Пропустить
          </button>
          <div className="flex items-center">
            <div className="flex space-x-1 mr-4">
              {steps.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${currentStep === index ? 'bg-app-blue' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
            <button 
              onClick={handleNext}
              className="flex items-center bg-app-blue text-white px-3 py-1 rounded-full text-sm"
            >
              {currentStep < steps.length - 1 ? 'Далее' : 'Понятно'}
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
