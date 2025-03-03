
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface NotificationsViewProps {
  onBack: () => void;
}

const NotificationsView: React.FC<NotificationsViewProps> = ({ onBack }) => {
  // Mock notifications data
  const notifications = [
    {
      id: '1',
      title: 'Поздравляем!',
      message: 'Вы завершили модуль "Основы финансов" и заработали 500 монет.',
      type: 'achievement',
      read: false,
      date: '15 мин назад'
    },
    {
      id: '2',
      title: 'Новая награда доступна',
      message: 'Новый партнер предлагает подписку на книги. Проверьте раздел наград!',
      type: 'reward',
      read: true,
      date: '2 часа назад'
    },
    {
      id: '3',
      title: 'Обновление приложения',
      message: 'Мы добавили новые модули и улучшили интерфейс приложения.',
      type: 'update',
      read: true,
      date: 'Вчера'
    }
  ];
  
  return (
    <div>
      <div className="p-4 border-b border-gray-100 flex items-center">
        <button onClick={onBack} className="mr-3">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">Уведомления</h2>
      </div>
      
      <div className="p-4">
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-xl border ${notification.read ? 'border-gray-200 bg-white' : 'border-app-blue bg-blue-50'}`}
              >
                <div className="flex items-start">
                  <div>
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <div className="text-xs text-gray-500 mt-2">{notification.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Нет уведомлений</h3>
            <p className="text-sm text-gray-500 text-center">У вас пока нет уведомлений. Мы уведомим вас о важных событиях.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsView;
