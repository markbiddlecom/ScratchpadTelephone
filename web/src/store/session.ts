import { AnyAction } from "redux";

import { Session } from "./state";

export default function sessionReducer(state: Session | undefined, action: AnyAction) : Session | undefined {
    return state;
}
