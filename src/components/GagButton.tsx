
import { useState } from 'react';
import { Gag } from '../types/game';
import { cn } from '@/lib/utils';

interface GagButtonProps {
  gag: Gag;
  onClick: (gag: Gag) => void;
  selected: boolean;
  disabled: boolean;
}

const GagButton = ({ gag, onClick, selected, disabled }: GagButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative">
      {isHovered && (
        <div className="absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-md bg-black p-2 text-xs text-white opacity-90">
          <p className="font-bold">{gag.name}</p>
          <p>{gag.description}</p>
          <p>Damage: {Math.abs(gag.damage)}</p>
          <p>Accuracy: {gag.accuracy}%</p>
        </div>
      )}
      <button
        onClick={() => onClick(gag)}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "gag-button",
          selected && "border-toontown-blue ring-2 ring-toontown-blue",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className="text-4xl">{gag.icon}</span>
        <p className="mt-2 text-xs font-bold">{gag.name}</p>
      </button>
    </div>
  );
};

export default GagButton;
