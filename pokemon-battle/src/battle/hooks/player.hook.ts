import { useState } from "react";
import { Pokemon } from "../../models/pokemon.model";

export interface UsePlayer {
  trainerId: string;
  name: string;
  pokemonList: Pokemon[];
  currentPokemon?: Pokemon;
}

export function usePlayer(trainerId: string, name: string, pokemonList: Pokemon[]): [UsePlayer, (pokemon: Pokemon) => void, Function] {
  const [player, setPlayer] = useState<UsePlayer>({
    trainerId,
    name,
    pokemonList,
    currentPokemon: undefined,
  });

  // handleChoosePokemon

  function handleChoosePokemon(choosenPokemon: Pokemon) {
    player.currentPokemon = choosenPokemon;
    setPlayer({...player});
  }

  function handleDamageTaken(damage: number) {
    player.currentPokemon.currentHp -= damage;
    setPlayer({...player});
  }

  return [player, handleChoosePokemon, handleDamageTaken];
}
