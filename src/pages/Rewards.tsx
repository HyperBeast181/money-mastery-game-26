
import { FC, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import Confetti from 'react-confetti';
import { currentUser } from '../data'; 
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { useRewards } from '../hooks/useRewards';
import GiftCardsGrid from '../components/rewards/GiftCardsGrid';
import GiftCardVerification from '../components/rewards/GiftCardVerification';
import GiftCardRedemption from '../components/rewards/GiftCardRedemption';
import { useLanguage } from '../context/LanguageContext';

const Rewards: FC = () => {
  const { t } = useLanguage();
  const { width, height } = useWindowSize();
  const { 
    userCoins, 
    gifts, 
    selectedGift, 
    showConfetti, 
    handleGiftSelect, 
    handleRedeem,
    cancelRedemption,
    verificationType,
    setVerificationType
  } = useRewards(currentUser.coins);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={{...currentUser, coins: userCoins}} title="Маркетплейс" />
      
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
