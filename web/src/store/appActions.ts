import { Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { createGame as createGameApi } from "../api/createGame";
import { joinGame as joinGameApi } from "../api/joinGame";
import { GameId, State, GameData } from "./state";

export enum AppActionType {
  NewGame = "APP_NEW_GAME",
  JoinGame = "APP_JOIN_GAME",
  RequestingGame = "APP_REQUESTING_GAME",
  GameLoaded = "APP_GAME_LOADED",
  GameLoadFailed = "APP_GAME_LOAD_FAILED",
  RandomizePlayerName = "LOBBY_RANDOMIZE_PLAYER_NAME",
  ChangePlayerName = "LOBBY_CHANGE_PLAYER_NAME",
};

export type StandardThunkAction<ReturnType = void> = ThunkAction<ReturnType, State, unknown, AnyAction>;

export type NewGameAction = StandardThunkAction;

export function newGame(): NewGameAction {
  return async function(dispatch): Promise<void> {
    dispatch(requestingGame());
    
    try {
      const gameData = await createGameApi();
      dispatch(gameLoaded(gameData));
    } catch (err) {
      console.error(err);
      dispatch(gameLoadFailed(
          "Sorry, we're having trouble kicking off a game right now. Check your internet connection or try again a "
              + "little later 🤞"));
    }
  };
};

export type JoinGameAction = StandardThunkAction;

export function joinGame(token: GameId): JoinGameAction {
  return async function(dispatch): Promise<void> {
    dispatch(requestingGame());

    try {
      const gameData = await(joinGameApi(token));
      dispatch(gameLoaded(gameData));
    } catch (err) {
      console.error(err);
      dispatch(gameLoadFailed(
        "Sorry, we couldn't join that game. Make sure you got the ID right and try again 🤞?"));
    }
  };
}

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

export type RandomizePlayerNameAction = AnyAction;

export function randomizePlayerName(): RandomizePlayerNameAction {
  return { type: AppActionType.RandomizePlayerName };
}

export type ChangePlayerNameAction = AnyAction & {
  name: string,
}

export function changePlayerName(name: string): ChangePlayerNameAction {
  return {
    type: AppActionType.ChangePlayerName,
    name: name,
  };
}
