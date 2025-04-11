
import { Cog } from '../types/game';
import { cn } from '@/lib/utils';

interface CogDisplayProps {
  cog: Cog;
  damaged: boolean;
}

const CogDisplay = ({ cog, damaged }: CogDisplayProps) => {
  const healthPercentage = (cog.currentHealth / cog.maxHealth) * 100;
  
  return (
    <div className="flex flex-col items-center">
      <div className={cn("cog text-9xl", damaged && "damaged")}>
        {cog.image}
      </div>
      <div className="mt-4 w-full">
        <h2 className="text-xl font-bold">{cog.name}</h2>
        <p className="text-sm">Level {cog.level} {cog.type}</p>
        <div className="mt-2 cog-health-bar">
          <div 
            className="cog-health-fill" 
            style={{ width: `${healthPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-center mt-1">{cog.currentHealth}/{cog.maxHealth}</p>
      </div>
    </div>
  );
};

export default CogDisplay;
