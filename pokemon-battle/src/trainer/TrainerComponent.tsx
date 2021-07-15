
import {TrainerInput, CreateTrainerButton} from './trainer.styled';
import {TrainerGrid} from './Trainer';
import {Pokedex, pokemonList} from '../data/pokedex';
import React, { useState, ChangeEvent, Fragment, useContext } from 'react';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import {blue,red} from '../data/trainers';
import { Context } from '../Context';

export function TrainerComponent() {
  const [trainerName, setTrainerName] = useState('');
  const [trainerList, setTrainerList] = useState<Trainer[]>([]);

  const { setPlayerOne } = useContext(Context);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTrainerName(event.target.value);
  }

  const handleCreateTrainer = () => {
    const newTrainer = new Trainer(trainerName);
    setTrainerList([...trainerList, newTrainer]);
    setTrainerName('');
  }

  const handleUpdateTrainer = (pokemonName: string, trainerId: string) => {
    const pokemonSelected = Pokedex[pokemonName];
    const trainer = trainerList.find(t => t.id === trainerId);

    if (pokemonSelected && trainer) {
      const pokemon = new Pokemon(pokemonSelected.num, pokemonSelected.name, pokemonSelected.types, pokemonSelected.baseStats);

      trainer.addPokemon(pokemon);
      setTrainerList([...trainerList]);
      setPlayerOne(trainer);
    }
  }

  const handleDeletePokemon = (idTrainer: string, pokemon: Pokemon) => {
    // const findedTrainer = trainerList.find(trainer => { // versión poco mantenible
    //   if(idTrainer === trainer.id){
    //     return true;
    //   }else{
    //     return false;
    //   }
    // });

    // const findedTrainer = trainerList.find(trainer => { // pero se puede mejorar
    //   if(idTrainer === trainer.id){
    //     return true;
    //   }

    //   return false;
    // });
  
    // const findedTrainer = trainerList.find(trainer => { // hemos mejorado pero no suficiente
    //   return idTrainer === trainer.id ? true : false;
    // });

    // const findedTrainer = trainerList.find(trainer => {
    //   return idTrainer === trainer.id;
    // });
  
    const findedTrainer = trainerList.find(trainer => idTrainer === trainer.id);

    if(findedTrainer) {
      findedTrainer.dropPokemonOnPC(pokemon);
      setTrainerList([...trainerList]);
      setPlayerOne(findedTrainer);
    }
  }

  return (
    <Fragment>
      <TrainerInput
        className="mr-1"
        type="text" 
        placeholder="Escribe tú nombre de entrenador"
        value={trainerName}
        onChange={event => handleInputChange(event)}/>
      <CreateTrainerButton onClick={handleCreateTrainer}>Crear entrenador</CreateTrainerButton>
      {
        trainerList.map(trainer => {
          return <TrainerGrid 
            key={trainer.id} 
            pokemonList={pokemonList}
            trainer={trainer}
            addPokemon={handleUpdateTrainer}
            deletePokemon={handleDeletePokemon}
          />
        })
      }
    </Fragment>
  );
} 

