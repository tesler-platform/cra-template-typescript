import React from "react"
import { DevToolsPanel } from "@tesler-ui/core"

const DevPanel: React.FunctionComponent = () => {
    const showCondition = process.env.NODE_ENV === 'development'
    return (
        <>
            {showCondition && (
                <DevToolsPanel/>
            )}
        </>
    )
}

export default React.memo(DevPanel)
