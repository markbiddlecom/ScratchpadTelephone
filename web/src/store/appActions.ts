import { Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { createGame } from "../api/createGame";
import { GameId, State, GameData } from "./state";

export enum AppActionType {
  NewGame = "APP_NEW_GAME",
  JoinGame = "APP_JOIN_GAME",
  RequestingGame = "REQUESTING_GAME",
  GameLoaded = "GAME_LOADED",
  GameLoadFailed = "GAME_LOAD_FAILED",
  RandomizeName = "RANDOMIZE_NAME",
};

export type StandardThunkAction<ReturnType = void> = ThunkAction<ReturnType, State, unknown, AnyAction>;

export type NewGameAction = StandardThunkAction;

export function newGame(): NewGameAction {
  return async function(dispatch): Promise<void> {
    dispatch(requestingGame());
    
    try {
      const gameData = await createGame();
      dispatch(gameLoaded(gameData));
    }
    catch (err) {
      console.error(err);
      dispatch(gameLoadFailed(
          "Sorry, we're having trouble kicking off a game right now. Check your internet connection or try again a "
              + "little later 🤞"));
    }
  };
};

export type RequestingGameAction = AnyAction;

export function requestingGame(): RequestingGameAction {
  return { type: AppActionType.RequestingGame };
};

export interface GameLoadedAction extends Action, GameData {};

export function gameLoaded(gameData: GameData): GameLoadedAction {
  return {
    type: AppActionType.GameLoaded,
    ...gameData,
  };
};

export interface GameLoadFailedAction extends Action {
  errorMessage: string,
};

export function gameLoadFailed(errorMessage: string): GameLoadFailedAction {
  return {
    type: AppActionType.GameLoadFailed,
    errorMessage,
  };
};

export function joinGame(gameId: GameId): AnyAction {
  return {
    type: AppActionType.JoinGame,
    gameId: gameId,
   };
};

export type RandomizeNameAction = AnyAction;

export function randomizeName(): RandomizeNameAction {
  return { type: AppActionType.RandomizeName };
}
