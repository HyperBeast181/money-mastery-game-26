
import React, { useState } from 'react';
import { ChevronLeft, Copy, Share2, Check, Users } from 'lucide-react';
import { User } from '../../types';

interface InviteViewProps {
  user: User;
  onBack: () => void;
}

const InviteView: React.FC<InviteViewProps> = ({ user, onBack }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'ZOGO' + user.id.substring(0, 6).toUpperCase();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div>
      <div className="p-4 border-b border-gray-100 flex items-center">
        <button onClick={onBack} className="mr-3">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">Пригласить друзей</h2>
      </div>
      
      <div className="p-4">
        <div className="bg-app-blue rounded-xl p-5 text-white mb-6">
          <h3 className="text-xl font-semibold mb-2">Пригласите своих друзей</h3>
          <p className="text-white/80 mb-4">
            Вы оба получите 1000 монет, когда они присоединятся и завершат свой первый модуль.
          </p>
          
          <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center mb-4">
            <div className="font-mono font-bold text-lg">{referralCode}</div>
            <button 
              onClick={handleCopy}
              className="bg-white text-app-blue px-3 py-1 rounded-full text-sm font-medium flex items-center"
            >
              {copied ? (
                <>
                  <Check size={14} className="mr-1" /> Скопировано
                </>
              ) : (
                <>
                  <Copy size={14} className="mr-1" /> Копировать
                </>
              )}
            </button>
          </div>
          
          <button className="w-full bg-white text-app-blue font-medium py-2 rounded-lg flex items-center justify-center">
            <Share2 size={16} className="mr-2" />
            Поделиться приглашением
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Как это работает</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-app-light-blue rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="font-medium text-app-blue">1</span>
              </div>
              <div>
                <p className="font-medium">Поделитесь своим реферальным кодом с друзьями</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-app-light-blue rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="font-medium text-app-blue">2</span>
              </div>
              <div>
                <p className="font-medium">Они вводят ваш код при регистрации</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-app-light-blue rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="font-medium text-app-blue">3</span>
              </div>
              <div>
                <p className="font-medium">Они завершают свой первый модуль</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-app-light-blue rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="font-medium text-app-blue">4</span>
              </div>
              <div>
                <p className="font-medium">Вы оба получаете 1000 монет</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteView;
