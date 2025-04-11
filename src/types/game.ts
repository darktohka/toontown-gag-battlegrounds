
export enum GagType {
  THROW = 'throw',
  SQUIRT = 'squirt',
  DROP = 'drop',
  SOUND = 'sound',
  TRAP = 'trap',
  LURE = 'lure',
  TOON_UP = 'toon-up',
}

export interface Gag {
  id: string;
  name: string;
  type: GagType;
  damage: number;
  accuracy: number;
  description: string;
  icon: string;
  animation: string;
  sound?: string;
}

export enum CogType {
  BOSSBOT = 'bossbot',
  LAWBOT = 'lawbot',
  CASHBOT = 'cashbot',
  SELLBOT = 'sellbot',
}

export interface Cog {
  id: string;
  name: string;
  type: CogType;
  level: number;
  maxHealth: number;
  currentHealth: number;
  image: string;
}

export interface Toon {
  id: string;
  name: string;
  maxLaff: number;
  currentLaff: number;
  gags: Gag[];
}

export enum BattleStatus {
  SELECTING_GAG = 'selecting-gag',
  ANIMATING_ATTACK = 'animating-attack',
  COG_ATTACKING = 'cog-attacking',
  BATTLE_ENDED = 'battle-ended',
}

export interface BattleState {
  toon: Toon;
  cog: Cog;
  status: BattleStatus;
  selectedGag: Gag | null;
  battleLog: string[];
  turnCount: number;
}
