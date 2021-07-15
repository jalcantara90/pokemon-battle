
import { v4 as uuid } from 'uuid';
import { Skill } from './skills.model';

function growHp(baseStat: number, level: number): number {
  return (((2 * baseStat) * level) / level) + level + 10;
}

function growStat(baseStat: number, level: number): number {
  return (((2 * baseStat) * level) / level) + 5;
}

export class Pokemon {
  id: string;
  public currentHp: number;
  public stats: BaseStats;

  constructor(
    public num: number,
    public name: string,
    public types: string[],
    public baseStats: BaseStats,
    public skills: Skill[] = []
  ) {
    this.id = uuid();

    this.currentHp = growHp(baseStats.hp, 100);

    this.stats = {
      hp: growHp(baseStats.hp, 100),
      atk: growStat(baseStats.atk, 100),
      spa: growStat(baseStats.spa, 100),
      def: growStat(baseStats.def, 100),
      spd: growStat(baseStats.spd, 100),
      spe: growStat(baseStats.spe, 100)
    };
  }

  static FromPokemon({
    name,
    types,
    num,
    baseStats,
    skills
  }: Pokemon): Pokemon {
    return new Pokemon(num, name, types, baseStats, skills);
  }

  get isAlive() {
    return this.currentHp > 0;
  }
}

export interface BaseStats {
  hp: number; 
  atk: number; 
  def: number; 
  spa: number; 
  spd: number; 
  spe: number;
}