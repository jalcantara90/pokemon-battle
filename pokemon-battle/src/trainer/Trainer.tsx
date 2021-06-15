import React, { ChangeEvent, useState } from "react"
import { Pokemon } from "../models/pokemon.model";
import { Trainer } from "../models/trainer.model";
import { TrainerContainer, PokemonSelect, CreateTrainerButton } from "./trainer.styled"


export function TrainerGrid({ trainer, pokemonList }: { trainer: Trainer, pokemonList: Pokemon[] }) {
  const [pokemonSelected, setPokemonSelected] = useState<Pokemon | null>();
  
  const handleSelectorPokemon = (event: ChangeEvent<HTMLSelectElement>) => {
    const pokemonFound = pokemonList.find(pokemon => pokemon.id === event.target.value);

    if (pokemonFound) {
      setPokemonSelected(pokemonFound);
    }
  }

  const addPokemon = (trainer: Trainer) => {

    if (pokemonSelected) {
      trainer.addPokemon(pokemonSelected);
    }
    setPokemonSelected(null);
  }

  return (
    <TrainerContainer className="mt-2">
      <h3>{trainer.name}</h3>
      <div>
        <PokemonSelect 
          value={pokemonSelected?.id}
          onChange={event => handleSelectorPokemon(event)}
          className="mr-1">
          {
            pokemonList.map((pokemon) => {
              return <option key={pokemon.id} value={pokemon.id}>{pokemon.name}</option>
            })
          }
        </PokemonSelect>
        <CreateTrainerButton onClick={() => addPokemon(trainer)}>Añadir pokemon</CreateTrainerButton>
      </div>
      <ul>
        {
          trainer.pokemonList.map(p => {
            return <li>{p.name}</li>
          })
        }
      </ul>
    </TrainerContainer>
  );
}
