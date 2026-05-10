import { ButtonVariant } from './types'
import {
    sButtonRed,
    sButtonPrimary,
    sButtonSecondary,
    sButtonTertiary,
} from './styles'

export const getButtonVariant = (variant: ButtonVariant) => {
    switch (variant) {
        case 'primary':
            return sButtonPrimary

        case 'secondary':
            return sButtonSecondary

        case 'tertiary':
            return sButtonTertiary

        case 'danger':
            return sButtonRed

        default:
            return sButtonPrimary
    }
}
