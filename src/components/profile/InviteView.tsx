
import React, { useState } from 'react';
import { User } from '../../types';
import { ChevronLeft, Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InviteViewProps {
  user: User;
  onBack: () => void;
}

const InviteView: React.FC<InviteViewProps> = ({ user, onBack }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const referralCode = "ZOGO" + user.id.substring(0, 6).toUpperCase();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({
      title: "Код скопирован!",
      description: "Теперь вы можете поделиться им с друзьями",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-3">
          <ChevronLeft size={24} className="text-app-dark" />
        </button>
        <h2 className="text-2xl font-bold text-app-dark">Пригласить друзей</h2>
      </div>
      
      <div className="bg-app-light-blue rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-app-dark mb-2">Пригласите друзей</h3>
        <p className="text-app-text-light mb-4">
          Поделитесь своим реферальным кодом с друзьями и получите бонусные монеты, когда они присоединятся!
        </p>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1 bg-white rounded-lg p-3 font-mono font-medium text-center">
            {referralCode}
          </div>
          <button 
            onClick={handleCopy}
            className="bg-app-blue text-white p-3 rounded-lg"
          >
            {copied ? <Copy size={20} className="text-green-300" /> : <Copy size={20} />}
          </button>
        </div>
        
        <button className="w-full bg-app-blue text-white rounded-full py-3 flex items-center justify-center">
          <Share2 size={18} className="mr-2" />
          Поделиться
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-app-dark mb-4">Как это работает</h3>
        <div className="space-y-3">
          <div className="flex">
            <div className="w-8 h-8 bg-app-light-blue text-app-blue rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              1
            </div>
            <p className="text-app-text-light">Поделитесь своим реферальным кодом с друзьями</p>
          </div>
          <div className="flex">
            <div className="w-8 h-8 bg-app-light-blue text-app-blue rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              2
            </div>
            <p className="text-app-text-light">Друзья регистрируются используя ваш код</p>
          </div>
          <div className="flex">
            <div className="w-8 h-8 bg-app-light-blue text-app-blue rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              3
            </div>
            <p className="text-app-text-light">Вы оба получаете по 100 монет!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteView;
