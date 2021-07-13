import { Stats, Pokemon } from "../../models/pokemon.model";
import { Skill } from "../../models/skills.model";
import { Trainer } from "../../models/trainer.model";
import { TypeChart, damageMultiplier } from '../../constants/type-chart';
 
export class Battle {
  isStarted = false;
  battleLog: Turn[] = [];

  constructor(public playerOne: Player, public playerTwo: Player) {

  }

  startBattle() {
    const battle = new Battle(this.playerOne, this.playerTwo);
    battle.battleLog.push({
      number: 0,
      actions:
      [
        {
          type: ActionType.PlayerStartWith,
          player: this.playerOne,
          pokemon: this.playerOne.currentPokemon,
          message: `The player ${battle.playerOne.trainer.name} start with ${battle.playerOne.currentPokemon.name}`
        },
        {
          type: ActionType.PlayerStartWith,
          player: this.playerTwo,
          pokemon: this.playerTwo.currentPokemon,
          message: `The player ${battle.playerTwo.trainer.name} start with ${battle.playerTwo.currentPokemon.name}`
        },
      ]
    });

    battle.isStarted = true;
    return battle;
  }

  newTurn(turnActions: TurnAction[]): Battle {
    this.battleLog.push({
      number: this.battleLog.length,
      actions: turnActions
    });

    return this;
  }
};

export enum ActionType {
  ChangePokemon,
  PokemonAttack,
  PlayerStartWith
}

export interface Turn {
  number: number;
  actions: TurnAction[];
}

export interface TurnAction {
  type: ActionType;
  message: string;
  player: Player,
  pokemon: PokemonInBattle;
  target?: Player;
  skill?: Skill;
}


export class Player {
  trainer: Trainer;
  pokemonList: PokemonInBattle[];
  currentPokemon: PokemonInBattle;

  constructor(player: Player) {
    this.trainer = player?.trainer;
    this.pokemonList = player?.pokemonList;
    this.currentPokemon = player?.currentPokemon;
  }

  static fromTrainer(trainer: Trainer): Player {
    const player = new Player({} as Player);
    player.trainer = trainer;
    player.pokemonList = trainer.pokemonList.map(pokemon => 
      new PokemonInBattle(pokemon.num, pokemon.name, pokemon.types, pokemon.baseStats, pokemon.skills, pokemon.id)
    );

    return player;
  }

  choosePokemon(pokemonId: string): Player {
    const pokemon = this.pokemonList.find(p => p.id === pokemonId);

    if (pokemon) {
      this.currentPokemon = pokemon;
    };

    return new Player(this);
  }
}

export class PokemonInBattle extends Pokemon {
  public currentHp: number;
  public stats: Stats;

  constructor(
    public num: number,
    public name: string,
    public types: string[],
    baseStats: Stats,
    public skills: Skill[] = [],
    id: string
  ) {
    super(num, name, types, baseStats, skills, id);

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

  get isAlive() {
    return this.currentHp > 0;
  }

  damageCalculation(skill: Skill, pokemon: PokemonInBattle) {
    const multiplier = this.types.reduce((acc, type) => {
      const damageTaken = TypeChart[type.toLowerCase()].damageTaken[skill.type];
      return acc + damageMultiplier[damageTaken];
    }, 0);

    const stabMultiplier = pokemon.types.includes(skill.type) ? 1.5 : 1;

    const damage = Math.round(((((((2 * 100) / 5) + 2 ) * (skill.damage * (pokemon.stats.atk / this.stats.def))) + 2) / 50) * multiplier * stabMultiplier);

    this.currentHp -= damage;

    return { currentPokemon: this, damage };
  }
}

function growHp(baseStat: number, level: number): number {
  return (((2 * baseStat) * level) / level) + level + 10;
}

function growStat(baseStat: number, level: number): number {
  return (((2 * baseStat) * level) / level) + 5;
}

export function randomTurn(player: Player, target: Player): TurnAction {
  const currentPokemon = player.currentPokemon;
 
  const randomIndex = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

  return {
    type: ActionType.PokemonAttack,
    message: `${currentPokemon.name} uses ${currentPokemon.skills[randomIndex].name}`,
    pokemon: currentPokemon,
    player,
    target,
    skill: currentPokemon.skills[randomIndex]
  };
}


export function sortActions(actionOne: TurnAction, actionTwo: TurnAction) {
  if (actionOne.type === ActionType.ChangePokemon) {
    return -1;
  }

  if (actionTwo.type === ActionType.ChangePokemon) {
    return 1;
  }

  return actionTwo.pokemon.stats.spe - actionOne.pokemon.stats.spe;
}