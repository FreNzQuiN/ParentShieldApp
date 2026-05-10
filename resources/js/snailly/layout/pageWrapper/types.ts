import { ReactNode } from 'react'

export interface PageWrapperProps {
    children: ReactNode
    title?: string
    caption?: string
    layoutType: 'base' | 'auth' | 'plain'
}
