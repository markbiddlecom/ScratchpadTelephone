import { createStore, AnyAction } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import INITIAL_STATE from "./initialState";
import sessionReducer from "./session";
import { State, Game, Session, AppState } from "./state";

function appReducer(state: State | undefined = INITIAL_STATE, action: AnyAction): State {
    const appState: AppState = state.appState;
    const game: Game | undefined = state.game;
    const session: Session | undefined = sessionReducer(state.session, action);

    if (appState === state.appState && game === state.game && session === state.session) {
        return state;
    } else {
        return { appState, game, session };
    }
}

export default createStore(appReducer, devToolsEnhancer({}));
