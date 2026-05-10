import { ReactNode, HTMLAttributes } from 'react'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    disabled?: boolean
    fullWidth?: boolean
    variant?: ButtonVariant
    type?: 'button' | 'submit' | 'reset'
}

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger'
