
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface NotificationsViewProps {
  onBack: () => void;
}

const NotificationsView: React.FC<NotificationsViewProps> = ({ onBack }) => {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-3">
          <ChevronLeft size={24} className="text-app-dark" />
        </button>
        <h2 className="text-2xl font-bold text-app-dark">Уведомления</h2>
      </div>
      
      <div className="space-y-4">
        <p className="text-app-text-light text-center p-8">
          У вас пока нет уведомлений
        </p>
      </div>
    </div>
  );
};

export default NotificationsView;
