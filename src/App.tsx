
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

// Protected route component
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-app-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
}

// App routes with auth provider
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
