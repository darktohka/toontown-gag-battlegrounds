
import { useTranslation } from 'react-i18next';
import { Toon } from '../types/game';

interface ToonDisplayProps {
  toon: Toon;
}

const ToonDisplay = ({ toon }: ToonDisplayProps) => {
  const { t } = useTranslation();
  const laffPercentage = (toon.currentLaff / toon.maxLaff) * 100;
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-9xl">
        🐶
      </div>
      <div className="mt-4 w-full">
        <h2 className="text-xl font-bold">{toon.name}</h2>
        <div className="mt-2 toon-health-bar">
          <div 
            className="toon-health-fill" 
            style={{ width: `${laffPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-center mt-1">
          {toon.currentLaff}/{toon.maxLaff} {t('toon.laff')}
        </p>
      </div>
    </div>
  );
};

export default ToonDisplay;
