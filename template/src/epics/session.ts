import {CustomEpic, actionTypes} from '../interfaces/actions'
import { getBasicAuthRequest } from '../api/session'
import { LoginResponse } from '@tesler-ui/core/interfaces/session'
import { Observable } from 'rxjs/Observable'
import { $do } from '../actions/types'
import { AxiosError } from 'axios'

const responseStatusMessages: Record<number, string> = {
    401: 'Unauthorized',
    403: 'Access denied'
}

const loginEpic: CustomEpic = (action$, store) => action$.ofType(actionTypes.login)
.switchMap((action) => {
    const login = action.payload && action.payload.login
    const password = action.payload && action.payload.password
    return getBasicAuthRequest(login, password)
        .mergeMap((data: LoginResponse) => {
            return Observable.of($do.loginDone({
                screens: data.screens
            }))
        })
        .catch((error: AxiosError) => {
            const errorMsg = (error.response)
                ? responseStatusMessages[error.response.status] || 'Server application unavailable'
                : 'Empty response from server'
            return Observable.of($do.loginFail({errorMsg}))
        })
})

export const sessionEpics = {
    loginEpic
}
    