
import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQViewProps {
  onBack: () => void;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Что такое Zogo?',
    answer: 'Zogo — это образовательное приложение, которое помогает вам изучать финансовую грамотность в интерактивной и увлекательной форме. Вы зарабатываете монеты, когда изучаете новые темы и проходите модули.'
  },
  {
    id: '2',
    question: 'Как зарабатывать монеты?',
    answer: 'Вы можете зарабатывать монеты, завершая уроки, проходя тесты, поддерживая серию обучения, и приглашая друзей присоединиться к Zogo.'
  },
  {
    id: '3',
    question: 'Что можно делать с монетами?',
    answer: 'Монеты можно обменивать на различные вознаграждения, включая подарочные карты, подписки и эксклюзивный контент.'
  },
  {
    id: '4',
    question: 'Как пригласить друзей?',
    answer: 'Вы можете пригласить друзей, поделившись своим уникальным реферальным кодом. Когда ваши друзья регистрируются с вашим кодом, вы оба получаете бонусные монеты.'
  },
  {
    id: '5',
    question: 'Как сбросить пароль?',
    answer: 'Вы можете сбросить пароль, нажав на "Забыли пароль" на экране входа. Следуйте инструкциям в электронном письме, которое вы получите, чтобы создать новый пароль.'
  },
];

const FAQView: React.FC<FAQViewProps> = ({ onBack }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-3">
          <ChevronLeft size={24} className="text-app-dark" />
        </button>
        <h2 className="text-2xl font-bold text-app-dark">Часто задаваемые вопросы</h2>
      </div>
      
      <div className="space-y-4">
        {faqs.map(faq => (
          <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 text-left font-medium bg-white"
              onClick={() => toggleExpanded(faq.id)}
            >
              {faq.question}
              {expandedId === faq.id ? 
                <ChevronUp size={20} className="text-app-text-light" /> : 
                <ChevronDown size={20} className="text-app-text-light" />
              }
            </button>
            {expandedId === faq.id && (
              <div className="p-4 bg-gray-50 text-app-text-light">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQView;
