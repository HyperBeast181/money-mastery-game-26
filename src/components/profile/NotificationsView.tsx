
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Bell, CheckCircle, Gift, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { Notification } from '../../types';
import { useToast } from '@/hooks/use-toast';

interface NotificationsViewProps {
  onBack: () => void;
}

const NotificationsView: React.FC<NotificationsViewProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Симулируем загрузку уведомлений из базы данных
        // В реальной реализации здесь был бы запрос к API
        const mockNotifications: Notification[] = [
          {
            id: '1',
            title: 'Достижение разблокировано!',
            message: 'Вы достигли 3-дневного обучения подряд! Продолжайте в том же духе!',
            type: 'достижение',
            read: false,
            date: '2023-09-15T10:30:00Z'
          },
          {
            id: '2',
            title: 'Награда доступна',
            message: 'Вы заработали 500 монет и можете обменять их на подарки в разделе Награды',
            type: 'награда',
            read: false,
            date: '2023-09-10T14:15:00Z'
          },
          {
            id: '3',
            title: 'Новый модуль доступен',
            message: 'Мы добавили новый модуль "Инвестирование для начинающих". Проверьте его сейчас!',
            type: 'обновление',
            read: true,
            date: '2023-09-05T09:00:00Z'
          }
        ];
        
        setNotifications(mockNotifications);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке уведомлений:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить уведомления',
          variant: 'destructive'
        });
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [toast]);

  const markAsRead = async (id: string) => {
    // Здесь будет запрос к API для отметки уведомления как прочитанного
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'достижение':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'награда':
        return <Gift size={20} className="text-purple-500" />;
      case 'обновление':
        return <RefreshCw size={20} className="text-blue-500" />;
      default:
        return <AlertCircle size={20} className="text-yellow-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-3">
          <ChevronLeft size={24} className="text-app-dark" />
        </button>
        <h2 className="text-2xl font-bold text-app-dark">Уведомления</h2>
      </div>
      
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-app-blue"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center p-8">
            <div className="flex justify-center mb-4">
              <Bell size={40} className="text-gray-300" />
            </div>
            <p className="text-app-text-light">
              У вас пока нет уведомлений
            </p>
          </div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id}
              className={`p-4 rounded-xl border transition-all ${notification.read ? 'bg-white border-gray-100' : 'bg-app-light-blue border-app-blue'}`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-app-dark">{notification.title}</h3>
                    <span className="text-xs text-app-text-light">{formatDate(notification.date)}</span>
                  </div>
                  <p className="text-sm text-app-text-light mt-1">{notification.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsView;
