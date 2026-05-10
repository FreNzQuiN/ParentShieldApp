import { ReactNode } from 'react'

export interface ModalProps {
    title: string
    isOpen: boolean
    size?: ModalSize
    isDeleteType?: boolean
    isGrantAccessType?: boolean
    onClose: () => void
    children: ReactNode
    name?: string
}

export type ModalSize = 'small' | 'medium' | 'large' | 'full'
