import React, { MutableRefObject, useRef } from "react"
import { ActionButton } from "../components/buttons";
import { Pokemon } from "../models/pokemon.model";
import { Trainer } from "../models/trainer.model";
import { TrainerContainer, TrainerInput } from "./trainer.styled";

type AddPokemonFn = (pokemonId: string, trainerId: string) => void;

export function TrainerGrid({ trainer, pokemonList, addPokemon }: { trainer: Trainer, pokemonList: [string, Pokemon][], addPokemon: AddPokemonFn }) {
  const dataListRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleAddPokemonClick = () => {
    addPokemon(dataListRef.current.value, trainer.id);
    dataListRef.current.value = ''
  }

  return (
    <TrainerContainer className="mt-2">
      <h3>{trainer.name}</h3>
      <div>

        <TrainerInput type="text" list="data" className='mr-2' ref={dataListRef} />

        <datalist id="data" >
          {
            pokemonList.map(([key, pokemon]) => {
              return <option key={key} value={key}>{pokemon.name}</option>
            })
          }
        </datalist>

        <ActionButton onClick={handleAddPokemonClick}>Añadir pokemon</ActionButton>
      </div>
      <ul>
        {
          trainer.pokemonList.map(p => {
            return <li key={p.id}>
                      {p.name}
                      <img src={`src/assets/pokemon-front/${p.name.toLowerCase()}.gif`} alt="" />
                    </li>
          })
        }
      </ul>
    </TrainerContainer>
  );
}
