import { createStore, AnyAction, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import { AppActionType } from "./appActions";
import INITIAL_STATE from "./initialState";
import { gameLoadedUiReducer, gameLoadedGameReducer } from "./gameLoadedReducers";
import makeSectionReducer from "./makeSectionReducer";
import requestingGameReducer from "./requestingGameReducer";
import sessionReducer from "./session";
import { randomizePlayerNameReducer, changePlayerNameReducer } from "./lobbyReducers";
import { State, Game, Session, UserInterface } from "./state";

function appReducer(state: State | undefined = INITIAL_STATE, action: AnyAction): State {
  const ui: UserInterface = makeSectionReducer(
      INITIAL_STATE.ui,
      {
        [AppActionType.RequestingGame]: requestingGameReducer,
        [AppActionType.GameLoaded]: gameLoadedUiReducer,
      }
  )(state.ui, action);
  const game: Game | undefined = makeSectionReducer<Game | undefined>(
      undefined,
      {
        [AppActionType.GameLoaded]: gameLoadedGameReducer,
        [AppActionType.RandomizePlayerName]: randomizePlayerNameReducer,
        [AppActionType.ChangePlayerName]: changePlayerNameReducer,
      }
  )(state.game, action);
  const session: Session | undefined = sessionReducer(state.session, action);

  if (ui === state.ui && game === state.game && session === state.session) {
    return state;
  } else {
    return { ui, game, session };
  }
}

export default createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(
      thunkMiddleware
  ))
);
