
import { Cog, CogType } from '../types/game';

export const cogs: Cog[] = [
  {
    id: 'cold-caller',
    name: 'Cold Caller',
    type: CogType.SELLBOT,
    level: 1,
    maxHealth: 12,
    currentHealth: 12,
    image: '🤖'
  },
  {
    id: 'telemarketer',
    name: 'Telemarketer',
    type: CogType.SELLBOT,
    level: 2,
    maxHealth: 20,
    currentHealth: 20,
    image: '🤖'
  },
  {
    id: 'name-dropper',
    name: 'Name Dropper',
    type: CogType.SELLBOT,
    level: 3,
    maxHealth: 30,
    currentHealth: 30,
    image: '🤖'
  },
  {
    id: 'glad-hander',
    name: 'Glad Hander',
    type: CogType.SELLBOT,
    level: 4,
    maxHealth: 40,
    currentHealth: 40,
    image: '🤖'
  },
  {
    id: 'bottom-feeder',
    name: 'Bottom Feeder',
    type: CogType.CASHBOT,
    level: 1,
    maxHealth: 12,
    currentHealth: 12,
    image: '🤖'
  },
  {
    id: 'short-change',
    name: 'Short Change',
    type: CogType.CASHBOT,
    level: 2,
    maxHealth: 20,
    currentHealth: 20,
    image: '🤖'
  },
  {
    id: 'penny-pincher',
    name: 'Penny Pincher',
    type: CogType.CASHBOT,
    level: 3,
    maxHealth: 30,
    currentHealth: 30,
    image: '🤖'
  },
  {
    id: 'tightwad',
    name: 'Tightwad',
    type: CogType.CASHBOT,
    level: 4,
    maxHealth: 40,
    currentHealth: 40,
    image: '🤖'
  }
];
