
import React from 'react';
import { 
  Bell, 
  Settings, 
  HelpCircle, 
  Users, 
  LogOut
} from 'lucide-react';
import LogoutButton from './LogoutButton';

interface MenuSectionProps {
  onNavigate: (view: string) => void;
}

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  action: () => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ onNavigate }) => {
  const menuItems: MenuItem[] = [
    {
      id: 'notifications',
      icon: <Bell size={20} />,
      title: 'Уведомления',
      action: () => onNavigate('notifications')
    },
    {
      id: 'settings',
      icon: <Settings size={20} />,
      title: 'Настройки',
      action: () => onNavigate('settings')
    },
    {
      id: 'faqs',
      icon: <HelpCircle size={20} />,
      title: 'Вопросы и ответы',
      action: () => onNavigate('faqs')
    },
    {
      id: 'invite',
      icon: <Users size={20} />,
      title: 'Пригласить друзей',
      action: () => onNavigate('invite')
    }
  ];
  
  return (
    <div className="p-5">
      <h3 className="font-semibold text-gray-500 mb-2">МЕНЮ</h3>
      <ul className="space-y-1">
        {menuItems.map(item => (
          <li key={item.id}>
            <button 
              onClick={item.action} 
              className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                {item.icon}
              </div>
              <span className="flex-1 text-left font-medium text-gray-800">{item.title}</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </li>
        ))}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
};

export default MenuSection;
