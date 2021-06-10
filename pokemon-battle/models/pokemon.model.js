import { v4 as uuid } from 'uuid';

class Pokemon {
  constructor(name, types, skills) {
    this.name = name;
    this.types = types;
    this.id = uuid();
    this.skills = skills;
    this.hp = 0;
    this.attack = 0;
    this.defense = 0;
    this.speed = 0;
  }

  buildStats(min, max) {
    return Math.random() * (max - min) + min;
  }

  setStat(multiplier) {
    this.hp = Math.floor(this.buildStats(100, 150) * multiplier);
    this.attack = Math.floor(this.buildStats(10, 25) * multiplier);
    this.defense = Math.floor(this.buildStats(10, 25) * multiplier);
    this.speed = Math.floor(this.buildStats(1, 100) * multiplier);
  }
}


export class PokemonFirstStage extends Pokemon {
  constructor(name, types, skills) {
    super(name, types, skills);
    super.setStat(0.8);
  }
}

export class PokemonSecondStage extends Pokemon {
  constructor(name, types, skills){
    super(name, types, skills);
    super.setStat(1);
  }
}

export class PokemonFinalStage extends Pokemon {
  constructor(name, types, skills){
    super(name, types, skills);
    super.setStat(1.2);
  }
}
