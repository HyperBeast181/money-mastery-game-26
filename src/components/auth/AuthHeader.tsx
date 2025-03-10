
import { FC } from 'react';
import { Shield } from 'lucide-react';

interface AuthHeaderProps {
  isLogin: boolean;
}

const AuthHeader: FC<AuthHeaderProps> = ({ isLogin }) => {
  return (
    <div className="bg-app-blue p-6 text-white text-center">
      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
        <Shield size={32} className="text-white" />
      </div>
      <h1 className="text-2xl font-bold">
        {isLogin ? 'Вход в аккаунт' : 'Создание аккаунта'}
      </h1>
      <p className="text-white/80 mt-1">
        {isLogin 
          ? 'Войдите, чтобы продолжить обучение' 
          : 'Зарегистрируйтесь, чтобы начать обучение'}
      </p>
    </div>
  );
};

export default AuthHeader;
