import { skills } from '../constants/skills';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';

export const blue = new Trainer('Blue');
const p1 = Pokemon.FromPokemon({
  num: 9,
  name: 'Blastoise',
  types: ['Water'],
  baseStats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 },
  skills: [
    { name: 'Water gun', pp: 20, damage: 40, type: 'water' },
    { name: 'Ice beam', pp: 10, damage: 45, type: 'ice' },
    { name: 'Bite', pp: 25, damage: 60, type: 'dark' },
    { name: 'Sludge bomb', pp: 10, damage: 55, type: 'psychic' },
  ],
} as Pokemon);

const p2 = Pokemon.FromPokemon({
  num: 59,
  name: 'Arcanine',
  types: ['Fire'],
  baseStats: { hp: 90, atk: 110, def: 80, spa: 100, spd: 80, spe: 95 },
  skills: [
    { name: 'Ember', pp: 20, damage: 40, type: 'Fire' },
    skills.tackle,
    { name: 'Earthquacke', pp: 10, damage: 60, type: 'Ground' },
    { name: 'Lick', pp: 30, damage: 30, type: 'Ghost' },
  ]
} as Pokemon);

const p3 = Pokemon.FromPokemon({
  num: 103,
  name: 'Exeggutor',
  types: ['Grass', 'Psychic'],
  baseStats: { hp: 95, atk: 95, def: 85, spa: 125, spd: 75, spe: 55 },
  skills: [
    { name: 'Vine Whip', pp: 20, damage: 40, type: 'Grass' },
    skills.tackle,
    { name: 'Psybeam', pp: 10, damage: 65, type: 'Psychic' },
    skills.sludgeBomb
  ],
} as Pokemon);

const p4 = Pokemon.FromPokemon({
  num: 18,
  name: 'Pidgeot',
  types: ['Normal', 'Flying'],
  baseStats: { hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 101 },
  skills: [
    { name: 'Air slash', pp: 10, damage: 45, type: 'Flying' },
    skills.thunderBolt,
    skills.ember,
    skills.iceBeam
  ],
} as Pokemon);

const p5 = Pokemon.FromPokemon({
  num: 65,
  name: 'Alakazam',
  types: ['Psychic'],
  baseStats: { hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120 },
  skills: [
    skills.psychicBeam,
    { name: 'Thunderbolt', pp: 20, damage: 40, type: 'Electric' },
    skills.ember,
    skills.iceBeam,
  ],
} as Pokemon);
const p6 = Pokemon.FromPokemon({
  num: 112,
  name: 'Rhydon',
  types: ['Ground', 'Rock'],
  baseStats: { hp: 105, atk: 130, def: 120, spa: 45, spd: 45, spe: 40 },
  skills: [
    skills.earthquacke, 
    skills.bite, 
    skills.tackle, 
    skills.lick
  ]
} as Pokemon);

blue.addPokemon(p1);
blue.addPokemon(p2);
blue.addPokemon(p3);
blue.addPokemon(p4);
blue.addPokemon(p5);
blue.addPokemon(p6);

export const red = new Trainer('Red');

const p7 = Pokemon.FromPokemon({
  num: 3,
  name: 'Venusaur',
  types: ['Grass', 'Poison'],
  baseStats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 },
  skills: [
    skills.thunderBolt,
    skills.psychicBeam,
    skills.vineWhip,
    skills.sludgeBomb
  ]
} as Pokemon);

const p8 = Pokemon.FromPokemon({
  num: 25,
  name: 'Pikachu',
  types: ['Electric'],
  baseStats: { hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 },
  skills: [
    skills.thunderBolt,
    skills.bite,
    skills.tackle,
    skills.sludgeBomb
  ]
} as Pokemon);

const p9 = Pokemon.FromPokemon({
  num: 131,
  name: 'Lapras',
  types: ['Water', 'Ice'],
  baseStats: { hp: 130, atk: 85, def: 80, spa: 85, spd: 95, spe: 60 },
  skills: [
    skills.thunderBolt,
    skills.waterGun,
    skills.iceBeam,
    skills.sludgeBomb
  ]
} as Pokemon);

const p10 = Pokemon.FromPokemon({
  num: 143,
  name: 'Snorlax',
  types: ['Normal'],
  baseStats: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 },
  skills: [
    skills.thunderBolt,
    skills.waterGun,
    skills.iceBeam,
    skills.sludgeBomb
  ]
} as Pokemon);

const p11 = Pokemon.FromPokemon({
  num: 6,
  name: 'Charizard',
  types: ['Fire', 'Flying'],
  baseStats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 },
  skills: [
    skills.airSlash,
    skills.ember,
    skills.bite,
    skills.earthquacke
  ]
} as Pokemon);


red.addPokemon(p1);
red.addPokemon(p7);
red.addPokemon(p8);
red.addPokemon(p9);
red.addPokemon(p10);
red.addPokemon(p11);

