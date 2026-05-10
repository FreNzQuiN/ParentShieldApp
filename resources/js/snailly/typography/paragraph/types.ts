import { HTMLAttributes } from 'react'

import { TypographyVariant } from '../types'

export type ParagraphWeight = 'light' | 'normal' | 'semibold' | 'bold'

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
    weight?: ParagraphWeight
    variant?: TypographyVariant
    white?: boolean
    darkGreen?: boolean
    lightGreen?: boolean
}
