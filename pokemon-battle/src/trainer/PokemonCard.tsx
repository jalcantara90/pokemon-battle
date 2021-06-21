import React, { ChangeEvent } from "react";
import { Pokemon } from "../models/pokemon.model";
import { Skill } from "../models/skills.model";

export function PokemonCard({ pokemon, skills }: { pokemon: Pokemon, skills: Skill[] }) {

  const setAttack = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
    pokemon.skills[index] = skills[parseInt(event.target.value)]
    console.log(pokemon);
  }

  // const setAttackOne = (event: ChangeEvent<HTMLSelectElement>) => {
  //   pokemon.skills[0] = skills[parseInt(event.target.value)]
  //   console.log(pokemon);
  // }
  // const setAttackTwo = (event:  ChangeEvent<HTMLSelectElement>) => {
  //   pokemon.skills[1] = skills[parseInt(event.target.value)]
  //   console.log(pokemon);
  // }
  // const setAttackThree = (event:  ChangeEvent<HTMLSelectElement>) => {
  //   pokemon.skills[2] = skills[parseInt(event.target.value)]
  //   console.log(pokemon);
  // }
  // const setAttackFour = (event:  ChangeEvent<HTMLSelectElement>) => {
  //   pokemon.skills[3] = skills[parseInt(event.target.value)]
  //   console.log(pokemon);
  // }
  
  return (
    <div>
      <img src={`src/assets/pokemon-front/${pokemon.name.toLowerCase()}.gif`} alt="" />
      {pokemon.name}
      <ul>
      {
        Object.entries(pokemon.baseStats).map(([statName, statValue]) => {
          return <li key={statName}> 
            {statName.toUpperCase() + ': '}
            {statValue}
          </li>
        })
      }
      </ul>

      <label htmlFor="">
        Ataque: 1
        <select name="Attaks" id="" onChange={(event) => setAttack(event, 0)}>
          {
            skills.map((skill, index) => {
              return <option key={index} value={index}>{skill.name}</option>
            })
          } 
        </select>
      </label>
      <label htmlFor="">
        Ataque: 2
        <select name="Attaks" id="" onChange={(event) => setAttack(event, 1)}>
          {
            skills.map((skill, index) => {
              return <option key={index} value={index}>{skill.name}</option>
            }) 
          } 
        </select>
      </label>  
      <label htmlFor="">
        Ataque: 3
        <select name="Attaks" id="" onChange={(event) => setAttack(event, 2)}>
          {
            skills.map((skill, index) => {
              return <option key={index} value={index}>{skill.name}</option>
            }) 
          } 
        </select>
      </label>  <label htmlFor="">
        Ataque: 4
        <select name="Attaks" id="" onChange={(event) => setAttack(event, 3)}>
          {
            skills.map((skill, index) => {
              return <option key={index} value={index}>{skill.name}</option>
            }) 
          } 
        </select>
      </label>
    </div>
  )
};
