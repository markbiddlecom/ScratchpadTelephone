import { createStore, AnyAction, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import { AppActionType } from "./appActions";
import INITIAL_STATE from "./initialState";
import makeSectionReducer from "./makeSectionReducer";
import newGameReducer from "./newGameReducer";
import sessionReducer from "./session";
import { State, Game, Session, UserInterface } from "./state";

function appReducer(state: State | undefined = INITIAL_STATE, action: AnyAction): State {
    const ui: UserInterface = makeSectionReducer(
        INITIAL_STATE.ui,
        {
            [AppActionType.NewGame]: newGameReducer
        }
    )(state.ui, action);
    const game: Game | undefined = state.game;
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
