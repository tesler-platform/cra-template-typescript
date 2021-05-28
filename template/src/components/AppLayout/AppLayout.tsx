import React from 'react'
import {Layout} from 'antd'
import {View} from '@tesler-ui/core'
import AppSider from '../AppSider/AppSider'
import AppBar from '../AppBar/AppBar'
import { useSelector } from 'react-redux'
import { AppState } from '../../interfaces/storeSlices'
import { Card } from '../Card/Card'
import DevPanel from '../DevPanel/DevPanel'
import Login  from '../Login/Login'

const skipWidgetTypes = [
    'HeaderWidget',
    'SecondLevelMenu'
]

export const AppLayout: React.FC = () => {

    const sessionActive = useSelector((state: AppState) => state.session.active)

    console.warn(process.env.REACT_APP_TESLER_API_URL)

    return sessionActive
        ? <Layout>
            <DevPanel/>
            <Layout>
                <Layout.Sider>
                    <AppSider/>
                </Layout.Sider>
                <Layout.Content>
                    <Layout.Header>
                        <AppBar/>
                    </Layout.Header>
                    <View card={ Card as any } skipWidgetTypes={ skipWidgetTypes }/>
                </Layout.Content>
            </Layout></Layout>
        : <Login/>
}

export default React.memo(AppLayout)
