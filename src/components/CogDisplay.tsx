
import { useTranslation } from 'react-i18next';
import { Cog } from '../types/game';
import { cn } from '@/lib/utils';

interface CogDisplayProps {
  cog: Cog;
  damaged: boolean;
}

const CogDisplay = ({ cog, damaged }: CogDisplayProps) => {
  const { t } = useTranslation();
  const healthPercentage = (cog.currentHealth / cog.maxHealth) * 100;
  
  return (
    <div className="flex flex-col items-center">
      <div className={cn("cog text-9xl", damaged && "damaged")}>
        {cog.image}
      </div>
      <div className="mt-4 w-full">
        <h2 className="text-xl font-bold">{cog.name}</h2>
        <p className="text-sm">{t('cog.level', { level: cog.level, type: cog.type })}</p>
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
