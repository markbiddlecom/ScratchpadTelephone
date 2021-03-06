import { v4 as uuidv4 } from "uuid";

import { UserInterface, AppState, Game, Player, PlayerState } from "./state";
import { GameLoadedAction } from "./appActions";
import generateRandomPlayerName from "./generateRandomPlayerName";

export function gameLoadedUiReducer(uiState: UserInterface | undefined, action: GameLoadedAction): UserInterface {
  return { ...(uiState || {}), appState: AppState.LobbyDrawing };
}

export function gameLoadedGameReducer(gameState: Game | undefined, action: GameLoadedAction): Game {
  // Create our player locally.
  const player: Player = {
    name: generateRandomPlayerName(),
    id: uuidv4(),
    avatarCompressedDataUrl: undefined,
    avatarCompressedImageData: undefined,
    state: PlayerState.Joined,
    pendingInspirationId: null,
  };

  return {
    ...(gameState || {}),
    data: { token: action.token, timestamp: action.timestamp, syncUrl: action.syncUrl },
    localPlayerId: player.id,
    players: { [player.id]: player },
    cards: {},
  };
}

