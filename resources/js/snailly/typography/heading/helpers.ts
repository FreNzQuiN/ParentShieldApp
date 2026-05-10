import { TypographyVariant } from '../types'

import {
    sHeadingXL,
    sHeadingL,
    sHeadingM,
    sHeadingS,
    sHeadingXS,
} from './styles'

export const getVariantStyle = (
    variant: TypographyVariant | undefined
): string => {
    switch (variant) {
        case 'xl':
            return sHeadingXL

        case 'l':
            return sHeadingL

        case 'm':
            return sHeadingM

        case 's':
            return sHeadingS

        case 'xs':
            return sHeadingXS

        default:
            return sHeadingM
    }
}
