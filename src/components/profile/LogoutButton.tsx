
import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const LogoutButton: React.FC = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Выход из системы",
        description: "Вы успешно вышли из системы",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при выходе из системы",
        variant: "destructive",
      });
    }
  };
  
  return (
    <button 
      onClick={handleLogout}
      className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors text-red-500"
    >
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
        <LogOut size={20} className="text-red-500" />
      </div>
      <span className="flex-1 text-left font-medium">Выйти</span>
    </button>
  );
};

export default LogoutButton;
