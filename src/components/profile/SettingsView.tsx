
import React, { useState } from 'react';
import { ChevronLeft, Moon, Bell, Mail, Globe } from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div>
      <div className="p-4 border-b border-gray-100 flex items-center">
        <button onClick={onBack} className="mr-3">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">Настройки</h2>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-gray-500 mb-3">ПРЕДПОЧТЕНИЯ</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Bell size={20} className="text-blue-600" />
              </div>
              <span className="font-medium">Push-уведомления</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-app-blue"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Mail size={20} className="text-green-600" />
              </div>
              <span className="font-medium">Уведомления по эл. почте</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-app-blue"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Moon size={20} className="text-purple-600" />
              </div>
              <span className="font-medium">Темный режим</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-app-blue"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mr-3">
                <Globe size={20} className="text-cyan-600" />
              </div>
              <div>
                <span className="font-medium block">Язык</span>
                <span className="text-sm text-gray-500">Русский</span>
              </div>
            </div>
            <button className="text-app-blue font-medium text-sm">
              Изменить
            </button>
          </div>
          
          <div className="pt-2">
            <h3 className="font-semibold text-gray-500 mb-3">О ПРИЛОЖЕНИИ</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">Условия использования</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">Политика конфиденциальности</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">Версия</span>
                <span className="text-gray-500">1.0.0</span>
              </div>
            </div>
          </div>
          
          <button className="text-red-500 font-medium w-full text-center mt-4">
            Удалить аккаунт
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
