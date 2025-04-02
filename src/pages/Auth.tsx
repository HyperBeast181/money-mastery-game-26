
import { FC, useState } from 'react';
import AuthHeader from '../components/auth/AuthHeader';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import SocialAuth from '../components/auth/SocialAuth';

const Auth: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm overflow-hidden">
        <AuthHeader isLogin={isLogin} />
        
        <div className="p-6">
          {isLogin ? (
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              switchToRegister={switchToRegister}
            />
          ) : (
            <RegisterForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              name={name}
              setName={setName}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              switchToLogin={switchToLogin}
            />
          )}
          
          <SocialAuth />
        </div>
      </div>
    </div>
  );
};

export default Auth;
