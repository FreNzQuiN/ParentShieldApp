import React from 'react'

import { Label } from '@/components'

import { InputProps } from './types'
import { sInput, sInputWrapper } from './styles'

const Input = ({
    name,
    label,
    disabled,
    isLabelWhite,
    ...props
}: InputProps) => {
    return (
        <div className={sInputWrapper}>
            {label && <Label isWhite={isLabelWhite}>{label}</Label>}
            <input
                name={name}
                className={sInput}
                disabled={disabled}
                {...props}
            />
        </div>
    )
}

export default Input
