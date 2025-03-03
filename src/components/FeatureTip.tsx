
import React, { useState, useEffect } from 'react';
import { X, ThumbsUp, Lightbulb } from 'lucide-react';

interface FeatureTipProps {
  id: string;
  title: string;
  description: string;
  daysToWait?: number;
}

const FeatureTip: React.FC<FeatureTipProps> = ({ 
  id, 
  title, 
  description, 
  daysToWait = 0 
}) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Check if this tip has been dismissed before
    const dismissedTips = localStorage.getItem('dismissedTips') || '{}';
    const dismissedTipsObj = JSON.parse(dismissedTips);
    
    if (dismissedTipsObj[id]) {
      return;
    }
    
    // Check if enough time has passed since the last visit
    const lastVisited = localStorage.getItem('lastVisited');
    const now = new Date().toISOString();
    
    if (lastVisited) {
      const daysSinceLastVisit = Math.floor(
        (new Date(now).getTime() - new Date(lastVisited).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysSinceLastVisit >= daysToWait) {
        setVisible(true);
      }
    } else {
      // First time visit
      if (daysToWait === 0) {
        setVisible(true);
      }
    }
    
    // Update last visited
    localStorage.setItem('lastVisited', now);
  }, [id, daysToWait]);
  
  const handleDismiss = () => {
    setVisible(false);
    
    // Mark this tip as dismissed
    const dismissedTips = localStorage.getItem('dismissedTips') || '{}';
    const dismissedTipsObj = JSON.parse(dismissedTips);
    dismissedTipsObj[id] = true;
    localStorage.setItem('dismissedTips', JSON.stringify(dismissedTipsObj));
  };
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-20 inset-x-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200 animate-fade-in z-40">
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X size={18} />
      </button>
      
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-app-light-blue flex items-center justify-center mr-3 flex-shrink-0">
          <Lightbulb size={20} className="text-app-blue" />
        </div>
        
        <div>
          <h3 className="font-semibold text-app-dark mb-1">{title}</h3>
          <p className="text-sm text-app-text-light mb-3">{description}</p>
          
          <button 
            onClick={handleDismiss}
            className="text-sm text-app-blue font-medium flex items-center"
          >
            <ThumbsUp size={14} className="mr-1" />
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureTip;
