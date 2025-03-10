
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { GiftCard } from '../types/rewards';
import { supabase } from '../integrations/supabase/client';

type VerificationType = 'none' | 'verified';

export const useRewards = (initialCoins: number) => {
  const [userCoins, setUserCoins] = useState(initialCoins);
  const [gifts, setGifts] = useState<GiftCard[]>([]);
  const [selectedGift, setSelectedGift] = useState<GiftCard | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [verificationType, setVerificationType] = useState<VerificationType>('verified');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch gift cards from Supabase
  useEffect(() => {
    const fetchGiftCards = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('gift_cards')
          .select('*');
        
        if (error) {
          console.error('Error fetching gift cards:', error);
          return;
        }
        
        if (data && data.length > 0) {
          const formattedGifts: GiftCard[] = data.map(card => ({
            id: card.id,
            name: card.name,
            logo: card.logo,
            value: card.value,
            cost: card.cost,
            costDisplay: card.cost.toLocaleString(),
            bgColor: card.bg_color || 'bg-blue-500'
          }));
          
          setGifts(formattedGifts);
        } else {
          // Fallback for when no gift cards are found
          const defaultGifts: GiftCard[] = [
            {
              id: '1',
              name: 'OZON',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Ozon_logo.svg',
              value: 5,
              cost: 5000,
              costDisplay: '5 000',
              bgColor: 'bg-blue-500'
            },
            {
              id: '2',
              name: 'Яндекс',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Yandex_icon.svg/1200px-Yandex_icon.svg.png',
              value: 5,
              cost: 5000,
              costDisplay: '5 000',
              bgColor: 'bg-yellow-500'
            }
          ];
          setGifts(defaultGifts);
        }
      } catch (error) {
        console.error('Error in fetchGiftCards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiftCards();
  }, []);
  
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
  
  const handleRedeem = async () => {
    if (!selectedGift) return;
    
    if (userCoins < selectedGift.cost) {
      toast({
        title: "Недостаточно монет",
        description: "У вас недостаточно монет для получения этой подарочной карты",
        variant: "destructive",
      });
      return;
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Требуется вход в систему",
        description: "Пожалуйста, войдите в систему, чтобы получить подарочную карту",
        variant: "destructive",
      });
      return;
    }

    try {
      // Generate a gift card code
      const giftCode = Math.random().toString(36).substring(2, 10).toUpperCase();

      // Insert the redemption record
      const { error: insertError } = await supabase
        .from('user_gift_cards')
        .insert({
          user_id: user.id,
          gift_card_id: selectedGift.id,
          code: giftCode
        });

      if (insertError) {
        console.error('Error redeeming gift card:', insertError);
        toast({
          title: "Ошибка при получении карты",
          description: "Произошла ошибка при получении подарочной карты. Пожалуйста, попробуйте еще раз.",
          variant: "destructive",
        });
        return;
      }

      // Update user's coins
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          coins: userCoins - selectedGift.cost,
          total_earned: userCoins
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating user coins:', updateError);
      } else {
        // Update local state
        setUserCoins(prev => prev - selectedGift.cost);
      }
      
      // Show confetti
      setShowConfetti(true);
      
      // Show toast with code
      toast({
        title: "Подарочная карта получена!",
        description: `Ваш код: ${giftCode}`,
        variant: "default",
      });
      
      // Hide confetti after a few seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      // Reset selected gift
      setSelectedGift(null);
    } catch (error) {
      console.error('Error in handleRedeem:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при получении подарочной карты",
        variant: "destructive",
      });
    }
  };
    
  return {
    userCoins,
    gifts,
    selectedGift,
    showConfetti,
    verificationType,
    isLoading,
    setVerificationType,
    handleGiftSelect,
    handleRedeem,
    cancelRedemption: () => setSelectedGift(null)
  };
};
