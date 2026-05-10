import { HTMLAttributes } from 'react'

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
    name?: string
    label?: string
    required?: boolean
    disabled?: boolean
    value?: string | number
    isLabelWhite?: boolean
    type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
}
