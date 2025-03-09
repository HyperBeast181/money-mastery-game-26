
import { FC } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RewardFilter } from '../../types/rewards';

interface RewardFilterProps {
  currentFilter: RewardFilter;
  onFilterChange: (filter: RewardFilter) => void;
}

const RewardFilterComponent: FC<RewardFilterProps> = ({ currentFilter, onFilterChange }) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${currentFilter === 'all' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
        onClick={() => onFilterChange('all')}
      >
        Все
      </button>
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${currentFilter === 'premium' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
        onClick={() => onFilterChange('premium')}
      >
        Премиум
      </button>
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${currentFilter === 'feature' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
        onClick={() => onFilterChange('feature')}
      >
        Функции
      </button>
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${currentFilter === 'badge' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
        onClick={() => onFilterChange('badge')}
      >
        Значки
      </button>
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${currentFilter === 'benefit' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
        onClick={() => onFilterChange('benefit')}
      >
        Выгоды
      </button>
    </div>
  );
};

export default RewardFilterComponent;
