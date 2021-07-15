import { useEffect, useState } from 'react';
import { Pokemon } from '../../models/pokemon.model';
import { Skill } from '../../models/skills.model';
import { TypeChart, damageMultiplier } from '../../constants/type-chart';
import { usePlayer, Player } from './player.hook';
import { randomBetweenTwoNumbers } from '../../helpers/random-between-two-numbers';
import { Battle, TurnAction, ActionType, Players, Turn } from '../hooks/battle.types';

export type UseBattle = [Battle, Players, Function, boolean, boolean];

export function useBattle(player1: Player, player2: Player): UseBattle {
  const [battle, setBattle] = useState<Battle>({
    isStarted: false,
    log: []
  });

  const [playerOne, handlePlayerOneChoosePokemon, handlePlayerOneDamageCalculation] = usePlayer(player1);
  const [playerTwo, handlePlayerTwoChoosePokemon, handlePlayerTwoDamageCalculation] = usePlayer(player2);
  const [playerAction, setPlayerAction] = useState<TurnAction>(null);
  const [mustChange, setMustChange] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  function startBattle() {
    setBattle({
      isStarted: true,
      log: [
        {
          number: 0,
          actions: [
            {
              type: ActionType.PlayerStartWith,
              player: playerOne,
              pokemon: playerOne.currentPokemon,
              message: `The player ${playerOne.name} start with ${playerOne.currentPokemon.name}`
            },
            {
              type: ActionType.PlayerStartWith,
              player: playerTwo,
              pokemon: playerTwo.currentPokemon,
              message: `The player ${playerTwo.name} start with ${playerTwo.currentPokemon.name}`
            },
          ]
        }
      ]
    });
  }

  useEffect(() => {
    if (!playerAction) return;

    const playerTwoAction = randomTurn(playerTwo, playerOne);

    const turnActions = [
      playerAction,
      playerTwoAction
    ].sort(sortActions)
    .map((executeAction) => {
      if (executeAction.type === ActionType.ChangePokemon || !executeAction.target)
        return executeAction;

      const {
        target,
        pokemon,
        skill
      } = executeAction;

      if (!pokemon.isAlive) {
        return {
          ...executeAction,
          message: `${pokemon.name} was defeated`
        }
      }

      const damage = damageCalculation(skill, executeAction.player, executeAction.target);

      target.trainerId === playerOne.trainerId ? 
        handlePlayerOneDamageCalculation(damage) :
        handlePlayerTwoDamageCalculation(damage);

      return {
        ...executeAction,
        target,
        pokemon,
        skill,
        message: `${executeAction.message}.
          ${target.currentPokemon.name} has received ${damage}.
        `
      }
    });

    if (!playerTwo.currentPokemon.isAlive) {
      turnActions.push(changeEnemyPokemon(playerTwo));
    }

    if (!playerOne.currentPokemon.isAlive) {
      setMustChange(true);
    }

    setBattle({
      ...battle,
      log: [
        ...battle.log,
        {
          number: battle.log.length,
          actions: turnActions
        }
      ]
    })
  }, [playerAction]);

  useEffect(
    () => {
      if (!playerOne.currentPokemon) {
        return;
      }

      if (!battle.isStarted) {
        const pokemon = selectRandomPokemon(playerTwo.pokemonList);
        handlePlayerTwoChoosePokemon(pokemon.id);
      } else if (mustChange) {
        const action: TurnAction = {
          type: ActionType.ChangePokemon,
          player: playerTwo,
          pokemon: playerOne.currentPokemon,
          message: `${playerOne.name} go with ${playerOne.currentPokemon.name}`
        };

        battle.log[battle.log.length - 1].actions.push(action);
        setBattle({...battle});
        setMustChange(false);
      } else {
        const action: TurnAction = {
          type: ActionType.ChangePokemon,
          pokemon: playerOne.currentPokemon,
          player: playerOne,
          message: `${playerOne.name} change the active pokemon to ${playerOne.currentPokemon.name}`
        };
        setPlayerAction(action);
      }
    },
    [playerOne.currentPokemon]
  );

  useEffect(
    () => {
      if (playerTwo.currentPokemon && !battle.isStarted) {
        startBattle();
      }
    },
    [playerTwo.currentPokemon]
  );

  useEffect(() => {
    let winner: Player;
    if (playerOne.pokemonList.every(p => !p.isAlive)) {
      winner = playerTwo;
    }
    if (playerTwo.pokemonList.every(p => !p.isAlive)) {
      winner = playerOne;
    }

    if (winner) {
      const action: TurnAction = {
        type: ActionType.ChangePokemon,
        player: winner,
        pokemon: winner.currentPokemon,
        message: `${winner.name} wins!`
      };

      battle.log[battle.log.length - 1].actions.push(action);
      setBattle({...battle});
      setIsFinished(true);
    }
  }, [battle.log.length])

  function damageCalculation(skill: Skill, attackerPlayer: Player, target: Player) {
    const attackerPokemon = attackerPlayer.currentPokemon;
    const targetPokemon = target.currentPokemon;

    const multiplier = targetPokemon.types.reduce((acc, type) => {
      const damageTaken = TypeChart[type.toLowerCase()].damageTaken[skill.type];
      return acc + damageMultiplier[damageTaken];
    }, 0);

    const stabMultiplier = attackerPokemon.types.includes(skill.type) ? 1.5 : 1;

    const damage = Math.round(((((((2 * 100) / 5) + 2 ) * (skill.damage * (attackerPokemon.stats.atk / targetPokemon.stats.def))) + 2) / 50) * multiplier * stabMultiplier);

    return damage;
  }

  function sortActions(actionOne: TurnAction, actionTwo: TurnAction) {
    if (actionOne.type === ActionType.ChangePokemon) {
      return -1;
    }
  
    if (actionTwo.type === ActionType.ChangePokemon) {
      return 1;
    }
  
    return actionTwo.pokemon.stats.spe - actionOne.pokemon.stats.spe;
  }

  function executeAction(skill: Skill): void {
    const action: TurnAction = {
      type: ActionType.PokemonAttack,
      message: `${playerOne.currentPokemon.name} uses ${skill.name}`,
      player: playerOne,
      target: playerTwo,
      pokemon: playerOne.currentPokemon,
      skill
    };
    setPlayerAction(action);
  }

  function changeEnemyPokemon(player: Player) {
    const pokemon = selectRandomPokemon(player.pokemonList);
    handlePlayerTwoChoosePokemon(pokemon.id);

    return {
      type: ActionType.ChangePokemon,
      player: playerTwo,
      pokemon,
      message: `${player.name} go with ${pokemon.name}`
    };
  }

  return [
    battle,
    {
      you: {
        player: playerOne,
        handleChoosPokemon: handlePlayerOneChoosePokemon
      },
      enemy: playerTwo 
    },
    executeAction,
    mustChange,
    isFinished
  ];
}

function randomTurn(player: Player, target: Player): TurnAction {
  const currentPokemon = player.currentPokemon;
 
  const randomIndex = randomBetweenTwoNumbers(0, 3);

  return {
    type: ActionType.PokemonAttack,
    message: `${currentPokemon.name} uses ${currentPokemon.skills[randomIndex].name}`,
    pokemon: currentPokemon,
    player,
    target,
    skill: currentPokemon.skills[randomIndex]
  };
}

function selectRandomPokemon(pokemonList: Pokemon[]) {
  const pokemonAlive = pokemonList.filter(pokemon => pokemon.isAlive);

  return pokemonAlive[randomBetweenTwoNumbers(0, pokemonAlive.length - 1)];
}