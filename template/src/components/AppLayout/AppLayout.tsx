import React from 'react'
import {Layout} from 'antd'
import {View} from '@tesler-ui/core'
import AppSider from '../AppSider/AppSider'
import AppBar from '../AppBar/AppBar'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../interfaces/storeSlices'
import Spin from 'antd/es/spin'
import { $do } from '../../actions/types'
import { Card } from '../Card/Card'

const skipWidgetTypes = [
    'HeaderWidget',
    'SecondLevelMenu'
]

export const AppLayout: React.FC = () => {

    const sessionActive = useSelector((state: AppState) => state.session.active)
    const dispatch = useDispatch()

    console.warn(process.env.REACT_APP_TESLER_API_URL)
    React.useEffect(() => {
        if (!sessionActive) {
            dispatch($do.login({ login: 'vanilla', password: 'vanilla' }))
        }
    }, [sessionActive, dispatch])

    return sessionActive
        ? <Layout>
            <Layout.Sider>
                <AppSider />
            </Layout.Sider>
            <Layout.Content>
                <Layout.Header>
                    <AppBar />
                </Layout.Header>
                <View card={Card as any} skipWidgetTypes={skipWidgetTypes} />
            </Layout.Content>
        </Layout>
        : <Spin />
}

export default React.memo(AppLayout)
