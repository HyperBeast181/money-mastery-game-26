
import React from 'react';
import { ChevronLeft, BookOpen, Shield, Users, Award, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CommunityRulesProps {
  onClose: () => void;
}

const CommunityRules: React.FC<CommunityRulesProps> = ({ onClose }) => {
  const { language } = useLanguage();
  
  const rules = language === 'en' 
    ? [
        {
          id: 1,
          icon: <BookOpen size={20} className="text-app-blue" />,
          title: 'Learning Together',
          description: 'Engage with the community to enhance your financial literacy journey. Share insights, ask questions, and participate in discussions.'
        },
        {
          id: 2,
          icon: <Shield size={20} className="text-green-600" />,
          title: 'Respect & Kindness',
          description: 'Always treat other community members with respect. Harassment, discrimination, or bullying of any kind is not tolerated.'
        },
        {
          id: 3,
          icon: <Users size={20} className="text-purple-600" />,
          title: 'Positive Contributions',
          description: 'Focus on adding value to discussions. Share relevant resources, experiences, and tips that can help others improve their financial knowledge.'
        },
        {
          id: 4,
          icon: <Award size={20} className="text-yellow-600" />,
          title: 'Fair Play in Competitions',
          description: 'Participate in quizzes and challenges fairly. Cheating or attempting to manipulate results is against community standards.'
        },
        {
          id: 5,
          icon: <AlertTriangle size={20} className="text-red-600" />,
          title: 'Content Guidelines',
          description: 'Avoid sharing misleading financial information. Do not promote get-rich-quick schemes or high-risk investment opportunities without proper context.'
        }
      ]
    : [
        {
          id: 1,
          icon: <BookOpen size={20} className="text-app-blue" />,
          title: 'Обучение вместе',
          description: 'Взаимодействуйте с сообществом, чтобы улучшить ваш путь к финансовой грамотности. Делитесь своими мыслями, задавайте вопросы и участвуйте в обсуждениях.'
        },
        {
          id: 2,
          icon: <Shield size={20} className="text-green-600" />,
          title: 'Уважение и доброта',
          description: 'Всегда относитесь к другим членам сообщества с уважением. Домогательства, дискриминация или травля любого рода не допускаются.'
        },
        {
          id: 3,
          icon: <Users size={20} className="text-purple-600" />,
          title: 'Позитивный вклад',
          description: 'Сосредоточьтесь на добавлении ценности в обсуждения. Делитесь релевантными ресурсами, опытом и советами, которые могут помочь другим улучшить свои финансовые знания.'
        },
        {
          id: 4,
          icon: <Award size={20} className="text-yellow-600" />,
          title: 'Честная игра в соревнованиях',
          description: 'Участвуйте в викторинах и испытаниях честно. Мошенничество или попытки манипулирования результатами противоречат стандартам сообщества.'
        },
        {
          id: 5,
          icon: <AlertTriangle size={20} className="text-red-600" />,
          title: 'Правила контента',
          description: 'Избегайте распространения вводящей в заблуждение финансовой информации. Не пропагандируйте схемы быстрого обогащения или высокорисковые инвестиционные возможности без надлежащего контекста.'
        }
      ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center mb-6">
          <button onClick={onClose} className="mr-3">
            <ChevronLeft size={24} className="text-app-dark" />
          </button>
          <h2 className="text-2xl font-bold text-app-dark">
            {language === 'en' ? 'Community Rules' : 'Правила сообщества'}
          </h2>
        </div>
        
        <div className="space-y-6">
          {rules.map(rule => (
            <div key={rule.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm">
                  {rule.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-app-dark mb-1">{rule.title}</h3>
                  <p className="text-sm text-app-text-light">{rule.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <button 
            onClick={onClose}
            className="w-full bg-app-blue text-white font-medium py-3 rounded-full"
          >
            {language === 'en' ? 'I Understand' : 'Я понимаю'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityRules;
