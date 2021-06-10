import { Trainer } from './models/trainer.model.js';
import { PokemonFirstStage, PokemonSecondStage, PokemonFinalStage } from './models/pokemon.model.js';
import {types} from './constants/types.js';
import {skills} from './constants/skills.js'

import { buildItemList } from './utils/build-item-list.js';

const charmander = new PokemonFirstStage('charmander', [types.fire], [skills.tackle, skills.ember]);
const charizard = new PokemonFinalStage('charizard', [types.fire, types.flying], [skills.tackle, skills.ember]);
const pikachu = new PokemonFirstStage('pikachu',[types.electric], [skills.tackle, skills.thunderBolt]);
const eevee = new PokemonFirstStage('Eevee',[types.normal], [skills.tackle, skills.lick]);
const mew = new PokemonFinalStage('Mew',[types.psychic], [skills.psychicBeam, skills.thunderBolt]);
const marowak = new PokemonSecondStage ('Marowak', [types.ground], [skills.earthquacke, skills.tackle]);
const squirtle = new PokemonFirstStage('squirtle',[types.water], [skills.waterGun, skills.bite]);

console.log(charmander);

const ash = new Trainer('Ash');
ash.addPokemon(charmander);
ash.addPokemon(marowak);
ash.addPokemon(charizard);
ash.addPokemon(pikachu);
ash.addPokemon(mew);
ash.addPokemon(squirtle);

ash.pc.addPokemon(squirtle);

// ash.dropPokemonOnPC(mew);

console.log(ash.pokemonList);

const gary = new Trainer('Gary');

const alakazam = new PokemonFinalStage('Alakazam', [types.psychic], [skills.psychicBeam, skills.tackle])
const pidgeotto = new PokemonSecondStage('Pidgeotto', [types.normal, types.flying], [skills.bite, skills.airSlash]);
const nidoran = new PokemonFirstStage('Nidoran', [types.poison], [skills.bite, skills.sludgeBomb]);
const lapras = new PokemonFinalStage('Lapras', [types.ice, types.water], [skills.waterGun, skills.iceBeam]);
const mew2 = new PokemonFinalStage('Mew', [types.psychic], [skills.psychicBeam, skills.thunderBolt]);

gary.addPokemon(eevee);
gary.addPokemon(alakazam);
gary.addPokemon(pidgeotto);
gary.addPokemon(nidoran);
gary.addPokemon(lapras);
gary.addPokemon(mew2);

console.log(ash.pokemonList[4], gary.pokemonList[5]);


const $playerPokemonList = document.getElementById('player');
const $rivalPokemonList = document.getElementById('rival');

ash.pokemonList.forEach((pokemon) => buildItemList(pokemon, $playerPokemonList));
gary.pokemonList.forEach((pokemon) => buildItemList(pokemon, $rivalPokemonList));