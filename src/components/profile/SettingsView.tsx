
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import LogoutButton from './LogoutButton';

interface SettingsViewProps {
  onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-3">
          <ChevronLeft size={24} className="text-app-dark" />
        </button>
        <h2 className="text-2xl font-bold text-app-dark">Настройки</h2>
      </div>
      
      <div className="space-y-4">
        <div className="border-b border-gray-100 pb-4">
          <h3 className="font-medium text-app-dark mb-3">Аккаунт</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-app-text-light">Email</span>
              <span className="text-app-dark">user@example.com</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-app-text-light">Пароль</span>
              <span className="text-app-dark">Изменить</span>
            </button>
          </div>
        </div>
        
        <div className="border-b border-gray-100 pb-4">
          <h3 className="font-medium text-app-dark mb-3">Уведомления</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3">
              <span className="text-app-text-light">Push-уведомления</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-app-blue"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-app-text-light">Напоминания</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-app-blue"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-app-text-light">Email-рассылка</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-app-blue"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-100 pb-4">
          <h3 className="font-medium text-app-dark mb-3">О приложении</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-app-text-light">Версия</span>
              <span className="text-app-dark">1.0.0</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-app-text-light">Условия использования</span>
              <span className="text-app-blue">Просмотр</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-app-text-light">Политика конфиденциальности</span>
              <span className="text-app-blue">Просмотр</span>
            </button>
          </div>
        </div>
        
        <LogoutButton />
      </div>
    </div>
  );
};

export default SettingsView;
