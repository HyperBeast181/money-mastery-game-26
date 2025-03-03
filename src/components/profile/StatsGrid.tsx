
import React from 'react';
import { User } from '../../types';
import { Zap, Calendar, Heart } from 'lucide-react';

interface StatsGridProps {
  user: User;
}

const StatsGrid: React.FC<StatsGridProps> = ({ user }) => {
  const stats = [
    {
      id: 'coins',
      title: 'Монеты',
      value: user.coins.toLocaleString(),
      icon: <Zap size={20} className="text-yellow-600" />,
      bgColor: 'bg-yellow-100'
    },
    {
      id: 'streak',
      title: 'Дней подряд',
      value: user.streak.toString(),
      icon: <Calendar size={20} className="text-blue-600" />,
      bgColor: 'bg-blue-100'
    },
    {
      id: 'hearts',
      title: 'Сердца',
      value: user.hearts.toString(),
      icon: <Heart size={20} className="text-red-600" />,
      bgColor: 'bg-red-100'
    }
  ];
  
  return (
    <div className="grid grid-cols-3 p-5 gap-3">
      {stats.map(stat => (
        <div key={stat.id} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
          <div className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center mb-2`}>
            {stat.icon}
          </div>
          <div className="text-sm text-gray-500">{stat.title}</div>
          <div className="text-xl font-bold text-gray-800">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
