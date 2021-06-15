import styled from 'styled-components'

export const TrainerContainer = styled.div`
  border-radius: 3px;
  border: 2px solid black;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const TrainerInput = styled.input`
  border-radius: 3px;
  border: 1px solid black;
  padding: 0.5rem 1rem;
  min-width: 13rem;
`;

export const PokemonSelect = styled.select`
  border-radius: 3px;
  border: 1px solid black;
  padding: 0.5rem 1rem;
  min-width: 13rem;
`;


export const CreateTrainerButton = styled.button`
  border-radius: 3px;
  color: white;
  padding: 0.5rem 1rem;
  background-color: black;
  font-size: 1rem;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    background-color: #000000a3;
  }
`;