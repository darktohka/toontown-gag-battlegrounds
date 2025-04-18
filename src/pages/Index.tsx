
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ToonDisplay from '../components/ToonDisplay';
import CogDisplay from '../components/CogDisplay';
import BattleControls from '../components/BattleControls';
import BattleLog from '../components/BattleLog';
import AnimatedAttack from '../components/AnimatedAttack';
import { BattleState, BattleStatus, Cog, Gag, Toon } from '../types/game';
import { gags } from '../data/gags';
import { cogs } from '../data/cogs';
import { toast } from "sonner";

const getRandomCog = (): Cog => {
  const randomIndex = Math.floor(Math.random() * cogs.length);
  const selectedCog = { ...cogs[randomIndex] };
  // Reset health
  selectedCog.currentHealth = selectedCog.maxHealth;
  return selectedCog;
};

const initialToon: Toon = {
  id: 'player',
  name: 'Flippy',
  maxLaff: 50,
  currentLaff: 50,
  gags: gags
};

const Index = () => {
  const { t } = useTranslation();

  const initialState: BattleState = {
    toon: initialToon,
    cog: getRandomCog(),
    status: BattleStatus.SELECTING_GAG,
    selectedGag: null,
    battleLog: [t('battle.status.started')],
    turnCount: 1
  };

  const [battleState, setBattleState] = useState<BattleState>(initialState);
  const [cogDamaged, setCogDamaged] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (battleState.status === BattleStatus.COG_ATTACKING) {
      const timer = setTimeout(() => {
        handleCogAttack();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [battleState.status]);

  const selectGag = (gag: Gag) => {
    setBattleState((prev) => ({
      ...prev,
      selectedGag: gag
    }));
  };

  const useGag = () => {
    if (!battleState.selectedGag) return;
    
    setBattleState((prev) => ({
      ...prev,
      status: BattleStatus.ANIMATING_ATTACK
    }));
    
    setShowAnimation(true);
  };

  const handleAttackComplete = () => {
    setShowAnimation(false);
    const { selectedGag } = battleState;
    
    if (!selectedGag) return;
    
    // Check if attack hits based on accuracy
    const hitRoll = Math.random() * 100;
    const hit = hitRoll <= selectedGag.accuracy;
    
    if (hit) {
      if (selectedGag.damage < 0) {
        // It's a healing gag (Toon-Up)
        handleToonUp();
      } else {
        // It's a damaging gag
        handleDamageGag();
      }
    } else {
      // Attack missed
      setBattleState((prev) => ({
        ...prev,
        battleLog: [
          t('battle.turn', { 
            count: prev.turnCount, 
            action: t('battle.actions.missed', { name: selectedGag.name })
          }),
          ...prev.battleLog
        ],
        status: BattleStatus.COG_ATTACKING
      }));
      
      toast.error(t('battle.results.missed', { name: selectedGag.name }));
    }
  };

  const handleToonUp = () => {
    const { toon, selectedGag } = battleState;
    if (!selectedGag) return;
    
    const healAmount = Math.abs(selectedGag.damage);
    const newLaff = Math.min(toon.maxLaff, toon.currentLaff + healAmount);
    
    setBattleState((prev) => ({
      ...prev,
      toon: {
        ...prev.toon,
        currentLaff: newLaff
      },
      battleLog: [
        t('battle.turn', { 
          count: prev.turnCount, 
          action: t('battle.actions.healed', { name: selectedGag.name, amount: healAmount })
        }),
        ...prev.battleLog
      ],
      status: BattleStatus.COG_ATTACKING
    }));
    
    toast.success(t('battle.results.healed', { amount: healAmount }));
  };

  const handleDamageGag = () => {
    const { cog, selectedGag } = battleState;
    if (!selectedGag) return;
    
    const newHealth = Math.max(0, cog.currentHealth - selectedGag.damage);
    setCogDamaged(true);
    
    const updatedCog = {
      ...cog,
      currentHealth: newHealth
    };
    
    setBattleState((prev) => {
      const newState = {
        ...prev,
        cog: updatedCog,
        battleLog: [
          t('battle.turn', { 
            count: prev.turnCount, 
            action: t('battle.actions.used', { name: selectedGag.name, damage: selectedGag.damage })
          }),
          ...prev.battleLog
        ],
        status: newHealth <= 0 ? BattleStatus.BATTLE_ENDED : BattleStatus.COG_ATTACKING
      };

      return newState;
    });
    
    if (newHealth <= 0) {
      toast.success(t('battle.results.defeated', { name: cog.name }));
      
      setBattleState((prev) => ({
        ...prev,
        battleLog: [
          t('battle.status.defeated', { name: cog.name }),
          ...prev.battleLog
        ]
      }));
    } else {
      toast.success(t('battle.results.hit', { name: selectedGag.name, damage: selectedGag.damage }));
      
      // Reset the damaged state after animation
      setTimeout(() => {
        setCogDamaged(false);
      }, 500);
    }
  };

  const handleCogAttack = () => {
    const { toon, cog } = battleState;
    
    // Cog does damage based on its level
    const damageAmount = Math.floor(Math.random() * 3) + cog.level;
    const newLaff = Math.max(0, toon.currentLaff - damageAmount);
    
    const updatedToon = {
      ...toon,
      currentLaff: newLaff
    };
    
    setBattleState((prev) => ({
      ...prev,
      toon: updatedToon,
      battleLog: [
        t('battle.turn', { 
          count: prev.turnCount, 
          action: t('battle.actions.cogAttack', { name: cog.name, damage: damageAmount })
        }),
        ...prev.battleLog
      ],
      status: newLaff <= 0 ? BattleStatus.BATTLE_ENDED : BattleStatus.SELECTING_GAG,
      selectedGag: null,
      turnCount: prev.turnCount + 1
    }));
    
    if (newLaff <= 0) {
      toast.error(t('battle.status.gameOver'));
      
      setBattleState((prev) => ({
        ...prev,
        battleLog: [
          t('battle.status.gameOver'),
          ...prev.battleLog
        ]
      }));
    } else {
      toast.error(t('battle.results.cogHit', { name: cog.name, damage: damageAmount }));
    }
  };

  const restartBattle = () => {
    setBattleState({
      toon: {
        ...initialToon,
        currentLaff: initialToon.maxLaff
      },
      cog: getRandomCog(),
      status: BattleStatus.SELECTING_GAG,
      selectedGag: null,
      battleLog: [t('battle.status.started')],
      turnCount: 1
    });
    
    toast.info(t('controls.newBattle'));
  };

  return (
    <div className="min-h-screen bg-toontown-blue/10 py-8">
      <div className="container max-w-5xl mx-auto">
        <h1 className="mb-8 text-center text-4xl font-bold text-toontown-blue shadow-sm">
          {t('app.title')}
        </h1>
        
        <div className="grid gap-8 rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm">
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <ToonDisplay toon={battleState.toon} />
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <CogDisplay cog={battleState.cog} damaged={cogDamaged} />
            </div>
            
            {showAnimation && battleState.selectedGag && (
              <AnimatedAttack 
                gag={battleState.selectedGag} 
                onComplete={handleAttackComplete} 
              />
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-3">
              <BattleLog log={battleState.battleLog} />
            </div>
          </div>
          
          <BattleControls 
            toon={battleState.toon}
            selectedGag={battleState.selectedGag}
            onSelectGag={selectGag}
            onUseGag={useGag}
            status={battleState.status}
            onRestartBattle={restartBattle}
          />
        </div>
        
        <footer className="mt-8 text-center text-sm text-toontown-blue/70">
          <p>{t('app.footer')}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
