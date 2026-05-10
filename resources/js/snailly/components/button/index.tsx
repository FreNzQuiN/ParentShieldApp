import React from 'react'
import { cx } from '@emotion/css'

import { ButtonProps } from './types'
import { getButtonVariant } from './helpers'
import { sButton, sButtonFull } from './styles'

const Button = ({
    type,
    variant,
    disabled,
    children,
    className,
    fullWidth,
    ...props
}: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            type={type ?? 'button'}
            className={cx(
                sButton,
                { [sButtonFull]: fullWidth },
                getButtonVariant(variant),
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
