
import { Module } from '../../types';

export const savingsModules: Module[] = [
  {
    id: '9',
    title: 'Выбор финансового учреждения',
    icon: 'building',
    category: 'Сбережения и расходы',
    coins: 600,
    progress: 0,
    totalParts: 11,
    currentPart: 0,
    timeEstimate: 5,
    participants: 167900,
    status: 'не начат'
  },
  {
    id: '10',
    title: 'Жить по бюджету',
    icon: 'piggy-bank',
    category: 'Сбережения и расходы',
    coins: 500,
    progress: 0,
    totalParts: 16,
    currentPart: 0,
    timeEstimate: 5,
    participants: 35800,
    status: 'не начат'
  }
];
