import React from 'react'
import { cx } from '@emotion/css'

import { sStatus } from './styles'
import { StatusProps } from './types'
import { getStatusTypeStyle } from './helpers'

const Status = ({ type, children }: StatusProps) => {
    return (
        <div className={cx(getStatusTypeStyle(type), sStatus)}>{children}</div>
    )
}

export default Status
