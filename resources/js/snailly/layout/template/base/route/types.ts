import { ReactNode } from 'react'

export interface RouteProps {
    path: string
    icon: ReactNode
    children: string
    isActive?: boolean
}
