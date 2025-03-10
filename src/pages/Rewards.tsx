
import { FC, useState, useEffect } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { useRewards } from '../hooks/useRewards';
import GiftCardsGrid from '../components/rewards/GiftCardsGrid';
import GiftCardVerification from '../components/rewards/GiftCardVerification';
import GiftCardRedemption from '../components/rewards/GiftCardRedemption';
import { supabase } from '../integrations/supabase/client';
import { useLanguage } from '../context/LanguageContext';

const Rewards: FC = () => {
  const { t } = useLanguage();
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [userCoinsState, setUserCoinsState] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Redirect to auth page if not authenticated
        navigate('/auth');
        return;
      }
      
      try {
        // Get user profile
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching user profile:', error);
          return;
        }
        
        if (profile) {
          setUser({
            id: user.id,
            name: profile.name,
            avatar: profile.avatar,
            coins: profile.coins,
            xp: profile.xp,
            streak: profile.streak,
            hearts: profile.hearts,
            joinedDate: new Date(profile.joined_date).toLocaleDateString('ru-RU', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            }),
            completedModules: profile.completed_modules,
            totalEarned: profile.total_earned,
            badges: []
          });
          setUserCoinsState(profile.coins);
        }
      } catch (error) {
        console.error('Error in checkUser:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      } else if (event === 'SIGNED_IN' && session) {
        // Refresh user data on sign in
        checkUser();
      }
    });
    
    return () => {
      // Clean up subscription
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);
  
  const { 
    gifts, 
    selectedGift, 
    showConfetti, 
    handleGiftSelect, 
    handleRedeem,
    cancelRedemption,
    verificationType,
    setVerificationType
  } = useRewards(userCoinsState);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-app-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return null; // This should not happen as navigate would redirect
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={user} title="Маркетплейс" />
      
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} />
      )}
      
      <div className="p-4">
        <div className="bg-white rounded-2xl px-5 py-6">
          <h2 className="text-3xl font-bold text-app-dark">
            Маркетплейс
          </h2>
          <p className="text-app-text-light mb-6">
            Обменяйте ваши монеты на подарочные карты
          </p>
          
          <div className="mb-6">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-full font-medium">
              Подарочные карты
            </button>
          </div>
          
          {verificationType === 'none' ? (
            <>
              <GiftCardVerification onVerify={() => setVerificationType('verified')} />
              
              {/* Отображаем карты даже если пользователь не верифицирован */}
              <div className="mt-6">
                <GiftCardsGrid gifts={gifts} onGiftSelect={handleGiftSelect} />
              </div>
            </>
          ) : (
            <>
              {selectedGift ? (
                <GiftCardRedemption 
                  gift={selectedGift} 
                  onCancel={cancelRedemption}
                  onConfirm={handleRedeem}
                />
              ) : (
                <GiftCardsGrid gifts={gifts} onGiftSelect={handleGiftSelect} />
              )}
            </>
          )}
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Rewards;
