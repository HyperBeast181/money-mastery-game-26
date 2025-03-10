
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  session: any | null;
  user: any | null;
  profile: any | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  signOut: async () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log('AuthProvider инициализируется');
    const getSession = async () => {
      try {
        setIsLoading(true);
        console.log('Получаем текущую сессию');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Ошибка получения сессии:', error);
          setIsLoading(false);
          return;
        }
        
        console.log('Сессия получена:', data);
        setSession(data.session);
        
        if (data.session?.user) {
          console.log('Устанавливаем пользователя из сессии:', data.session.user.id);
          setUser(data.session.user);
          
          // Получаем профиль пользователя
          try {
            console.log('Запрашиваем профиль для user_id:', data.session.user.id);
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.session.user.id)
              .maybeSingle();
            
            if (profileError) {
              console.error('Ошибка получения профиля:', profileError);
            } else if (profileData) {
              console.log('Профиль найден:', profileData);
              setProfile(profileData);
            } else {
              console.log('Профиль не найден, возможно нужно обновить');
            }
          } catch (profileFetchError) {
            console.error('Исключение при получении профиля:', profileFetchError);
          }
        }
      } catch (error) {
        console.error('Исключение в getSession:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Состояние аутентификации изменилось:', event, newSession?.user?.id);
      
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (event === 'SIGNED_IN' && newSession?.user) {
        // Получаем профиль пользователя при входе
        try {
          console.log('Запрашиваем профиль после входа для:', newSession.user.id);
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', newSession.user.id)
            .maybeSingle();
          
          if (profileError) {
            console.error('Ошибка получения профиля после входа:', profileError);
          } else if (profileData) {
            console.log('Профиль после входа найден:', profileData);
            setProfile(profileData);
          } else {
            console.log('Профиль после входа не найден, пробуем ещё раз через 1 секунду');
            // Пробуем ещё раз через небольшую задержку
            setTimeout(async () => {
              try {
                const { data: retryData, error: retryError } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', newSession.user.id)
                  .maybeSingle();
                
                if (retryError) {
                  console.error('Ошибка при повторном получении профиля:', retryError);
                } else if (retryData) {
                  console.log('Профиль найден при повторной попытке:', retryData);
                  setProfile(retryData);
                } else {
                  console.warn('Профиль не найден даже после повторной попытки');
                }
              } catch (retryFetchError) {
                console.error('Исключение при повторном получении профиля:', retryFetchError);
              }
            }, 1000);
          }
        } catch (profileFetchError) {
          console.error('Исключение при получении профиля после входа:', profileFetchError);
        }
        
        // Переход на главную страницу после входа
        console.log('Переходим на главную страницу после подтверждения входа');
        navigate('/', { replace: true });
      } else if (event === 'SIGNED_OUT') {
        console.log('Пользователь вышел из системы');
        setProfile(null);
        navigate('/auth', { replace: true });
      }
    });

    return () => {
      console.log('Отписываемся от слушателя аутентификации');
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    try {
      console.log('Начинаем процесс выхода');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Ошибка при выходе:', error);
        toast({
          title: "Ошибка",
          description: "Произошла ошибка при выходе из системы",
          variant: "destructive",
        });
        throw error;
      }
      
      console.log('Выход успешен, сбрасываем состояние');
      setProfile(null);
      setUser(null);
      setSession(null);
      
      // Очищаем локальное хранилище
      localStorage.removeItem('supabase.auth.token');
      
      toast({
        title: "Выход из системы",
        description: "Вы успешно вышли из системы",
      });
      
      console.log('Переходим на страницу аутентификации');
      navigate('/auth', { replace: true });
    } catch (error) {
      console.error('Исключение в функции signOut:', error);
    }
  };

  console.log('AuthProvider состояние:', { session: !!session, user: !!user, profile: !!profile, isLoading });

  return (
    <AuthContext.Provider value={{ session, user, profile, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
