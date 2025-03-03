
import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modules as allModules, currentUser } from '../data/modules';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import ModuleDetail from '../components/ModuleDetail';
import { Module } from '../types';
import { useToast } from '@/hooks/use-toast';

const ModuleView: FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (moduleId) {
      const foundModule = allModules.find(m => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
      } else {
        navigate('/learning-path');
        toast({
          title: "Module not found",
          description: "The module you're looking for doesn't exist.",
          variant: "destructive",
        });
      }
    }
  }, [moduleId, navigate, toast]);
  
  const handleUpdateProgress = (moduleId: string, newProgress: number) => {
    setModule(prevModule => {
      if (prevModule) {
        return {
          ...prevModule,
          progress: newProgress,
          status: newProgress === 100 ? 'completed' : 'in-progress'
        };
      }
      return prevModule;
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar user={currentUser} showBackButton />
      
      <div className="p-4">
        {module && (
          <ModuleDetail 
            module={module} 
            onBack={() => navigate('/learning-path')}
            onUpdateProgress={handleUpdateProgress}
          />
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default ModuleView;
