import { Pokemon } from "../../models/pokemon.model";
import { Skill } from "../../models/skills.model";
import { Player } from "./player.hook";

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
  pokemon: Pokemon;
  target?: Player;
  skill?: Skill;
}

export interface Battle {
  isStarted: boolean;
  log: Turn[]
}

export interface Players {
  you: {
    player: Player,
    handleChoosPokemon: (pokemonId: string) => void,
  },
  enemy: Player;
}
