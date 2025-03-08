
import React from 'react';

interface TabToggleProps {
  activeTab: 'skills' | 'completed';
  setActiveTab: (tab: 'skills' | 'completed') => void;
}

const TabToggle: React.FC<TabToggleProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-gray-100 p-1 rounded-full mb-6 flex">
      <button 
        className={`tab-button flex-1 ${activeTab === 'skills' ? 'active' : ''}`}
        onClick={() => setActiveTab('skills')}
      >
        Мои навыки
      </button>
      <button 
        className={`tab-button flex-1 ${activeTab === 'completed' ? 'active' : ''}`}
        onClick={() => setActiveTab('completed')}
      >
        Завершено
      </button>
    </div>
  );
};

export default TabToggle;
