
import { Button } from "@/components/ui/button";
import { Gag, BattleStatus, Toon } from '../types/game';
import GagButton from './GagButton';
import { toast } from "sonner";

interface BattleControlsProps {
  toon: Toon;
  selectedGag: Gag | null;
  onSelectGag: (gag: Gag) => void;
  onUseGag: () => void;
  status: BattleStatus;
  onRestartBattle: () => void;
}

const BattleControls = ({ 
  toon, 
  selectedGag, 
  onSelectGag, 
  onUseGag, 
  status,
  onRestartBattle
}: BattleControlsProps) => {
  const handleGagClick = (gag: Gag) => {
    toast.info(`Selected ${gag.name}!`);
    onSelectGag(gag);
  };
  
  const isSelectingGag = status === BattleStatus.SELECTING_GAG;
  const isBattleEnded = status === BattleStatus.BATTLE_ENDED;
  
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Your Gags</h2>
      
      {isBattleEnded ? (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Battle Ended!</h3>
          <Button 
            onClick={onRestartBattle}
            className="bg-toontown-blue hover:bg-toontown-blue/80 text-white"
          >
            Start New Battle
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {toon.gags.map((gag) => (
              <GagButton
                key={gag.id}
                gag={gag}
                onClick={handleGagClick}
                selected={selectedGag?.id === gag.id}
                disabled={!isSelectingGag}
              />
            ))}
          </div>
          
          {isSelectingGag && (
            <Button 
              onClick={onUseGag}
              disabled={!selectedGag}
              className="mt-4 px-8 py-6 text-lg bg-toontown-blue hover:bg-toontown-blue/80 text-white disabled:bg-gray-300"
            >
              {selectedGag ? `Use ${selectedGag.name}` : "Select a Gag"}
            </Button>
          )}
          
          {!isSelectingGag && !isBattleEnded && (
            <div className="animate-pulse text-lg font-bold">
              {status === BattleStatus.ANIMATING_ATTACK && "Using gag..."}
              {status === BattleStatus.COG_ATTACKING && "Cog is attacking..."}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BattleControls;
