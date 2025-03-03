
import React from 'react';
import { notifications } from '../../data/modules';
import { Notification } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface NotificationsViewProps {
  onBackClick: () => void;
}

const NotificationsView: React.FC<NotificationsViewProps> = ({ onBackClick }) => {
  const { t } = useLanguage();
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBackClick}
          className="text-app-blue font-medium"
        >
          {t('back')}
        </button>
        <h2 className="text-lg font-bold text-app-dark">{t('notifications')}</h2>
        <div className="w-10"></div>
      </div>
      
      <div className="space-y-3">
        {notifications.map((notification: Notification) => (
          <div 
            key={notification.id}
            className={`p-4 rounded-xl bg-white shadow-sm ${notification.read ? 'border border-gray-100' : 'border-l-4 border-app-blue border-t border-r border-b'}`}
          >
            <h3 className="font-semibold text-app-dark">{notification.title}</h3>
            <p className="text-sm text-app-text-light mb-2">{notification.message}</p>
            <p className="text-xs text-app-text-light">
              {new Date(notification.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
