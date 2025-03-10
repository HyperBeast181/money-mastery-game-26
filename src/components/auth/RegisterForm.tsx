
import { FC, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';
import { useToast } from '../../hooks/use-toast';
import { Mail, Lock, User, LogIn } from 'lucide-react';

interface RegisterFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  name: string;
  setName: (name: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  switchToLogin: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  isLoading,
  setIsLoading,
  switchToLogin
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        }
      });

      if (error) {
        console.error('Registration error:', error);
        toast({
          title: 'Ошибка регистрации',
          description: error.message,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      console.log('Registration successful:', data);
      
      // Check if email confirmation is required
      if (data.user?.identities?.length === 0) {
        toast({
          title: 'Требуется подтверждение',
          description: 'Пожалуйста, подтвердите ваш email перед входом',
        });
        switchToLogin();
        setIsLoading(false);
        return;
      }
      
      toast({
        title: 'Регистрация успешна',
        description: 'Ваш аккаунт был создан успешно!',
      });

      // Auto login after registration
      try {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          console.error('Auto login error:', signInError);
          toast({
            title: 'Ошибка входа',
            description: 'Пожалуйста, войдите вручную',
            variant: 'destructive',
          });
          switchToLogin();
          setIsLoading(false);
          return;
        }

        navigate('/');
      } catch (loginError: any) {
        console.error('Auto login exception:', loginError);
        toast({
          title: 'Ошибка',
          description: loginError.message || 'Произошла ошибка при автоматическом входе',
          variant: 'destructive',
        });
        switchToLogin();
      }
    } catch (error: any) {
      console.error('Registration exception:', error);
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
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Ваше имя
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={20} className="text-gray-400" />
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-app-blue focus:border-app-blue"
            placeholder="Введите ваше имя"
          />
        </div>
      </div>
      
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
            Создать аккаунт
          </span>
        )}
      </button>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={switchToLogin}
          className="text-app-blue hover:underline"
        >
          Уже есть аккаунт? Войти
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
