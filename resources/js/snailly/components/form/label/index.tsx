import React from 'react'
import { cx } from '@emotion/css'

import { sLabel, sLabelWhite } from './styles'
import { LabelProps } from './types'

const Label = ({ isWhite, children }: LabelProps) => {
    return (
        <label
            className={cx(sLabel, {
                [sLabelWhite]: isWhite,
            })}
        >
            {children}
        </label>
    )
}

export default Label
