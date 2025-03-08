
import { Module } from '../../types';

export const educationModules: Module[] = [
  {
    id: 'edu-payment-001',
    title: 'Оплата обучения',
    icon: 'Briefcase',
    category: 'Высшее образование',
    category_id: 'higher-education',
    coins: 50,
    progress: 0,
    currentPart: 1,
    totalParts: 3,
    timeEstimate: 15,
    participants: 245,
    status: 'не начат',
    description: 'Узнайте о различных способах оплаты высшего образования и выберите оптимальный вариант'
  }
];

export const investingModules: Module[] = [
  {
    id: 'inv-start-001',
    title: 'Начало инвестирования',
    icon: 'TrendingUp',
    category: 'Инвестирование',
    category_id: 'investing',
    coins: 60,
    progress: 0,
    currentPart: 1,
    totalParts: 4,
    timeEstimate: 20,
    participants: 378,
    status: 'не начат',
    description: 'Основы инвестирования для начинающих: с чего начать и как избежать типичных ошибок'
  }
];

export const careerModules: Module[] = [
  {
    id: 'career-basics-001',
    title: 'Основы карьерного роста',
    icon: 'LineChart',
    category: 'Карьера',
    category_id: 'career',
    coins: 45,
    progress: 0,
    currentPart: 1,
    totalParts: 3,
    timeEstimate: 12,
    participants: 189,
    status: 'не начат',
    description: 'Ключевые стратегии развития карьеры и достижения профессиональных целей'
  }
];

export const lifecycleModules: Module[] = [
  {
    id: 'lifecycle-001',
    title: 'Финансовые этапы жизни',
    icon: 'BarChart2',
    category: 'Основные этапы',
    category_id: 'lifecycle',
    coins: 55,
    progress: 0,
    currentPart: 1,
    totalParts: 5,
    timeEstimate: 25,
    participants: 210,
    status: 'не начат',
    description: 'Планирование финансов на разных этапах жизни: от студента до пенсионера'
  }
];

export const popularModules: Module[] = [
  {
    id: 'popular-001',
    title: 'Личные финансы',
    icon: 'Wallet',
    category: 'Популярное',
    category_id: 'popular',
    coins: 40,
    progress: 0,
    currentPart: 1,
    totalParts: 3,
    timeEstimate: 15,
    participants: 520,
    status: 'не начат',
    description: 'Самые востребованные навыки в управлении личными финансами'
  }
];

export const entrepreneurshipModules: Module[] = [
  {
    id: 'entrep-001',
    title: 'Запуск бизнеса',
    icon: 'Rocket',
    category: 'Предпринимательство',
    category_id: 'entrepreneurship',
    coins: 70,
    progress: 0,
    currentPart: 1,
    totalParts: 6,
    timeEstimate: 30,
    participants: 175,
    status: 'не начат',
    description: 'От идеи до первых клиентов: все этапы запуска собственного бизнеса'
  }
];

export const riskManagementModules: Module[] = [
  {
    id: 'insurance-001',
    title: 'Страхование',
    icon: 'Shield',
    category: 'Управление рисками',
    category_id: 'risk-management',
    coins: 45,
    progress: 0,
    currentPart: 1,
    totalParts: 2,
    timeEstimate: 10,
    participants: 150,
    status: 'не начат',
    description: 'Виды страхования и как выбрать подходящую страховку'
  },
  {
    id: 'health-insurance-001',
    title: 'Медицинская страховка',
    icon: 'Heart',
    category: 'Управление рисками',
    category_id: 'risk-management',
    coins: 50,
    progress: 0,
    currentPart: 1,
    totalParts: 3,
    timeEstimate: 15,
    participants: 180,
    status: 'не начат',
    description: 'Особенности медицинского страхования и выбор оптимального плана'
  }
];

export const financialBasicsModules: Module[] = [
  {
    id: 'savings-001',
    title: 'Экономия денег',
    icon: 'PiggyBank',
    category: 'Финансовые основы',
    category_id: 'financial-basics',
    coins: 40,
    progress: 0,
    currentPart: 1,
    totalParts: 3,
    timeEstimate: 12,
    participants: 420,
    status: 'не начат',
    description: 'Практические способы экономии и накопления'
  },
  {
    id: 'smart-shopping-001',
    title: 'Делайте покупки с умом',
    icon: 'ShoppingCart',
    category: 'Финансовые основы',
    category_id: 'financial-basics',
    coins: 35,
    progress: 0,
    currentPart: 1,
    totalParts: 2,
    timeEstimate: 10,
    participants: 280,
    status: 'не начат',
    description: 'Разумные покупки: как тратить деньги эффективно'
  },
  {
    id: 'budgeting-001',
    title: 'Жизнь по бюджету',
    icon: 'Calculator',
    category: 'Финансовые основы',
    category_id: 'financial-basics',
    coins: 45,
    progress: 0,
    currentPart: 1,
    totalParts: 4,
    timeEstimate: 20,
    participants: 350,
    status: 'не начат',
    description: 'Составление и соблюдение личного бюджета для финансового благополучия'
  },
  {
    id: 'financial-inst-001',
    title: 'Выбор финансового учреждения',
    icon: 'Building',
    category: 'Финансовые основы',
    category_id: 'financial-basics',
    coins: 35,
    progress: 0,
    currentPart: 1,
    totalParts: 2,
    timeEstimate: 8,
    participants: 190,
    status: 'не начат',
    description: 'Как выбрать банк или другое финансовое учреждение для своих нужд'
  }
];
