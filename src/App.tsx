
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import LearningPath from './pages/LearningPath';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Community from './pages/Community';
import Rewards from './pages/Rewards';
import ModuleView from './pages/ModuleView';
import NotFound from './pages/NotFound';
import CategoryView from './pages/CategoryView';
import { LanguageProvider } from './context/LanguageContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/community" element={<Community />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/module/:moduleId" element={<ModuleView />} />
            <Route path="/category/:categoryId" element={<CategoryView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
