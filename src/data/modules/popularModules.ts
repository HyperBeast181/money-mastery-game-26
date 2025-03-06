
import { Module } from '../../types';
import { savingLessons } from '../lessons/savingLessons';
import { insuranceLessons } from '../lessons/insuranceLessons';

export const popularModules: Module[] = [
  {
    id: '1',
    title: 'Экономьте деньги',
    icon: 'dollar-sign',
    category: 'Популярные',
    coins: 700,
    progress: 20,
    totalParts: 15,
    currentPart: 3,
    timeEstimate: 5,
    status: 'в процессе',
    lessons: savingLessons
  },
  {
    id: '2',
    title: 'Шоппинг с умом',
    icon: 'credit-card',
    category: 'Популярные',
    coins: 1000,
    progress: 0,
    totalParts: 22,
    currentPart: 0,
    timeEstimate: 5,
    status: 'не начат'
  },
  {
    id: '3',
    title: 'Получите страховку',
    icon: 'shield',
    category: 'Популярные',
    coins: 900,
    progress: 0,
    totalParts: 18,
    currentPart: 0,
    timeEstimate: 5,
    status: 'не начат',
    lessons: insuranceLessons
  },
  {
    id: '4',
    title: 'Получите медицинскую страховку',
    icon: 'heart',
    category: 'Популярные',
    coins: 1000,
    progress: 0,
    totalParts: 20,
    currentPart: 0,
    timeEstimate: 5,
    status: 'не начат'
  }
];
