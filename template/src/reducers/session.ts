import {AnyAction} from '../interfaces/actions'
import {AppState} from '../interfaces/storeSlices'
import {Session} from '@tesler-ui/core/interfaces/session'

/**
 * Your initial state for this slice
 */
export const initialState: Session = {
    active: false,
    screens: [],
    loginSpin: false
}

export default function sessionReducer(
    state: Session = initialState,
    action: AnyAction,
    store?: Readonly<AppState>
): Session {
    switch (action.type) {
        /**
         * Your reducers for this slice
         */
        default:
            return state
    }
}
