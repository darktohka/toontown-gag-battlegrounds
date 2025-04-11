
import { useEffect, useState } from 'react';
import { Gag, GagType } from '../types/game';

interface AnimatedAttackProps {
  gag: Gag;
  onComplete: () => void;
}

const AnimatedAttack = ({ gag, onComplete }: AnimatedAttackProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    if (gag.type === GagType.THROW) {
      // Animation for throw gags
      setPosition({ x: -100, y: 100 });
      
      timeout = setTimeout(() => {
        setPosition({ x: 0, y: 0 });
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 500);
      }, 100);
    } else if (gag.type === GagType.SQUIRT) {
      // Animation for squirt gags
      setPosition({ x: -100, y: 0 });
      
      timeout = setTimeout(() => {
        setPosition({ x: 0, y: 0 });
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 500);
      }, 100);
    } else if (gag.type === GagType.DROP) {
      // Animation for drop gags
      setPosition({ x: 0, y: -100 });
      
      timeout = setTimeout(() => {
        setPosition({ x: 0, y: 0 });
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 500);
      }, 100);
    } else if (gag.type === GagType.TOON_UP) {
      // Animation for toon-up gags
      setPosition({ x: 0, y: 0 });
      
      timeout = setTimeout(() => {
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 1000);
      }, 100);
    } else {
      // Default animation
      setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 1000);
    }
    
    return () => clearTimeout(timeout);
  }, [gag, onComplete]);
  
  if (!visible) return null;
  
  return (
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl transition-all duration-500 ease-in-out"
      style={{ 
        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
      }}
    >
      <div 
        className={`
          ${gag.animation === 'throw' ? 'animate-bounce' : ''}
          ${gag.animation === 'squirt' ? 'animate-pulse' : ''}
          ${gag.animation === 'drop' ? 'animate-bounce' : ''}
          ${gag.animation === 'sound' ? 'animate-pulse' : ''}
          ${gag.animation === 'heal' ? 'animate-spin-slow' : ''}
        `}
      >
        {gag.icon}
      </div>
      {gag.type === GagType.THROW && position.x === 0 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl">
          <div className="animate-splat text-9xl">💥</div>
        </div>
      )}
    </div>
  );
};

export default AnimatedAttack;
