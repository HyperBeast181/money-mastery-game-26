
import React from 'react';
import { LogOut } from 'lucide-react';

const LogoutButton: React.FC = () => {
  return (
    <button className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors text-red-500">
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
        <LogOut size={20} className="text-red-500" />
      </div>
      <span className="flex-1 text-left font-medium">Выйти</span>
    </button>
  );
};

export default LogoutButton;
