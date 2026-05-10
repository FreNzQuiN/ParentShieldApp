import { ModalSize } from './types'

import {
    sModalContentSmall,
    sModalContentMedium,
    sModalContentLarge,
} from './styles'

export const getSizeStyles = (size: ModalSize) => {
    switch (size) {
        case 'small':
            return sModalContentSmall
        case 'medium':
            return sModalContentMedium
        case 'large':
            return sModalContentLarge
        default:
            return ''
    }
}
