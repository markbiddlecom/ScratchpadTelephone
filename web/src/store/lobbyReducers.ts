import { RandomizePlayerNameAction, ChangePlayerNameAction, EditPlayerDoneAction, EditPlayerAction } from "./appActions";
import { Game, PlayerMap, Player, PeerId, UserInterface, AppState } from "./state";
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

export function editPlayerUiReducer(uiState: UserInterface | undefined, action: EditPlayerAction) {
  return {
    ...uiState,
    appState: AppState.LobbyDrawing,
  };
}

export function editPlayerDoneUiReducer(uiState: UserInterface | undefined, action: EditPlayerDoneAction): UserInterface {
  return {
    ...uiState,
    appState: AppState.Lobby,
  };
}

export function editPlayerDoneGameReducer(gameState: Game | undefined, action: EditPlayerDoneAction): Game | undefined {
  if (gameState) {
    return {
      ...gameState,
      players: changeLocalPlayer(
        gameState.players,
        gameState.localPlayerId,
        player => ({
          ...player,
          avatarCompressedDataUrl: action.compressedDataUrl,
          avatarCompressedImageData: action.compressedImageData,
        })
      ),
    };
  } else {
    return undefined;
  }
}
