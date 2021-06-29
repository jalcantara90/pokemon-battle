import React, { MutableRefObject, useRef } from "react"
import { ActionButton } from "../components/buttons";
import { Pokemon } from "../models/pokemon.model";
import { Trainer } from "../models/trainer.model";
import { TrainerContainer, TrainerInput } from "./trainer.styled";
import {skills} from "../constants/skills";

import { PokemonCard } from './PokemonCard';

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
        {
          trainer.pokemonList.map(p => 
            <PokemonCard 
              key={p.id}
              pokemon={p} skills={Object.values(skills)} 
            />
            // <div key={p.id}>
            //   <img src={`src/assets/pokemon-front/${p.name.toLowerCase()}.gif`} alt="" />
            //   {p.name}
            //   <ul>
            //     <li>
            //       HP: {p.baseStats.hp}
            //     </li>
            //     <li>
            //       ATK: {p.baseStats.atk}
            //     </li>
            //     <li>
            //       DEF: {p.baseStats.def}
            //     </li>
            //     <li>
            //       SPA: {p.baseStats.spa}
            //     </li>
            //     <li>
            //       SPD: {p.baseStats.spd}
            //     </li>
            //     <li>
            //       SPE: {p.baseStats.spe}
            //     </li>
            //   </ul>
            //   <select name="Attaks" id="">
            //     {
            //       Object.values(skills).map((skill, index) => {
            //         return <option key={index} value="skill.name">{skill.name}</option>
            //       }) 
            //     } 
            //   </select>


            // </div>
          )
        }
    </TrainerContainer>
  );
}
