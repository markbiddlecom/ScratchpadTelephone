import { RandomizePlayerNameAction, ChangePlayerNameAction } from "./appActions";
import { Game, PlayerMap, Player, PeerId } from "./state";
import generateRandomPlayerName from "./generateRandomPlayerName";

function changeLocalPlayer(
    players: PlayerMap, 
    playerId: PeerId, 
    modifier: (player: Player) => Player
): PlayerMap {
  return {
    ...players,
    ...{
      [playerId]: modifier(players[playerId])
    },
  };
}

export function randomizePlayerNameReducer(gameState: Game | undefined, action: RandomizePlayerNameAction): Game | undefined {
  if (gameState) {
    return {
      ...gameState,
      players: changeLocalPlayer(
          gameState.players, 
          gameState.localPlayerId, 
          player => ({
            ...player,
            name: generateRandomPlayerName(),
          })
      ),
    };
  } else {
    return undefined;
  }
}

export function changePlayerNameReducer(gameState: Game | undefined, action: ChangePlayerNameAction): Game | undefined {
  if (gameState) {
    return {
      ...gameState,
      players: changeLocalPlayer(
          gameState.players,
          gameState.localPlayerId,
          player => ({
            ...player,
            name: action.name,
          })
      ),
    };
  } else {
    return undefined;
  }
}
