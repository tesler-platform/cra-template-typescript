import React from 'react'
import { WidgetMeta } from '@tesler-ui/core/interfaces/widget'
import { TextWidget, Widget } from '@tesler-ui/core'

export interface CardOwnProps {
    children: React.ReactNode,
    meta: WidgetMeta
}

export const Card: React.FC<CardOwnProps> = (props) => {
    return props.meta.description
        ? <TextWidget meta={props.meta} />
        : <Widget meta={props.meta} />
}
