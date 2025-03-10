
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Community from './pages/Community';
import Rewards from './pages/Rewards';
import ModuleView from './pages/ModuleView';
import NotFound from './pages/NotFound';
import CategoryView from './pages/CategoryView';
import Auth from './pages/Auth';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Защищенный маршрут с увеличенным временем ожидания и дополнительной обработкой ошибок
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    console.log('ProtectedRoute состояние:', { 
      user: !!user, 
      userId: user?.id, 
      isLoading, 
      pathname: location.pathname 
    });
  }, [user, isLoading, location]);
  
  if (isLoading) {
    // Показываем индикатор загрузки пока проверяем статус аутентификации
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-app-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Проверка авторизации...</p>
        </div>
      </div>
    );
  }
  
  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!user) {
    console.log('Пользователь не авторизован, перенаправляем на /auth');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // Если пользователь авторизован, показываем защищенный контент
  console.log('Пользователь авторизован, показываем защищенный контент');
  return children;
}

// Маршруты приложения с провайдером аутентификации
function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
        <Route path="/learning-path" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
        <Route path="/module/:moduleId" element={<ProtectedRoute><ModuleView /></ProtectedRoute>} />
        <Route path="/category/:categoryId" element={<ProtectedRoute><CategoryView /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
