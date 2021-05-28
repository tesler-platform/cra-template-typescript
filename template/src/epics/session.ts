import {CustomEpic, actionTypes} from '../interfaces/actions'
import { getBasicAuthRequest, logout } from '../api/session'
import { LoginResponse } from '@tesler-ui/core/interfaces/session'
import { Observable } from 'rxjs/Observable'
import { $do } from '../actions/types'
import { AxiosError } from 'axios'
import { historyObj } from '@tesler-ui/core'

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
                activeRole: data.activeRole,
                roles: data.roles,
                firstName: data.firstName,
                lastName: data.lastName,
                login: data.login,
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

const logoutEpic: CustomEpic = (action$, store) =>
    action$.ofType(actionTypes.logout).switchMap(action =>
        logout().map(() => {
            const history = historyObj
            history.action = 'PUSH'
            history.push('')
            return $do.logoutDone(null)
        })
    )

export const sessionEpics = {
    logoutEpic,
    loginEpic
}
