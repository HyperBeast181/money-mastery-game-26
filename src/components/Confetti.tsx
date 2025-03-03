
import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 2000 }) => {
  const [pieces, setPieces] = useState<Array<any>>([]);
  const [animationEnded, setAnimationEnded] = useState(false);
  
  useEffect(() => {
    if (active && !animationEnded) {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
      const newPieces = [];
      
      // Create 50 confetti pieces
      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          y: -20,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.6 + 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.random() > 0.5 ? 'circle' : 'rect',
        });
      }
      
      setPieces(newPieces);
      
      // End animation after duration
      const timer = setTimeout(() => {
        setAnimationEnded(true);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [active, animationEnded, duration]);
  
  if (!active || animationEnded || pieces.length === 0) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-falling"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
            animation: `falling ${1 + Math.random()}s linear forwards, rotation ${0.5 + Math.random() * 1}s infinite linear`,
          }}
        >
          {piece.shape === 'circle' ? (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: piece.color }}
            ></div>
          ) : (
            <div
              className="w-3 h-3"
              style={{ backgroundColor: piece.color }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Confetti;
