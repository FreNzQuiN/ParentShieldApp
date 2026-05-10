import { HTMLAttributes, ReactNode } from 'react'

export interface Option {
    label: string
    value: string
}

export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
    label?: string
    disabled?: boolean
}
