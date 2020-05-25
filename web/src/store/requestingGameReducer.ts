import { AppState, UserInterface } from "./state";
import { RequestingGameAction } from "./appActions";

export default function requestingGameReducer(uiState: UserInterface | undefined, action: RequestingGameAction): UserInterface {
  return { ...uiState, appState: AppState.Connecting };
}
