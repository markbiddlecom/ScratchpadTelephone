import { Reducer, AnyAction, Action } from "redux";

type SectionReducer<S, A extends Action> = (state: S | undefined, action: A) => S;

type ReducerMap<S> = {
    [type: string]: SectionReducer<S, any>,
};

export default function makeSectionReducer<S>(
    defaultState: S,
    reducers: ReducerMap<S>
): Reducer<S, AnyAction> {
    return (state: S | undefined, action: AnyAction) => {
        if (action.type in reducers) {
            return reducers[action.type](state, action);
        } else {
            return state || defaultState;
        }
    };
}
