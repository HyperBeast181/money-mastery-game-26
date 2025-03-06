
import { Module } from '../../types';

export const financialModules: Module[] = [
  {
    id: '5',
    title: 'Подайте заявку на кредит',
    icon: 'credit-card',
    category: 'Популярные',
    coins: 1000,
    progress: 0,
    totalParts: 22,
    currentPart: 0,
    timeEstimate: 5,
    participants: 165900,
    status: 'не начат'
  },
  {
    id: '6',
    title: 'Начните инвестировать',
    icon: 'trending-up',
    category: 'Популярные',
    coins: 900,
    progress: 0,
    totalParts: 18,
    currentPart: 0,
    timeEstimate: 5,
    participants: 84000,
    status: 'не начат'
  },
  {
    id: '7',
    title: 'Оплатите учебу',
    icon: 'graduation-cap',
    category: 'Популярные',
    coins: 800,
    progress: 0,
    totalParts: 18,
    currentPart: 0,
    timeEstimate: 5,
    participants: 110800,
    status: 'завершено'
  },
  {
    id: '8',
    title: 'Обнаружьте мошенничество до того, как оно случится',
    icon: 'search',
    category: 'Популярные',
    coins: 900,
    progress: 0,
    totalParts: 16,
    currentPart: 0,
    timeEstimate: 5,
    status: 'не начат'
  }
];
