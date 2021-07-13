import React, { ChangeEvent } from "react";
import { Pokemon } from "../models/pokemon.model";
import { Skill } from "../models/skills.model";
import { 
  PokemonImgBlock,
  PokemonSkill,
  PokemonTitle,
  PokemonStatsList,
  PokemonCardContainer,
  PokemonImageContainer,
  PokemonAttackContainer,
  PokemonDeleteButton,
  PokemonSelectButton,
  PokemonSelectButtonContainer
} from "./PokemonCard.styled";

type PokemonAction = (pokemon: Pokemon) => void;

interface PokemonCardProps {
  pokemon: Pokemon;
  skills?: Skill[];
  deletePokemon?: PokemonAction;
  selectPokemon?: PokemonAction;
}

 export function PokemonCard({ pokemon, skills = [], deletePokemon, selectPokemon }: PokemonCardProps) {

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
    <PokemonCardContainer>
      
      <PokemonImageContainer>
        <PokemonTitle>{pokemon.name}</PokemonTitle>
        <PokemonImgBlock>
          <img src={`src/assets/pokemon-front/${pokemon.name.toLowerCase()}.gif`} alt=""/>
        </PokemonImgBlock>
      </PokemonImageContainer>
      <PokemonStatsList>
      {
        Object.entries(pokemon.baseStats).map(([statName, statValue]) => {
          return <li key={statName}> 
            {statName.toUpperCase() + ': '}
            {statValue}
          </li>
        })
      }
      </PokemonStatsList>
      {
        skills.length ? <PokemonAttackContainer>
            <legend>Ataques:</legend>
            <PokemonSkill name="Attaks" id="" onChange={(event) => setAttack(event, 0)}>
              {
                skills.map((skill, index) => {
                  return <option key={index} value={index}>{skill.name}</option>
                })
              } 
            </PokemonSkill>
            <PokemonSkill name="Attaks" id="" onChange={(event) => setAttack(event, 1)}>
              {
                skills.map((skill, index) => {
                  return <option key={index} value={index}>{skill.name}</option>
                }) 
              } 
            </PokemonSkill>
            <PokemonSkill name="Attaks" id="" onChange={(event) => setAttack(event, 2)}>
              {
                skills.map((skill, index) => {
                  return <option key={index} value={index}>{skill.name}</option>
                }) 
              } 
            </PokemonSkill>
            <PokemonSkill name="Attaks" id="" onChange={(event) => setAttack(event, 3)}>
              {
                skills.map((skill, index) => {
                  return <option key={index} value={index}>{skill.name}</option>
                }) 
              } 
            </PokemonSkill>
          </PokemonAttackContainer>
          : ''
      }
      {
        deletePokemon && <PokemonDeleteButton onClick={() => {deletePokemon(pokemon)}}>X</PokemonDeleteButton>
      }
      {
        selectPokemon && <PokemonSelectButtonContainer onClick={() => selectPokemon(pokemon) }> <PokemonSelectButton>I choose you!</PokemonSelectButton> </PokemonSelectButtonContainer>
      }
    </PokemonCardContainer>
  )
};
