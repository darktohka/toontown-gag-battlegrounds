
import { useTranslation } from 'react-i18next';

interface BattleLogProps {
  log: string[];
}

const BattleLog = ({ log }: BattleLogProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="h-40 overflow-y-auto rounded-lg bg-white/80 p-4 shadow-inner">
      <h3 className="mb-2 font-bold">Battle Log</h3>
      <ul className="space-y-1 text-sm">
        {log.length > 0 ? (
          log.map((entry, index) => (
            <li key={index} className="border-b border-gray-200 pb-1">
              {entry}
            </li>
          ))
        ) : (
          <li className="text-gray-500">{t('battle.status.notStarted')}</li>
        )}
      </ul>
    </div>
  );
};

export default BattleLog;
