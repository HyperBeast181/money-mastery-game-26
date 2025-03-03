
import React, { useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';
import Confetti from './Confetti';
import { useLanguage } from '../context/LanguageContext';

interface AchievementNotificationProps {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  coins?: number;
  onDismiss?: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  id,
  title,
  description,
  icon,
  coins,
  onDismiss
}) => {
  const [visible, setVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { language } = useLanguage();
  
  useEffect(() => {
    // Check if this achievement has been shown before
    const shownAchievements = localStorage.getItem('shownAchievements') || '{}';
    const shownAchievementsObj = JSON.parse(shownAchievements);
    
    if (!shownAchievementsObj[id]) {
      setVisible(true);
      setShowConfetti(true);
      
      // Mark as shown
      shownAchievementsObj[id] = true;
      localStorage.setItem('shownAchievements', JSON.stringify(shownAchievementsObj));
    }
  }, [id]);
  
  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };
  
  if (!visible) return null;
  
  return (
    <>
      <Confetti active={showConfetti} />
      
      <div className="fixed inset-x-4 top-20 bg-white rounded-xl shadow-lg border border-yellow-200 p-4 animate-scale-in z-50">
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
        
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
            {icon || <Trophy size={24} className="text-yellow-600" />}
          </div>
          
          <div>
            <div className="mb-1 flex items-center">
              <h3 className="font-bold text-app-dark mr-2">{title}</h3>
              {coins && (
                <div className="flex items-center bg-app-yellow bg-opacity-20 px-2 py-0.5 rounded-full">
                  <span className="w-3 h-3 bg-app-yellow rounded-full flex items-center justify-center mr-1">
                    <span className="text-[8px] text-app-dark">¢</span>
                  </span>
                  <span className="text-xs font-medium text-app-dark">+{coins}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-app-text-light">{description}</p>
          </div>
        </div>
        
        <div className="mt-3 flex justify-end">
          <button 
            onClick={handleDismiss}
            className="text-sm font-medium text-app-blue"
          >
            {language === 'en' ? 'Awesome!' : 'Отлично!'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AchievementNotification;
