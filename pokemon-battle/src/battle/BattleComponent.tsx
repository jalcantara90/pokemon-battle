import React, { useState, useEffect } from "react";
import { PokemonCard } from "../trainer/PokemonCard";
import { red, blue } from "../data/trainers";
import { PokemonGrid } from "./BattleComponent.styled";
import { Pokemon } from "../models/pokemon.model";
import {UsePlayer, usePlayer} from "./hooks/player.hook"
import { Skill } from "../models/skills.model";
import { damageMultiplier, TypeChart } from "../constants/type-chart";


export enum ActionType {
  ChangePokemon,
  PokemonAttack,
  PlayerStartWith
}

export interface Turn {
  number: number;
  actions: TurnAction[];
}

export interface TurnAction {
  type: ActionType;
  message: string;
  player: UsePlayer,
  pokemon: Pokemon;
  target?: UsePlayer;
  skill?: Skill;
}

interface Battle {
  log: Turn[];
  isStarted: boolean;
}

export interface Players {
  you: UsePlayer;
  enemy: UsePlayer;
}

function useBattle(player1: UsePlayer, player2: UsePlayer): [Battle, (pokemon: Pokemon) => void, Players, Function] {
  const [battle, setBattle] = useState<Battle>({
    log: [],
    isStarted: false
  });

  const [playerOne, handleChoosePokemonPlayerOne, handleDamageTakenPlayerOne] = usePlayer(player1.trainerId, player1.name, player1.pokemonList);
  const [playerTwo, handelChoosePokemonPlayerTwo, handleDamageTakenPlayerTwo] = usePlayer(player2.trainerId, player2.name, player2.pokemonList);
  const [playerAction, setPlayerAction] = useState<TurnAction>();
  
  // empezar combate
  function battleStart() {
    // battle.isStarted = true;
    // battle.playerOne = playerOne;
    // battle.playerTwo = playerTwo;
    // battle.log.push({
    //   number: 0,
    //   actions: [
    //     {
    //       type: ActionType.PlayerStartWith,
    //       player: playerOne,
    //       pokemon: playerOne.currentPokemon as Pokemon,
    //       message: `The player ${playerOne.name} start with ${playerOne.currentPokemon?.name}`
    //     },
    //     {
    //       type: ActionType.PlayerStartWith,
    //       player: playerTwo,
    //       pokemon: playerTwo.currentPokemon as Pokemon,
    //       message: `The player ${playerTwo.name} start with ${playerTwo.currentPokemon?.name}`
    //     },
    //   ]
    // });

    // setBattle({...battle});

    setBattle({
      isStarted: true,
      log: [{
        number: 0,
        actions: [
          {
            type: ActionType.PlayerStartWith,
            player: playerOne,
            pokemon: playerOne.currentPokemon as Pokemon,
            message: `The player ${playerOne.name} start with ${playerOne.currentPokemon?.name}`
          },
          {
            type: ActionType.PlayerStartWith,
            player: playerTwo,
            pokemon: playerTwo.currentPokemon as Pokemon,
            message: `The player ${playerTwo.name} start with ${playerTwo.currentPokemon?.name}`
          },
        ]
      }]
    });
  }

  useEffect(() => {
    if (playerOne.currentPokemon && !battle.isStarted) {
      handelChoosePokemonPlayerTwo(blue.pokemonList[0]);
      // inicialice la batalla
      battleStart();
    }
  }, [playerOne.currentPokemon]);

  useEffect(
    () => {
      if (!playerAction) return;

      const playerTwoAction = randomTurn(playerTwo, playerOne);

      const turnActions = [
        playerAction,
        playerTwoAction
      ].sort(sortActions)
      .map(action => {
        if (action.type === ActionType.ChangePokemon) return action; 

        const {target, player, pokemon, skill} = action;

        const damage = damageCalculation(skill, player, target);

        // if(target.trainerId === playerOne.trainerId) {
        //   handleDamageTakenPlayerOne(damage);
        // }else{
        //   handleDamageTakenPlayerTwo(damage);
        // };

        target.trainerId === playerOne.trainerId ?
          handleDamageTakenPlayerOne(damage):
          handleDamageTakenPlayerTwo(damage);

        return {
          ...action,
          target,
          pokemon,
          skill,
          message: `${action.message}.
            ${target.currentPokemon.name} has received ${damage} damage
          `
        };
      });

      console.log(turnActions);

      console.log('se dispara', playerAction);

      setBattle({
        ...battle,
        log: [
          ...battle.log,
          {
            number: battle.log.length,
            actions: turnActions
          }
        ]
      });
    },
    [playerAction]
  );

  function attack(skill: Skill) {
    setPlayerAction({
      type: ActionType.PokemonAttack,
      message: `${playerOne.currentPokemon.name} uses ${skill.name}`,
      player: playerOne,
      target: playerTwo,
      pokemon: playerOne.currentPokemon,
      skill
    });
  }

  // nuevo turno

  return [
    battle,
    handleChoosePokemonPlayerOne,
    {
      you: playerOne,
      enemy: playerTwo
    },
    attack
  ]
}

function randomTurn(enemy: UsePlayer, targetPlayer: UsePlayer): TurnAction {
  const {currentPokemon} = enemy;
  
  const randomIndex = randomBetweenTwoNumbers(0, 3);
  const skill = currentPokemon.skills[randomIndex];

  return {
    type: ActionType.PokemonAttack,
    target: targetPlayer,
    player: enemy,
    pokemon: currentPokemon,
    message: `${currentPokemon.name} uses ${skill.name}`,
    skill
  };
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

function damageCalculation(skill: Skill, attackerPlayer: UsePlayer, target: UsePlayer) {
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

export function randomBetweenTwoNumbers(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function BattleComponent() {
  // const [playerOne, handleChoosePokemonOne] = usePlayer(red.name, red.pokemonList);
  // const [playerTwo, handleChoosePokemonTwo] = usePlayer(blue.name, blue.pokemonList);
  const [battle, handleChoosePokemon, players, attack] = useBattle(
    {
      trainerId: red.id,
      name: red.name,
      pokemonList: red.pokemonList,
      currentPokemon: null
    }, 
    {
      trainerId: blue.id,
      name: blue.name,
      pokemonList: blue.pokemonList,
      currentPokemon: null
    }
  ); 


  // useEffect(() => {
  //   if (playerOne.currentPokemon && !battle.isStarted) {
  //     handelChoosePokemonPlayerTwo(blue.pokemonList[0]);
  //     // inicialice la batalla
  //     battleStart();
  //     console.log(battle);
  //   }
  // }, [playerOne.currentPokemon]);

  // const handleSelectPokemon = (pokemon: Pokemon) => {
  //   handleChoosePokemonOne(pokemon);
  //   console.log('se dispara', pokemon);
  // };

  return (
    <>
      {
        !battle.isStarted ? 
        <PokemonGrid>
        {  
          red.pokemonList.map(pokemon => 
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              selectPokemon={handleChoosePokemon}
            />
          )
        }
        </PokemonGrid> :
        <div>
          <ul>
            {
              battle.log.map((turn, index) => 
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
            players.you.pokemonList.filter(pokemon => pokemon.id !== players.you.currentPokemon.id) 
              .map(pokemon => <button key={pokemon.id} onClick={() => handleChoosePokemon(pokemon)}>{pokemon.name}</button>)
          }

          <br />
          {
            players.you.currentPokemon.skills.map(skill => <button key={skill.name} onClick={() => attack(skill)}> {skill.name}</button> )
          
          }
          <div>
            {players.you.name} - {players.you.currentPokemon.name} : {players.you.currentPokemon.currentHp}  / {players.you.currentPokemon.stats.hp}     
          </div>
          <div>
            {players.enemy.name} - {players.enemy.currentPokemon.name} : {players.enemy.currentPokemon.currentHp}  / {players.enemy.currentPokemon.stats.hp}
          </div>
        </div>
      }
    </>



  )
}