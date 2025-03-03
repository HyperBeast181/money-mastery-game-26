
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'ru';

type Translations = {
  [key: string]: {
    en: string;
    ru: string;
  };
};

const translations: Translations = {
  home: {
    en: 'Home',
    ru: 'Главная',
  },
  explore: {
    en: 'Explore',
    ru: 'Обзор',
  },
  community: {
    en: 'Community',
    ru: 'Сообщество',
  },
  profile: {
    en: 'Profile',
    ru: 'Профиль',
  },
  learningPath: {
    en: 'Learning Path',
    ru: 'Путь обучения',
  },
  mySkills: {
    en: 'My Skills',
    ru: 'Мои навыки',
  },
  completed: {
    en: 'Completed',
    ru: 'Завершено',
  },
  continue: {
    en: 'Continue Learning',
    ru: 'Продолжить обучение',
  },
  moreForYou: {
    en: 'More for you',
    ru: 'Ещё для вас',
  },
  basedOnInterests: {
    en: 'Based on your interests',
    ru: 'На основе ваших интересов',
  },
  savings: {
    en: 'Savings and Spending',
    ru: 'Сбережения и траты',
  },
  insurance: {
    en: 'Insurance',
    ru: 'Страхование',
  },
  education: {
    en: 'Education',
    ru: 'Образование',
  },
  back: {
    en: 'Back',
    ru: 'Назад',
  },
  lessons: {
    en: 'Lessons',
    ru: 'Уроки',
  },
  completeAllLessons: {
    en: 'Complete all lessons',
    ru: 'Завершите все уроки',
  },
  earnCoins: {
    en: 'Earn {0} coins for completing this module',
    ru: 'Заработайте {0} монет за прохождение этого модуля',
  },
  startQuiz: {
    en: 'Start Quiz',
    ru: 'Начать тест',
  },
  quizCompleted: {
    en: 'Quiz Completed!',
    ru: 'Тест завершен!',
  },
  continueLearning: {
    en: 'Continue Learning',
    ru: 'Продолжить обучение',
  },
  question: {
    en: 'Question',
    ru: 'Вопрос',
  },
  correct: {
    en: 'correct',
    ru: 'правильно',
  },
  notifications: {
    en: 'Notifications',
    ru: 'Уведомления',
  },
  settings: {
    en: 'Settings',
    ru: 'Настройки',
  },
  faqs: {
    en: 'FAQs',
    ru: 'Вопросы и ответы',
  },
  rewards: {
    en: 'Rewards',
    ru: 'Награды',
  },
  logOut: {
    en: 'Log Out',
    ru: 'Выйти',
  },
  invite: {
    en: 'Invite Friends',
    ru: 'Пригласить друзей',
  },
  yourProgress: {
    en: 'Your progress',
    ru: 'Ваш прогресс',
  },
  referFriends: {
    en: 'Refer friends',
    ru: 'Пригласить друзей',
  },
  account: {
    en: 'Account',
    ru: 'Аккаунт',
  },
  preferences: {
    en: 'Preferences',
    ru: 'Предпочтения',
  },
  language: {
    en: 'Language',
    ru: 'Язык',
  },
  english: {
    en: 'English',
    ru: 'Английский',
  },
  russian: {
    en: 'Russian',
    ru: 'Русский',
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: any[]) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, params: any[] = []): string => {
    if (!translations[key]) {
      console.warn(`Translation key '${key}' not found.`);
      return key;
    }

    let translation = translations[key][language];
    
    // Replace parameters
    if (params.length > 0) {
      params.forEach((param, index) => {
        translation = translation.replace(`{${index}}`, param.toString());
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
