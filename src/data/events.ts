
import { TriviaEvent, Notification, FAQ } from '../types';

export const triviaEvents: TriviaEvent[] = [
  {
    id: '1',
    title: 'Финансовая Тривиа',
    description: 'Ответьте на вопросы и выиграйте до',
    prize: 500,
    icon: '/icons/trivia-money.svg',
    date: '14 Марта',
    participants: 237
  },
  {
    id: '2',
    title: 'Инвестиционный Вызов',
    description: 'Проверьте свои инвестиционные знания и заработайте',
    prize: 300,
    icon: '/icons/trivia-invest.svg',
    date: '16 Марта',
    participants: 185
  },
  {
    id: '3',
    title: 'Экономическая Викторина',
    description: 'Соревнуйтесь с друзьями и выиграйте до',
    prize: 600,
    icon: '/icons/trivia-econ.svg',
    date: '20 Марта',
    participants: 312
  }
];

export const notifications = [
  {
    id: '1',
    title: 'Заработано 100 монет',
    description: 'Вы завершили модуль "Основы инвестирования"',
    date: '2 часа назад',
    read: false
  },
  {
    id: '2',
    title: 'Новое достижение!',
    description: 'Вы заработали значок "Инвестор новичок"',
    date: '1 день назад',
    read: true
  }
];

export const faqs = [
  {
    id: '1',
    question: 'Как зарабатывать монеты?',
    answer: 'Вы можете зарабатывать монеты, завершая учебные модули, участвуя в викторинах и ежедневно заходя в приложение.'
  },
  {
    id: '2',
    question: 'Как обменять монеты на награды?',
    answer: 'Перейдите в раздел "Награды", выберите понравившуюся награду и нажмите "Обменять".'
  },
  {
    id: '3',
    question: 'Могу ли я пригласить друзей?',
    answer: 'Да, вы можете пригласить друзей через раздел "Профиль" > "Пригласить друзей". За каждого приглашенного друга вы получите 50 монет.'
  }
];
