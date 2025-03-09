
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { GiftCard } from '../types/rewards';

// Массив доступных подарочных карт
const giftCards: GiftCard[] = [
  {
    id: 'roblox',
    name: 'Roblox',
    logo: '/lovable-uploads/2efecd15-1681-4717-878a-db9a2b6912a6.png',
    value: 5,
    cost: 5000,
    costDisplay: '5,000',
    bgColor: 'bg-gray-500'
  },
  {
    id: 'apple',
    name: 'Apple',
    logo: '/lovable-uploads/5130cba0-a6d2-491c-87a6-3cfe915cc3ef.png',
    value: 5,
    cost: 5000,
    costDisplay: '5,000',
    bgColor: 'bg-gray-500'
  },
  {
    id: 'ozon',
    name: 'OZON',
    logo: 'https://companieslogo.com/img/orig/OZON-D3D094AF.png?t=1633204875',
    value: 5,
    cost: 5000,
    costDisplay: '5,000',
    bgColor: 'bg-blue-400'
  },
  {
    id: 'yandex',
    name: 'Яндекс',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Yandex_icon.svg/2048px-Yandex_icon.svg.png',
    value: 5,
    cost: 5000,
    costDisplay: '5,000',
    bgColor: 'bg-yellow-400'
  },
  {
    id: 'wildberries',
    name: 'Wildberries',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Wildberries_logo_icon_2020.jpg/1200px-Wildberries_logo_icon_2020.jpg',
    value: 5,
    cost: 5000,
    costDisplay: '5,000',
    bgColor: 'bg-purple-500'
  },
];

type VerificationType = 'none' | 'verified';

export const useRewards = (initialCoins: number) => {
  const [userCoins, setUserCoins] = useState(initialCoins);
  const [gifts, setGifts] = useState<GiftCard[]>(giftCards);
  const [selectedGift, setSelectedGift] = useState<GiftCard | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [verificationType, setVerificationType] = useState<VerificationType>('verified'); // По умолчанию устанавливаем "verified" для демонстрации
  const { toast } = useToast();
  
  const handleGiftSelect = (gift: GiftCard) => {
    if (verificationType !== 'verified') {
      toast({
        title: "Требуется верификация",
        description: "Пожалуйста, пройдите верификацию, прежде чем получить подарочную карту",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedGift(gift);
  };
  
  const handleRedeem = () => {
    if (!selectedGift) return;
    
    if (userCoins < selectedGift.cost) {
      toast({
        title: "Недостаточно монет",
        description: "У вас недостаточно монет для получения этой подарочной карты",
        variant: "destructive",
      });
      return;
    }
    
    // Обновляем монеты пользователя
    setUserCoins(prev => prev - selectedGift.cost);
    
    // Показываем конфетти
    setShowConfetti(true);
    
    // Скрываем конфетти через несколько секунд
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    
    // Сбрасываем выбранную карту
    setSelectedGift(null);
  };
    
  return {
    userCoins,
    gifts,
    selectedGift,
    showConfetti,
    verificationType,
    setVerificationType,
    handleGiftSelect,
    handleRedeem,
    cancelRedemption: () => setSelectedGift(null)
  };
};
