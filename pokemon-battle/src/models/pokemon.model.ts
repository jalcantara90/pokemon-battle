
import { v4 as uuid } from 'uuid';
import { Skill } from './skills.model';

export class Pokemon {
  id: string;

  constructor(
    public num: number,
    public name: string,
    public types: string[],
    public baseStats: Stats,
    public skills: Skill[] = [],
    id?: string
  ) {
    this.id = id ? id : uuid();
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
}

export interface Stats {
  hp: number; 
  atk: number; 
  def: number; 
  spa: number; 
  spd: number; 
  spe: number;
}