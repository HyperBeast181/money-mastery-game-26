
import { FC, useState } from 'react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { leaderboardUsers, triviaEvents, currentUser } from '../data/modules';
import { Plus } from 'lucide-react';

const Community: FC = () => {
  const [activeTab, setActiveTab] = useState<'party' | 'fairwin' | 'friends'>('party');
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-app-blue text-white">
        <TopBar user={currentUser} title="Сообщество" />
        
        <div className="p-4 flex items-center justify-between">
          <div className="flex space-x-2 overflow-x-auto pb-2 w-full">
            <button 
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap ${activeTab === 'party' ? 'bg-app-dark' : 'bg-white/20'}`}
              onClick={() => setActiveTab('party')}
            >
              Вечеринка
            </button>
            <button 
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap ${activeTab === 'fairwin' ? 'bg-app-dark' : 'bg-white/20'}`}
              onClick={() => setActiveTab('fairwin')}
            >
              FAIRWIN
            </button>
            <button 
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap ${activeTab === 'friends' ? 'bg-app-dark' : 'bg-white/20'}`}
              onClick={() => setActiveTab('friends')}
            >
              Друзья
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Plus size={18} />
            </button>
          </div>
          
          <button className="ml-2 px-4 py-1 rounded-full bg-white/10 font-medium text-sm whitespace-nowrap">
            Правила
          </button>
        </div>
      </div>
      
      <div className="px-4 py-6">
        {activeTab === 'party' && (
          <div className="animate-fade-in">
            {triviaEvents.map(event => (
              <div key={event.id} className="bg-app-blue rounded-2xl overflow-hidden mb-6">
                <div className="p-4 text-white">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <img src={event.icon} alt="Иконка события" className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{event.title}</h2>
                      <p className="text-white/80">
                        {event.description} <span className="flex items-center inline-flex">
                          <span className="w-4 h-4 bg-app-yellow rounded-full flex items-center justify-center mr-1">
                            <span className="text-[10px] text-app-dark">¢</span>
                          </span> 
                          {event.prize.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/10 p-4 text-white">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{event.date}</span>
                    <span className="text-sm opacity-80">Играйте ежедневно. Выигрывайте призы.</span>
                  </div>
                  
                  <div className="flex items-center mt-2 text-sm opacity-80">
                    <div className="flex -space-x-2 mr-2">
                      <div className="w-6 h-6 rounded-full bg-red-400 border-2 border-app-blue"></div>
                      <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-app-blue"></div>
                      <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-app-blue"></div>
                    </div>
                    {event.participants} ИГРАЮТ
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mb-6">
              <div className="space-y-3">
                {leaderboardUsers.map(user => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-app-blue rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {user.position}
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-app-dark">{user.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="font-medium text-app-dark mr-1">{(user.coins / 1000).toFixed(1)}k</span>
                      <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center">
                        <span className="text-xs text-app-dark">¢</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-app-blue text-white font-semibold py-4 rounded-xl shadow-md hover:bg-app-blue/90 transition-colors">
              Присоединиться к Викторине
            </button>
            
            <div className="flex items-center justify-center mt-4 text-app-text-light text-sm">
              <div className="flex -space-x-2 mr-2">
                <div className="w-6 h-6 rounded-full bg-red-400 border-2 border-gray-50"></div>
                <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-gray-50"></div>
                <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-gray-50"></div>
              </div>
              645 Игроков
            </div>
          </div>
        )}
        
        {activeTab === 'fairwin' && (
          <div className="flex items-center justify-center h-40 text-app-text-light">
            Контент FAIRWIN скоро появится!
          </div>
        )}
        
        {activeTab === 'friends' && (
          <div className="flex items-center justify-center h-40 text-app-text-light">
            Контент Друзей скоро появится!
          </div>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default Community;
