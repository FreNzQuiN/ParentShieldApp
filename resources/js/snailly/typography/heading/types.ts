import { ReactNode, HTMLAttributes } from 'react'

import { TypographyVariant } from '../types'

export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    type: HeadingType
    children: ReactNode
    variant?: TypographyVariant
    white?: boolean
}
