
import { FC } from 'react';
import { User } from 'lucide-react';

interface GiftCardVerificationProps {
  onVerify: () => void;
}

const GiftCardVerification: FC<GiftCardVerificationProps> = ({ onVerify }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center mb-3">
          <User size={24} className="text-gray-500" />
        </div>
        
        <h3 className="text-xl font-bold mb-1">
          Получение подарочных карт
        </h3>
        
        <p className="text-app-text-light mb-4 max-w-md">
          Подтвердите вашу личность, чтобы начать обменивать монеты на подарочные карты. 
          (Это нужно сделать только один раз.)
        </p>
        
        <button 
          onClick={onVerify}
          className="w-full bg-blue-500 text-white font-medium py-3 rounded-full"
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
};

export default GiftCardVerification;
