import React, { ChangeEvent, useState } from 'react'
import './App.css'

import { Trainer } from './models/trainer.model';
import { TrainerInput, CreateTrainerButton} from './trainer/trainer.styled';
import { TrainerGrid } from './trainer/Trainer';
import { pokemonList } from './constants/pokemon-list';

function App() {
  const [trainerName, setTrainerName] = useState('');
  const [trainerList, setTrainerList] = useState<Trainer[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTrainerName(event.target.value);
  }

  const handleCreateTrainer = () => {
    const newTrainer = new Trainer(trainerName);
    setTrainerList([...trainerList, newTrainer]);
    setTrainerName('');
  }

  return (
    <div className="App">
      <TrainerInput
        className="mr-1"
        type="text" 
        placeholder="Escribe tú nombre de entrenador"
        value={trainerName}
        onChange={event => handleInputChange(event)}/>
      <CreateTrainerButton onClick={handleCreateTrainer}>Crear entrenador</CreateTrainerButton>
      {
        trainerList.map(trainer => {
          return <TrainerGrid pokemonList={pokemonList} trainer={trainer}/>
        })
      }
    </div>
  )
}

export default App
