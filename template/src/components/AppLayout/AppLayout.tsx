import React, {useCallback} from 'react'
import { Layout, Spin } from 'antd'
import { View, ErrorPopup } from '@tesler-ui/core'
import AppSider from '../AppSider/AppSider'
import AppBar from '../AppBar/AppBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../interfaces/storeSlices'
import { Card } from '../Card/Card'
import DevPanel from '../DevPanel/DevPanel'
import { $do, SSO_AUTH } from '../../actions/types'
import styles from './AppLayout.module.css'

const skipWidgetTypes = [
    'HeaderWidget',
    'SecondLevelMenu'
]

export const AppLayout: React.FC = () => {
    const sessionActive = useSelector((state: AppState) => state.session.active)
    const logoutRequested = useSelector((state: AppState) => state.session.logout)
    const error = useSelector((state: AppState) => state.view.error)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (!sessionActive && !logoutRequested) {
            dispatch({type: SSO_AUTH})
        }
    }, [sessionActive, logoutRequested, dispatch])

    const handleError = useCallback(() => {
        dispatch($do.closeViewError(null))
    }, [dispatch])

    return sessionActive
        ? <Layout>
            <DevPanel/>
            {error && <ErrorPopup error={error} onClose={handleError} />}
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
        : <div className={styles.spinContainer}><Spin size="large"/></div>
}

export default React.memo(AppLayout)
