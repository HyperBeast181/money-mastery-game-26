
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
        {language === 'en' ? "All" : "Все"}
      </button>
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${currentFilter === 'premium' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
        onClick={() => onFilterChange('premium')}
      >
        {language === 'en' ? "Premium" : "Премиум"}
      </button>
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${currentFilter === 'feature' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
        onClick={() => onFilterChange('feature')}
      >
        {language === 'en' ? "Features" : "Функции"}
      </button>
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${currentFilter === 'badge' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
        onClick={() => onFilterChange('badge')}
      >
        {language === 'en' ? "Badges" : "Значки"}
      </button>
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${currentFilter === 'benefit' ? 'bg-app-blue text-white' : 'bg-gray-100 text-app-text-light'}`}
        onClick={() => onFilterChange('benefit')}
      >
        {language === 'en' ? "Benefits" : "Выгоды"}
      </button>
    </div>
  );
};

export default RewardFilterComponent;
