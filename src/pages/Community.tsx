
import { FC, useState } from 'react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { leaderboardUsers, currentUser } from '../data';
import TriviaQuiz from '../components/community/TriviaQuiz';
import { useToast } from '@/hooks/use-toast';
import { Trophy, Users } from 'lucide-react';

const Community: FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [userCoins, setUserCoins] = useState(currentUser.coins);
  const { toast } = useToast();
  
  const handleQuizComplete = (score: number) => {
    const coinsEarned = Math.floor(score / 10);
    setUserCoins(prev => prev + coinsEarned);
    
    // В реальном приложении здесь будет запрос к API для обновления монет пользователя
    toast({
      title: 'Монеты добавлены!',
      description: `${coinsEarned} монет добавлено на ваш счёт.`,
      variant: 'default',
    });
    
    setShowQuiz(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={{...currentUser, coins: userCoins}} title="Сообщество" />
      
      <div className="px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-app-dark mb-3">
            Финансовая викторина
          </h2>
          <p className="text-app-text-light mb-5">
            Проверьте свои знания и заработайте монеты!
          </p>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-app-light-blue flex items-center justify-center mr-4">
                <Trophy size={24} className="text-app-blue" />
              </div>
              <div>
                <h3 className="font-bold text-app-dark text-lg">
                  Ежедневная финансовая викторина
                </h3>
                <p className="text-app-text-light">
                  Отвечайте правильно на вопросы, чтобы заработать монеты
                </p>
              </div>
            </div>
            
            <button 
              className="w-full bg-app-blue text-white font-semibold py-3 rounded-xl hover:bg-app-blue/90 transition-colors"
              onClick={() => setShowQuiz(true)}
            >
              Начать викторину
            </button>
          </div>
          
          <div className="mb-5">
            <div className="flex items-center mb-4">
              <Users size={20} className="text-app-blue mr-2" />
              <h3 className="font-bold text-app-dark">
                Таблица лидеров
              </h3>
            </div>
            
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
          
          <div className="flex items-center justify-center mt-4 text-app-text-light text-sm">
            <div className="flex -space-x-2 mr-2">
              <div className="w-6 h-6 rounded-full bg-red-400 border-2 border-gray-50"></div>
              <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-gray-50"></div>
              <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-gray-50"></div>
            </div>
            645 Игроков
          </div>
        </div>
      </div>
      
      {showQuiz && <TriviaQuiz onClose={() => setShowQuiz(false)} onComplete={handleQuizComplete} />}
      
      <NavBar />
    </div>
  );
};

export default Community;
