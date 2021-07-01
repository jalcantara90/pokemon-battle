import React from "react";
import { PokemonCard } from "../trainer/PokemonCard";
import { red } from "../data/trainers";
import { skills } from "../constants/skills";
import { PokemonGrid } from "./BattleComponent.styled";

export function BattleComponent() {
  const handleSelectPokemon = () => {};

  return (
    <PokemonGrid>
    {  
      red.pokemonList.map(pokemon => 
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          selectPokemon={handleSelectPokemon}
        />
      )
    }
    </PokemonGrid>
  )
}