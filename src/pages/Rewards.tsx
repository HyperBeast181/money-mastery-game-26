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
import { User } from '../types';
import { useAuth } from '../context/AuthContext';

const Rewards: FC = () => {
  const { t } = useLanguage();
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [userObject, setUserObject] = useState<User | null>(null);
  const [userCoinsState, setUserCoinsState] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user, profile } = useAuth();
  
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        // Redirect to auth page if not authenticated
        navigate('/auth');
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Use profile from context if available
        let profileData = profile;
        
        // Otherwise fetch from database
        if (!profileData) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();
          
          if (error) {
            console.error('Error fetching user profile:', error);
            return;
          }
          
          profileData = data;
        }
        
        if (profileData) {
          const userObj = {
            id: user.id,
            name: profileData.name || user.user_metadata?.name || 'Пользователь',
            avatar: profileData.avatar || '/lovable-uploads/66657bf7-1e19-4058-b7e6-4ff8bd5847d3.png',
            coins: profileData.coins || 0,
            xp: profileData.xp || 0,
            streak: profileData.streak || 0,
            hearts: profileData.hearts || 5,
            joinedDate: new Date(profileData.joined_date).toLocaleDateString('ru-RU', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            }),
            completedModules: profileData.completed_modules || 0,
            totalEarned: profileData.total_earned || 0,
            badges: []
          };
          
          setUserObject(userObj);
          setUserCoinsState(profileData.coins || 0);
        }
      } catch (error) {
        console.error('Error in loadUserData:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [user, profile, navigate]);
  
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
  
  if (!userObject) {
    return null; // This should not happen as navigate would redirect
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={userObject} title="Маркетплейс" />
      
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
