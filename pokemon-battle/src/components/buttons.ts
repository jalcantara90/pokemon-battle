import styled from 'styled-components'

export const PrimaryButton = styled.button`
  padding: .5rem 1.2rem;
  background: #db3b23;
  color: white;
  border-radius: 50px;
  border: none;
  box-shadow: 8px 10px 5px -7px rgba(0,0,0,0.55);
  -webkit-box-shadow: 8px 10px 5px -7px rgba(0,0,0,0.55);
  -moz-box-shadow: 8px 10px 5px -7px rgba(0,0,0,0.55);
`;

export const ActionButton = styled.button`
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
