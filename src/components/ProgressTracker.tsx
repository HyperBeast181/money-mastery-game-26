
import { FC } from 'react';

interface ProgressTrackerProps {
  progress: number;
  colorClass?: string;
  height?: string;
  showPercentage?: boolean;
  animate?: boolean;
}

const ProgressTracker: FC<ProgressTrackerProps> = ({
  progress,
  colorClass = 'bg-app-blue',
  height = 'h-2',
  showPercentage = false,
  animate = true
}) => {
  return (
    <div className="w-full">
      <div className={`progress-bar ${height}`}>
        <div 
          className={`progress-bar-fill ${colorClass} ${animate ? 'animate-slide-in' : ''}`} 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {showPercentage && (
        <div className="text-xs text-app-text-light mt-1 text-right">
          {progress}%
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
