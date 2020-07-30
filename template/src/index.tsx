import React from 'react'
import {render} from 'react-dom'
import {Provider} from '@tesler-ui/core'
import {LocaleProvider} from 'antd'
import enUs from 'antd/es/locale-provider/en_US'
import {reducers} from './reducers'
import {epics} from './epics'
import './index.css'
import { AppLayout } from './components/AppLayout/AppLayout'
import { axiosInstance } from './api/session'

const App = <Provider
    customReducers={reducers}
    customEpics={epics}
    axiosInstance={axiosInstance}
>
    <LocaleProvider locale={enUs}>
        <AppLayout />
    </LocaleProvider>
</Provider>

render(App, document.getElementById('root'))
