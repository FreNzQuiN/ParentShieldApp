import React from 'react'
import { cx } from '@emotion/css'

import { Label } from '@/components'

import { SelectProps } from './types'
import { sSelect, sSelectWrapper } from './styles'

const Select = ({
    label,
    children,
    disabled,
    className,
    ...props
}: SelectProps) => {
    return (
        <div className={sSelectWrapper}>
            {/* {label && <Label>{label}</Label>} */}
            <select
                disabled={disabled}
                className={cx(sSelect, className)}
                {...props}
            >
                {children}
            </select>
        </div>
    )
}

export default Select
