import React, { FunctionComponent } from 'react'
import { connect, $do } from '@tesler-ui/core'
import { Form, Input, Button, Icon } from 'antd'
import { Dispatch } from 'redux'
import styles from './Login.module.css'
import { AppState } from '../../interfaces/storeSlices'

export interface LoginProps {
    spin: boolean
    errorMsg: string
    onLogin: (login: string, password: string) => void
}

export const Login: FunctionComponent<LoginProps> = props => {
    const { spin, errorMsg, onLogin } = props
    const [ login, setLogin ] = React.useState('vanilla')
    const [ password, setPassword ] = React.useState('vanilla')

    const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onLogin(login, password)
    }

    return (
        <div className={styles.container}>
            <Form onSubmit={ handleClick }>
                <Form.Item>
                    <Input prefix={ <Icon type="user"/> } placeholder="Username" value={ login }
                           onChange={ handleLogin }/>
                </Form.Item>
                <Form.Item>
                    <Input.Password prefix={ <Icon type="lock"/> } placeholder="Password" value={ password }
                                    onChange={ handlePassword }/>
                </Form.Item>
                <Form.Item>
                    <Button block autoFocus loading={ spin } type="primary" htmlType="submit">
                        Sign in
                    </Button>
                    <span>{ errorMsg }</span>
                </Form.Item>
            </Form>
        </div>
    )
}

function mapStateToProps(store: AppState) {
    return {
        spin: store.session.loginSpin,
        errorMsg: store.session.errorMsg || ''
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        onLogin: (login: string, password: string) => {
            dispatch($do.login({ login, password }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
