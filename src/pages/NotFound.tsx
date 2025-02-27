
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-app-light-blue rounded-full flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-app-blue">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-app-dark">404</h1>
        <p className="text-xl text-app-text mb-8">Oops! This page doesn't exist.</p>
        <Link 
          to="/" 
          className="bg-app-blue text-white font-medium px-8 py-3 rounded-full inline-block shadow-lg shadow-app-blue/20 hover:bg-app-blue/90 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
