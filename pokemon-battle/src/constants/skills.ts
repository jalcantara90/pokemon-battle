import {Skill} from '../models/skills.model';
import {types} from './types';

const tackle = new Skill('Tackle', 30, 40, types.normal);
const waterGun = new Skill ('Water gun', 20, 40, types.water);
const thunderBolt = new Skill ('Thunderbolt', 20, 40, types.electric);
const ember = new Skill('Ember', 20, 40, types.fire);
const vineWhip = new Skill('Vine Whip', 20, 40, types.grass);
const earthquacke = new Skill('Earthquacke', 10, 60, types.ground);
const bite = new Skill('Bite', 25, 60, types.dark);
const psychicBeam = new Skill('Psybeam',  10, 65, types.psychic);
const sludgeBomb = new Skill('Sludge bomb', 10, 55, types.psychic);
const lick = new Skill('Lick', 30, 30, types.ghost);
const airSlash = new Skill('Air slash', 10, 45, types.flying);
const iceBeam = new Skill('Ice beam', 10, 45, types.ice);

export const skills = {
  tackle,
  waterGun,
  thunderBolt,
  ember,
  vineWhip,
  earthquacke,
  bite,
  psychicBeam,
  sludgeBomb,
  lick,
  airSlash,
  iceBeam
};
