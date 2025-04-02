
import { FC } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { useToast } from '../../hooks/use-toast';

const SocialAuth: FC = () => {
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        console.error('Google sign in error:', error);
        toast({
          title: 'Ошибка входа',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Google sign in exception:', error);
      toast({
        title: 'Ошибка',
        description: error.message || 'Произошла неизвестная ошибка',
        variant: 'destructive',
      });
    }
  };

  return (
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
  );
};

export default SocialAuth;
