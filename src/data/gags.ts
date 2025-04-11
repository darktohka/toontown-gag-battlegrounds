
import { Gag, GagType } from '../types/game';

export const gags: Gag[] = [
  {
    id: 'cupcake',
    name: 'Cupcake',
    type: GagType.THROW,
    damage: 4,
    accuracy: 75,
    description: 'A small cupcake that does minimal damage.',
    icon: '🧁',
    animation: 'throw'
  },
  {
    id: 'cream-pie',
    name: 'Cream Pie',
    type: GagType.THROW,
    damage: 18,
    accuracy: 75,
    description: 'A cream pie that does moderate damage.',
    icon: '🥧',
    animation: 'throw'
  },
  {
    id: 'squirting-flower',
    name: 'Squirting Flower',
    type: GagType.SQUIRT,
    damage: 4,
    accuracy: 95,
    description: 'A small flower that squirts water.',
    icon: '🌊',
    animation: 'squirt'
  },
  {
    id: 'fire-hose',
    name: 'Fire Hose',
    type: GagType.SQUIRT,
    damage: 15,
    accuracy: 95,
    description: 'A powerful fire hose that soaks the cogs.',
    icon: '🧯',
    animation: 'squirt'
  },
  {
    id: 'bike-horn',
    name: 'Bike Horn',
    type: GagType.SOUND,
    damage: 6,
    accuracy: 95,
    description: 'A small bike horn that affects all cogs.',
    icon: '📣',
    animation: 'sound',
    sound: 'honk'
  },
  {
    id: 'elephant-trunk',
    name: 'Elephant Trunk',
    type: GagType.SOUND,
    damage: 14,
    accuracy: 95,
    description: 'An elephant trunk that makes a loud noise.',
    icon: '🐘',
    animation: 'sound',
    sound: 'trumpet'
  },
  {
    id: 'banana-peel',
    name: 'Banana Peel',
    type: GagType.DROP,
    damage: 10,
    accuracy: 50,
    description: 'A banana peel that drops on the cog.',
    icon: '🍌',
    animation: 'drop'
  },
  {
    id: 'anvil',
    name: 'Anvil',
    type: GagType.DROP,
    damage: 30,
    accuracy: 50,
    description: 'A heavy anvil that drops on the cog.',
    icon: '🔨',
    animation: 'drop'
  },
  {
    id: 'feather',
    name: 'Feather',
    type: GagType.TOON_UP,
    damage: -10,
    accuracy: 70,
    description: 'A tickling feather that heals the toon.',
    icon: '🪶',
    animation: 'heal'
  },
  {
    id: 'juggling-balls',
    name: 'Juggling Balls',
    type: GagType.TOON_UP,
    damage: -20,
    accuracy: 70,
    description: 'Juggling balls that greatly heal the toon.',
    icon: '🤹',
    animation: 'heal'
  }
];
