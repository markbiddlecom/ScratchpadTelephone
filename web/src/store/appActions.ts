import { Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { createGame } from "../api/createGame";
import { GameId, State, GameData } from "./state";

export enum AppActionType {
  NewGame = "APP_NEW_GAME",
  RequestingGame = "REQUESTING_GAME",
  NewGameCreated = "NEW_GAME_CREATED",
  NewGameFailed = "NEW_GAME_FAILED",
  JoinGame = "APP_JOIN_GAME",
};

export type StandardThunkAction<ReturnType = void> = ThunkAction<ReturnType, State, unknown, AnyAction>;

export type NewGameAction = StandardThunkAction;

export function newGame(): NewGameAction {
  return async function(dispatch): Promise<void> {
    dispatch(requestingGame());
    
    try {
      const gameData = await createGame();
      dispatch(newGameCreated(gameData));
    }
    catch (err) {
      console.error(err);
      dispatch(newGameFailed(
          "Sorry, we're having trouble kicking off a game right now. Check your internet connection or try again a "
              + "little later 🤞"));
    }
  };
};

export type RequestingGameAction = AnyAction;

export function requestingGame(): RequestingGameAction {
  return { type: AppActionType.RequestingGame };
};

export interface NewGameCreatedAction extends Action, GameData {};

export function newGameCreated(gameData: GameData): NewGameCreatedAction {
  return {
    type: AppActionType.NewGameCreated,
    ...gameData
  };
};

export interface NewGameFailedAction extends Action {
  errorMessage: string,
};

export function newGameFailed(errorMessage: string): NewGameFailedAction {
  return {
    type: AppActionType.NewGameFailed,
    errorMessage,
  };
};

export function joinGame(gameId: GameId): AnyAction {
  return {
    type: AppActionType.JoinGame,
    gameId: gameId,
   };
};
