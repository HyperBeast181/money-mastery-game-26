
import { FC, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';
import { useToast } from '../../hooks/use-toast';
import { Mail, Lock, LogIn } from 'lucide-react';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  switchToRegister: () => void;
}

const LoginForm: FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  setIsLoading,
  switchToRegister
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        toast({
          title: 'Ошибка входа',
          description: error.message,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      console.log('Logged in successfully:', data);
      toast({
        title: 'Успешный вход',
        description: 'Вы успешно вошли в систему',
      });
      navigate('/');
    } catch (error: any) {
      console.error('Login exception:', error);
      toast({
        title: 'Ошибка',
        description: error.message || 'Произошла неизвестная ошибка',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail size={20} className="text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-app-blue focus:border-app-blue"
            placeholder="Введите ваш email"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Пароль
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={20} className="text-gray-400" />
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-app-blue focus:border-app-blue"
            placeholder="Введите ваш пароль"
            minLength={6}
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-app-blue text-white font-medium py-2 rounded-lg flex items-center justify-center"
      >
        {isLoading ? (
          <span className="flex items-center">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            Загрузка...
          </span>
        ) : (
          <span className="flex items-center">
            <LogIn size={20} className="mr-2" />
            Войти
          </span>
        )}
      </button>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={switchToRegister}
          className="text-app-blue hover:underline"
        >
          Нет аккаунта? Зарегистрироваться
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
