import { v4 as uuid } from 'uuid';
import { Skill } from './skills.model';

export class Pokemon {
  id: string;
  skills: Skill[] = [];

  constructor(
    public num: number,
    public name: string,
    public types: string[],
    public baseStats: BaseStats
  ) {
    this.id = uuid();
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