import React, { useEffect, useState } from "react";
import { PokemonCard } from "../trainer/PokemonCard";
import { blue, red } from "../data/trainers";
import { PokemonGrid } from "./BattleComponent.styled";
import { ActionType, Battle, Player, PokemonInBattle, randomTurn, sortActions, TurnAction } from "./models/battle.model";
import { Pokemon } from "../models/pokemon.model";
import { Skill } from "../models/skills.model";

export function BattleComponent() {
  const [playerOne, setPlayerOne] = useState(Player.fromTrainer(red));
  const [playerTwo, setPlayerTwo] = useState(Player.fromTrainer(blue));
  const [battle, setBattle] = useState(new Battle(playerOne, playerTwo));

  const [playerOneAction, setPlayerOneAction] = useState<TurnAction>({} as TurnAction);

  const handleSelectPokemonPlayerOne = (pokemon: Pokemon) => {
    const updatedPlayer = playerOne.choosePokemon(pokemon.id);
    setPlayerOne(updatedPlayer);
  };
  const handleSelectPokemonplayerTwo = (pokemon: Pokemon) => {
    const updatedPlayer = playerTwo.choosePokemon(pokemon.id);
    setPlayerTwo(updatedPlayer);
  };

  useEffect(
    () => {
      if (battle.playerOne.currentPokemon && battle.playerTwo.currentPokemon) {
        setBattle(battle.startBattle());
      }
    },
    [playerOne.currentPokemon, playerTwo.currentPokemon]
  );

  useEffect(
    () => {
      if (playerOneAction.type === undefined) {
        return;
      }

      const playerTwoAction = randomTurn(playerTwo, playerOne);

      const turnActions = [
        playerOneAction,
        playerTwoAction
      ].sort(sortActions)
      .map((executeAction) => {
        if (executeAction.type === ActionType.ChangePokemon) {
          return executeAction;
        }

        const {
          target,
          pokemon,
          skill
        } = executeAction;

        if (!target) {
          return executeAction;
        }

        const {currentPokemon, damage} = target.currentPokemon.damageCalculation(skill as Skill, pokemon);

        target.currentPokemon = currentPokemon;

        target.trainer.id === playerOne.trainer.id ? setPlayerOne(new Player({...target} as Player)) : setPlayerTwo(new Player({...target} as Player));

        return {
          ...executeAction,
          target,
          pokemon,
          skill,
          message: `${executeAction.message}.
            The ${target?.currentPokemon.name} has received ${damage}
          `
        }
      });

      setBattle(battle.newTurn(turnActions));
    },
    [playerOneAction]
  )


  const playerOneChangePokemon = (pokemonId: string) => {
    const player = playerOne.choosePokemon(pokemonId);
    setPlayerOne(player);

    const action: TurnAction = {
      type: ActionType.ChangePokemon,
      pokemon: player.currentPokemon,
      player,
      message: `${player.trainer.name} change the active pokemon to ${player.currentPokemon.name}`
    };

    setPlayerOneAction(action);
  }

  const playerOneAttackPokemon = (skill: Skill) => {
    if (playerOne.currentPokemon.types.includes(skill.type)) {
      skill.damage * 1.5;
    }

    const action: TurnAction = {
      type: ActionType.PokemonAttack,
      message: `${playerOne.currentPokemon.name} uses ${skill.name}`,
      player: playerOne,
      target: playerTwo,
      pokemon: playerOne.currentPokemon,
      skill
    };

    setPlayerOneAction(action);
  }

  return (
    <>
      {battle.isStarted}
      {
        !battle.isStarted ? (
          <>
            <PokemonGrid>
            {  
              battle.playerOne.pokemonList.map(pokemon => 
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  selectPokemon={handleSelectPokemonPlayerOne}
                />
              )
            }
            </PokemonGrid>
            <PokemonGrid>
            {  
              battle.playerTwo.pokemonList.map(pokemon => 
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  selectPokemon={handleSelectPokemonplayerTwo}
                />
              )
            }
            </PokemonGrid>
          </>
        ) : <div>
          <ul>
            {
              battle.battleLog.map((turn, index) => 

                <li key={index}>
                  <div>
                    <span>Turn number: {turn.number}</span>
                    {
                      turn.actions.map((action) => <p key={action.message}>{action.message}</p>)
                    }
                  </div>
                </li>
              )
            }
          </ul>



          {
            playerOne.pokemonList.filter(
              pokemon => pokemon.isAlive && pokemon.id !== playerOne.currentPokemon.id
            ).map(
              pokemon => <button onClick={() => playerOneChangePokemon(pokemon.id)} key={pokemon.id}>{pokemon.name}</button>
            )
          }

          <br />
          {
            playerOne.currentPokemon.skills.map(
              (skill, item) => <button key={item} onClick={() => playerOneAttackPokemon(skill)}> {skill.name} </button>
            )
          }

          <div>{playerOne.trainer.name} - {playerOne.currentPokemon.name} - {playerOne.currentPokemon.currentHp} / {playerOne.currentPokemon.stats.hp}</div>
          <div>{playerTwo.trainer.name} - {playerTwo.currentPokemon.name} - {playerTwo.currentPokemon.currentHp} / {playerTwo.currentPokemon.stats.hp}</div>
        </div>
      }
    </>
  )
}