
import { FC } from 'react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { currentUser } from '../data/modules';
import { ChevronRight } from 'lucide-react';

const Profile: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-app-blue h-40 relative">
        <TopBar showBackButton color="blue" showEdit />
        
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-app-blue/0 to-app-blue"></div>
      </div>
      
      <div className="bg-white rounded-t-3xl -mt-5 p-6 relative z-10">
        <div className="flex flex-col items-center -mt-16 mb-4">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mb-2">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-app-dark">{currentUser.name}</h2>
          <p className="text-app-text-light text-sm">Joined {currentUser.joinedDate}</p>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <div className="flex items-center mb-1">
              <span className="w-6 h-6 bg-app-yellow rounded-full flex items-center justify-center">
                <span className="text-xs text-app-dark">¢</span>
              </span>
            </div>
            <span className="text-lg font-bold text-app-dark">{currentUser.coins}</span>
            <span className="text-xs text-app-text-light">Coins</span>
          </div>
          
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <div className="flex items-center mb-1">
              <span className="w-6 h-6 bg-app-red rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </span>
            </div>
            <span className="text-lg font-bold text-app-dark">{currentUser.streak}</span>
            <span className="text-xs text-app-text-light">Day Streak</span>
          </div>
          
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <div className="flex items-center mb-1">
              <span className="w-6 h-6 bg-app-blue rounded-full flex items-center justify-center">
                <span className="text-xs text-white">XP</span>
              </span>
            </div>
            <span className="text-lg font-bold text-app-dark">{currentUser.xp.toLocaleString()}</span>
            <span className="text-xs text-app-text-light">XP</span>
          </div>
          
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <div className="flex items-center mb-1">
              <span className="w-6 h-6 bg-app-red rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </span>
            </div>
            <span className="text-lg font-bold text-app-dark">{currentUser.hearts}</span>
            <span className="text-xs text-app-text-light">Hearts</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse-light mb-3 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-gray-400">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-app-dark mb-1">No badges yet</h3>
            <p className="text-app-text-light text-sm text-center mb-4">Complete skills to earn badges.</p>
            
            <div className="flex justify-between w-full px-4 py-2 border-t border-gray-100">
              <div className="flex items-center">
                <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs text-app-dark">¢</span>
                </span>
                <span className="text-app-dark">{currentUser.totalEarned}</span>
                <span className="mx-2 text-app-text-light">Total Earned</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-app-dark">{currentUser.completedModules}</span>
                <span className="ml-2 text-app-text-light">Total Modules</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-app-dark">Refer friends</h3>
              <p className="text-app-text-light text-sm">Earn coins when your friends join Zogo.</p>
            </div>
            <div className="flex items-center">
              <span className="text-app-dark font-medium mr-1">1.0k</span>
              <span className="w-5 h-5 bg-app-yellow rounded-full flex items-center justify-center">
                <span className="text-xs text-app-dark">¢</span>
              </span>
            </div>
          </div>
          
          <button className="w-full bg-app-light-blue text-app-blue font-medium py-3 rounded-full">
            Share
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="divide-y divide-gray-100">
            <button className="w-full flex items-center justify-between p-4 text-left">
              <span className="font-medium text-app-dark">FAQs</span>
              <ChevronRight size={18} className="text-app-text-light" />
            </button>
            <button className="w-full flex items-center justify-between p-4 text-left">
              <span className="font-medium text-app-dark">Settings</span>
              <ChevronRight size={18} className="text-app-text-light" />
            </button>
          </div>
        </div>
        
        <button className="w-full text-app-blue font-medium mt-6">
          Log Out
        </button>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Profile;
