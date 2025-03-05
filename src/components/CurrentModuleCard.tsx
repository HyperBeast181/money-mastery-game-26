
import React from 'react';
import { Bolt } from 'lucide-react';

interface CurrentModuleProps {
  id: string;
  title: string;
  participants: number;
  coins: number;
  progress: number;
  onClick: () => void;
}

const CurrentModuleCard: React.FC<CurrentModuleProps> = ({
  id,
  title,
  participants,
  coins,
  progress,
  onClick
}) => {
  return (
    <div 
      className="bg-white rounded-xl p-3 border border-gray-100 hover:shadow-md hover-scale cursor-pointer animate-scale-in"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
            <Bolt size={16} className="text-yellow-500" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-2">{progress > 0 ? 'В процессе' : 'Не начат'}</span>
              <span>{participants}+ участников</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="flex items-center font-medium text-yellow-600 bg-yellow-50 rounded-full px-2 py-1 text-sm">
            <span className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center mr-1">
              <span className="text-xs text-yellow-800">¢</span>
            </span>
            {coins}+
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentModuleCard;
