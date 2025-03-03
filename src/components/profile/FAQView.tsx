
import React, { useState } from 'react';
import { faqs } from '../../data/modules';
import { FAQ } from '../../types';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface FAQViewProps {
  onBackClick: () => void;
}

const FAQView: React.FC<FAQViewProps> = ({ onBackClick }) => {
  const [openFaqId, setOpenFaqId] = useState<string>('');
  const { t } = useLanguage();
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBackClick}
          className="text-app-blue font-medium"
        >
          {t('back')}
        </button>
        <h2 className="text-lg font-bold text-app-dark">{t('faqs')}</h2>
        <div className="w-10"></div>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq: FAQ) => (
          <div key={faq.id} className="bg-white rounded-xl shadow-sm">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => setOpenFaqId(prev => prev === faq.id ? '' : faq.id)}
            >
              <h3 className="font-semibold text-app-dark">{faq.question}</h3>
              <ChevronRight 
                size={18} 
                className={`text-app-text-light transition-transform ${openFaqId === faq.id ? 'rotate-90' : ''}`} 
              />
            </div>
            
            {openFaqId === faq.id && (
              <div className="px-4 pb-4 text-app-text-light">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQView;
