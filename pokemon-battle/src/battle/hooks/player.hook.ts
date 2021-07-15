import { Pokemon } from '../../models/pokemon.model';
import { useState } from 'react';

export interface Player {
  trainerId: string;
  name: string;
  pokemonList: Pokemon[];
  currentPokemon: Pokemon;
}

type UsePlayer = [Player, (pokemonId: string) => void, (damage: number) => void];

export function usePlayer(newPlayer: Player): UsePlayer {
  const [player, setPlayer] = useState<Player>({
    ...newPlayer
  });

  function handlePlayerChoosePokemon(pokemonId: string) {
    const currentPokemon = player.pokemonList.find(p => p.id === pokemonId);

    if (!currentPokemon) {
      return;
    }

    setPlayer({
      ...player,
      currentPokemon
    });
  }

  function handleDamageCalculation(damage: number) {
    const { currentPokemon } = player;
    currentPokemon.currentHp -= damage;

    setPlayer({
      ...player,
      currentPokemon
    });
  }

  return [player, handlePlayerChoosePokemon, handleDamageCalculation];
}

