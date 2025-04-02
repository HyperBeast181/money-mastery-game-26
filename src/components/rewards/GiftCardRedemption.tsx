
import { FC, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { GiftCard } from '../../types/rewards';

interface GiftCardRedemptionProps {
  gift: GiftCard;
  onCancel: () => void;
  onConfirm: () => void;
}

const GiftCardRedemption: FC<GiftCardRedemptionProps> = ({ gift, onCancel, onConfirm }) => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const { toast } = useToast();
  
  const handleRedeem = () => {
    setIsRedeeming(true);
    
    // Process redemption
    setTimeout(() => {
      onConfirm();
      setIsRedeeming(false);
    }, 1500);
  };
  
  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-xl">
      <div className={`p-4 ${gift.bgColor} rounded-lg mb-4`}>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img src={gift.logo} alt={gift.name} className="w-8 h-8 object-contain" />
          </div>
          <h3 className="ml-3 text-xl font-semibold text-white">{gift.name}</h3>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-app-dark mb-3">
        Подтверждение
      </h3>
      <p className="text-app-text-light mb-3">
        Вы собираетесь обменять <strong>{gift.costDisplay}</strong> монет на подарочную карту {gift.name} стоимостью <strong>${gift.value}</strong>.
      </p>
      <p className="text-app-text-light mb-4">
        Подарочная карта будет доступна мгновенно после обмена.
      </p>
      
      <div className="flex justify-end space-x-3">
        <button 
          onClick={onCancel}
          className="py-2 px-4 rounded-full text-app-text-light font-medium hover:bg-gray-100"
          disabled={isRedeeming}
        >
          Отмена
        </button>
        <button 
          onClick={handleRedeem}
          className={`bg-app-blue text-white py-2 px-4 rounded-full font-medium ${isRedeeming ? 'opacity-75' : ''}`}
          disabled={isRedeeming}
        >
          {isRedeeming ? (
            <span className="flex items-center">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              Обработка...
            </span>
          ) : 'Получить'}
        </button>
      </div>
    </div>
  );
};

export default GiftCardRedemption;
