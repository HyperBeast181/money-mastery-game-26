
import { FC, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { Shield, Mail, Lock, User, LogIn } from 'lucide-react';

const Auth: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: 'Ошибка входа',
            description: error.message,
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        navigate('/');
      } else {
        // Register
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          }
        });

        if (error) {
          toast({
            title: 'Ошибка регистрации',
            description: error.message,
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        toast({
          title: 'Регистрация успешна',
          description: 'Ваш аккаунт был создан успешно!',
        });

        // Auto login after registration
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          toast({
            title: 'Ошибка входа',
            description: 'Пожалуйста, войдите вручную',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Произошла неизвестная ошибка',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast({
          title: 'Ошибка входа',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Произошла неизвестная ошибка',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-app-blue p-6 text-white text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">
            {isLogin ? 'Вход в аккаунт' : 'Создание аккаунта'}
          </h1>
          <p className="text-white/80 mt-1">
            {isLogin 
              ? 'Войдите, чтобы продолжить обучение' 
              : 'Зарегистрируйтесь, чтобы начать обучение'}
          </p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
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
                    required={!isLogin}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-app-blue focus:border-app-blue"
                    placeholder="Введите ваше имя"
                  />
                </div>
              </div>
            )}
            
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
                  {isLogin ? 'Войти' : 'Создать аккаунт'}
                </span>
              )}
            </button>
          </form>
          
          <div className="mt-4">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-3 text-gray-500 text-sm">или</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <button
              onClick={handleGoogleSignIn}
              className="w-full mt-4 bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-lg flex items-center justify-center hover:bg-gray-50"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              Войти через Google
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-app-blue hover:underline"
            >
              {isLogin
                ? 'Нет аккаунта? Зарегистрироваться'
                : 'Уже есть аккаунт? Войти'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
