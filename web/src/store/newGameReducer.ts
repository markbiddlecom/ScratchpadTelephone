import { AppState, UserInterface } from "./state";
import { NewGameAction } from "./appActions";

export default function newGameReducer(uiState: UserInterface | undefined, action: NewGameAction): UserInterface {
    return { ...uiState, appState: AppState.Connecting };
}
