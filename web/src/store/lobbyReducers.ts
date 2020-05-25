import { RandomizeNameAction } from "./appActions";
import { Game } from "./state";
import generateRandomPlayerName from "./generateRandomPlayerName";

export function randomizeNameReducer(gameState: Game | undefined, action: RandomizeNameAction): Game | undefined {
  if (gameState) {
    return {
      ...gameState,
      players: { 
        ...gameState.players, 
        ...{
          [gameState.localPlayerId]: {
            ...gameState.players[gameState.localPlayerId],
            name: generateRandomPlayerName(),
          },
        } 
      },
    };
  } else {
    return undefined;
  }
}
