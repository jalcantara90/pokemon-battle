import React from "react";
import { PokemonCard } from "../trainer/PokemonCard";
import { blue, red } from "../data/trainers";
import { PokemonGrid } from "./BattleComponent.styled";
import { Pokemon } from "../models/pokemon.model";
import { Skill } from "../models/skills.model";
import { useBattle } from './hooks/battle.hook';

export function BattleComponent() {

  const [battle, players, playerAction, mustChange, isFinished] = useBattle(
    {
      trainerId: red.id,
      name: red.name,
      pokemonList: red.pokemonList,
      currentPokemon: null
    },
    {
      trainerId: blue.id,
      name: blue.name,
      pokemonList: blue.pokemonList,
      currentPokemon: null
    }
  );

  const handleSelectPokemonPlayerOne = (pokemon: Pokemon) => {
    players.you.handleChoosPokemon(pokemon.id);
  };

  const playerOneChangePokemon = (pokemonId: string) => {
    players.you.handleChoosPokemon(pokemonId);
  };

  const playerOneAttackPokemon = (skill: Skill) => {
    playerAction(skill);
  };

  return <>
    {
      !battle.isStarted ?        
        <PokemonGrid>
        {  
          players.you.player.pokemonList.map(pokemon => 
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              selectPokemon={handleSelectPokemonPlayerOne}
            />
          )
        }
        </PokemonGrid>
        :
        <div>
          <ul>
            {
              battle.log.map((turn, index) => 

                <li key={index}>
                  <div>
                    <span>Turn number: {turn.number}</span>
                    {
                      turn.actions.map((action) => <p key={action.message}>{action.message}</p>)
                    }
                  </div>
                </li>
              )
            }
          </ul>

          {
            players.you.player.pokemonList.filter(
              pokemon => pokemon.isAlive && pokemon.id !== players.you.player.currentPokemon.id
            ).map(
              pokemon => <button disabled={isFinished} onClick={() => playerOneChangePokemon(pokemon.id)} key={pokemon.id}>{pokemon.name}</button>
            )
          }

          <br />
          {
            players.you.player.currentPokemon.skills.map(
              (skill, item) => <button disabled={mustChange || isFinished} key={item} onClick={() => playerOneAttackPokemon(skill)}> {skill.name} </button>
            )
          }

          <div>{players.you.player.name} - {players.you.player.currentPokemon.name} - {players.you.player.currentPokemon.currentHp} / {players.you.player.currentPokemon.stats.hp}</div>
          <div>{players.enemy.name} - {players.enemy.currentPokemon.name} - {players.enemy.currentPokemon.currentHp} / {players.enemy.currentPokemon.stats.hp}</div>
        </div>
    }
  </>
  
}