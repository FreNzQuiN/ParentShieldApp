import { ReactNode } from 'react'

export type StatusType = 'positive' | 'negative' | 'not labelling'

export interface StatusProps {
    children: ReactNode
    type: StatusType
}
