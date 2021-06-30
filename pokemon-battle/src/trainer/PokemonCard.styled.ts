import styled from 'styled-components'


export const PokemonDeleteButton = styled.button`
  border-radius: 100px;
  color: white;
  border: none;
  background-color: red;
  position: absolute;
  right: -15px;
  top: -15px;
  z-index: 1;
  font-size: 1.3rem;
  -webkit-transition: 400ms;
  transition: 400ms;
  -webkit-transition-property: background-color;
  transition-property: background-color;
  display: none;

  &:hover {
    background-color: #fa5f5f;
  }
`;

export const PokemonCardContainer = styled.div`
  padding: .5rem;
  border: 2px solid black;
  border-radius: 3px;
  box-shadow: 8px 10px 5px -7px rgba(0,0,0,0.55);
  -webkit-box-shadow: 8px 10px 5px -7px rgba(0,0,0,0.55);
  -moz-box-shadow: 8px 10px 5px -7px rgba(0,0,0,0.55);
  display: flex;
  justify-content: space-between;
  position: relative;
  transition: 400ms;
  transition-property: transform;

  &:hover  {
    transform: scale(1.05);
    z-index: 1;
  }

  &:hover ${PokemonDeleteButton} {
    display: inherit;
  }
`;

export const PokemonImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;

`;

export const PokemonTitle = styled.h2`
  font-size: 1rem;
  font-weight: bold;
`;
export const PokemonImgBlock = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

export const PokemonAttackContainer = styled.fieldset`
  display:flex;
  flex-direction: column;
  justify-content: space-around;
    
`;

export const PokemonStatsList = styled.ul`
  display: flex;
  padding: 0px 0.5rem;
  flex-direction: column; 
  align-items: flex-start;
  list-style: none;
  justify-content: space-around;
`;

export const PokemonSkill = styled.select`
  border-radius: 3px;
  border: 1px solid black;
  width: 10rem;
  padding: 0.5rem;
`;

