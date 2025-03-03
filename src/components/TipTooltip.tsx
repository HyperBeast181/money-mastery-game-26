
import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TipTooltipProps {
  id: string;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

const TipTooltip: React.FC<TipTooltipProps> = ({ id, content, position = 'top' }) => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { language } = useLanguage();
  
  // Skip if already dismissed
  if (dismissed) return null;
  
  // Position classes
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="w-5 h-5 rounded-full bg-app-light-blue flex items-center justify-center text-app-blue hover:bg-app-blue hover:text-white transition-colors"
      >
        <HelpCircle size={14} />
      </button>
      
      {show && (
        <div 
          className={`absolute z-50 w-48 p-3 bg-white rounded-lg shadow-lg text-sm text-app-dark ${positionClasses[position]}`}
        >
          <button 
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600" 
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
            }}
          >
            <X size={14} />
          </button>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default TipTooltip;
