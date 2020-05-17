import { Action, AnyAction } from "redux";
import { GameId } from "./state";

export enum AppActionType {
    NewGame = "APP_NEW_GAME",
    JoinGame = "APP_JOIN_GAME",
};

export function newGame(): Action {
    return { type: AppActionType.NewGame };
};

export function joinGame(gameId: GameId): AnyAction {
    return {
        type: AppActionType.JoinGame,
        gameId: gameId,
     };
};
