
import { FC } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Reward } from '../../types/rewards';

interface RedeemConfirmationProps {
  reward: Reward;
  onCancel: () => void;
  onConfirm: () => void;
}

const RedeemConfirmation: FC<RedeemConfirmationProps> = ({ reward, onCancel, onConfirm }) => {
  const { language } = useLanguage();
  
  return (
    <div className="mt-8 p-4 border border-gray-200 rounded-xl">
      <h3 className="text-xl font-bold text-app-dark mb-3">
        Получить награду
      </h3>
      <p className="text-app-text-light mb-4">
        Вы уверены, что хотите получить {reward.name}?
      </p>
      <div className="flex justify-end space-x-3">
        <button 
          onClick={onCancel}
          className="py-2 px-4 rounded-full text-app-text-light font-medium hover:bg-gray-100"
        >
          Отмена
        </button>
        <button 
          onClick={onConfirm}
          className="bg-app-blue text-white py-2 px-4 rounded-full font-medium"
        >
          Получить
        </button>
      </div>
    </div>
  );
};

export default RedeemConfirmation;
