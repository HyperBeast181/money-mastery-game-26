
import { Reward } from '../types';

export const rewards: Reward[] = [
  {
    id: 'r1',
    title: 'Базовая премиум-подписка',
    name: 'Базовая премиум-подписка',
    description: '1 месяц доступа к премиум-контенту',
    cost: 500,
    image: '/lovable-uploads/37933159-2c9d-4a32-8c8b-d731a46b6ccf.png',
    type: 'подписка',
    redeemed: false
  },
  {
    id: 'r2',
    title: 'Про премиум-подписка',
    name: 'Про премиум-подписка',
    description: '3 месяца доступа к премиум-контенту',
    cost: 1200,
    image: '/lovable-uploads/37933159-2c9d-4a32-8c8b-d731a46b6ccf.png',
    type: 'подписка',
    redeemed: false
  },
  {
    id: 'r3',
    title: 'Курс по инвестициям для опытных',
    name: 'Курс по инвестициям для опытных',
    description: 'Специальный курс по инвестициям в фондовый рынок',
    cost: 800,
    image: '/lovable-uploads/37933159-2c9d-4a32-8c8b-d731a46b6ccf.png',
    type: 'премиум-контент',
    redeemed: false
  },
  {
    id: 'r4',
    title: 'Доступ к эксклюзивному вебинару',
    name: 'Доступ к эксклюзивному вебинару',
    description: 'Присоединяйтесь к нашим финансовым экспертам на живые сессии вопросов и ответов',
    cost: 650,
    image: '/lovable-uploads/37933159-2c9d-4a32-8c8b-d731a46b6ccf.png',
    type: 'премиум-контент',
    redeemed: false
  }
];
