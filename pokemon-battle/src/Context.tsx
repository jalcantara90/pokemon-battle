import React, { createContext, useState } from 'react'
import {blue} from './data/trainers';

export const Context = createContext(null);

const Provider = ({ children }) => {
  const [playerOne, setPlayerOne] = useState(null);

  const value = {
    playerOne,
    playerTwo: blue,
    setPlayerOne,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

export default { Provider, Consumer: Context.Consumer };