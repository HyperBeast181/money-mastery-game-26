
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
    const getSession = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          return;
        }
        
        setSession(data.session);
        
        if (data.session?.user) {
          setUser(data.session.user);
          
          // Fetch user profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', data.session.user.id)
            .maybeSingle();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else if (profileData) {
            setProfile(profileData);
          } else {
            console.log('No profile found for user');
          }
        }
      } catch (error) {
        console.error('Error in getSession:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth state changed:', event, newSession?.user?.id);
      
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (event === 'SIGNED_IN' && newSession?.user) {
        // Fetch user profile on sign in
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', newSession.user.id)
            .maybeSingle();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else if (profileData) {
            setProfile(profileData);
          } else {
            console.log('No profile found, may need to refresh');
            // Try once more after a short delay
            setTimeout(async () => {
              const { data: retryData } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', newSession.user.id)
                .maybeSingle();
              
              if (retryData) {
                setProfile(retryData);
              } else {
                console.warn('Still no profile found after retry');
              }
            }, 1000);
          }
        } catch (error) {
          console.error('Error handling profile after sign in:', error);
        }
        
        navigate('/');
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
        navigate('/auth');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        toast({
          title: "Ошибка",
          description: "Произошла ошибка при выходе из системы",
          variant: "destructive",
        });
        throw error;
      }
      
      setProfile(null);
      setUser(null);
      setSession(null);
      
      toast({
        title: "Выход из системы",
        description: "Вы успешно вышли из системы",
      });
      
      navigate('/auth');
    } catch (error) {
      console.error('Error in signOut function:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
