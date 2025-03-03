
import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQViewProps {
  onBack: () => void;
}

// Mock FAQ data
const faqs = [
  {
    id: '1',
    question: 'Как зарабатывать монеты?',
    answer: 'Вы можете зарабатывать монеты, завершая модули обучения, проходя тесты и участвуя в ежедневных активностях. Также монеты можно получить, пригласив друзей в приложение.',
    category: 'general'
  },
  {
    id: '2',
    question: 'Как потратить монеты?',
    answer: 'Монеты можно обменять на различные награды в разделе "Награды". В нём представлены подписки, скидки и другие предложения от наших партнёров.',
    category: 'general'
  },
  {
    id: '3',
    question: 'Что такое "Серия дней"?',
    answer: 'Серия дней показывает, сколько дней подряд вы занимались в приложении. Поддерживайте серию, чтобы получать дополнительные бонусы!',
    category: 'general'
  },
  {
    id: '4',
    question: 'Как пригласить друзей?',
    answer: 'Вы можете пригласить друзей через раздел "Пригласить друзей" в меню профиля. Поделитесь вашим реферальным кодом или отправьте приглашение через социальные сети.',
    category: 'account'
  },
  {
    id: '5',
    question: 'Как изменить язык приложения?',
    answer: 'Язык приложения можно изменить в разделе "Настройки" в меню профиля. Выберите нужный язык из списка доступных.',
    category: 'account'
  }
];

const FAQView: React.FC<FAQViewProps> = ({ onBack }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };
  
  return (
    <div>
      <div className="p-4 border-b border-gray-100 flex items-center">
        <button onClick={onBack} className="mr-3">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">Вопросы и ответы</h2>
      </div>
      
      <div className="p-4">
        <div className="divide-y divide-gray-100">
          {faqs.map(faq => (
            <div key={faq.id} className="py-4">
              <button 
                className="flex justify-between items-center w-full text-left font-medium"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                {activeId === faq.id ? 
                  <ChevronUp size={18} className="flex-shrink-0 text-gray-500" /> : 
                  <ChevronDown size={18} className="flex-shrink-0 text-gray-500" />
                }
              </button>
              
              {activeId === faq.id && (
                <div className="mt-2 text-gray-600 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQView;
