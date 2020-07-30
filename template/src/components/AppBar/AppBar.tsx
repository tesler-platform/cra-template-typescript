import React from 'react'
import { ViewNavigation } from '../ViewNavigation/ViewNavigation'

export const AppBar: React.FC = () => {
    return <header>
        <ViewNavigation />
    </header>
}

export default React.memo(AppBar)
