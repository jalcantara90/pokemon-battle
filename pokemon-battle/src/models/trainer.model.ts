import { Pokemon } from './pokemon.model';
import { v4 as uuid } from 'uuid';
import { PC } from './pc.model';

export class Trainer {
  name: string;
  pokemonList: Pokemon[];
  pc: PC;
  id: string;

  constructor(name: string) {
    this.name = name;
    this.pokemonList = [];
    this.pc = new PC(name);
    this.id = uuid();
  }
  
  addPokemon(pokemon: Pokemon) { // charmander | undefined
    if (this.pokemonList.length >= 6){ // pokemonList.length = 1 > 6 no
      return console.error(`No puedes añadir ${pokemon.name}, envía uno al PC`);
    }

    this.pokemonList.push(pokemon); // this.addPokemon(pokemon) // ash.addPokemon(undefined)
  }
  
  dropPokemonOnPC(pokemon: Pokemon) {
    const pokemonDropped = this.pokemonList.find((p) => p.id === pokemon.id) as Pokemon;
    this.pokemonList = this.pokemonList.filter((p)=> p.id !== pokemonDropped.id);
    this.pc.addPokemon(pokemonDropped)
    console.log(`${this.name} ha dejado a ${pokemon.name} en el PC`);
  }

}
