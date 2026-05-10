import React from 'react'
import { cx } from '@emotion/css'

import { ParagraphProps } from './types'
import { sParagraph, sParagraphWhite, sParagraphDarkGreen, sParagraphLightGreen } from './styles'
import { getVariantStyle, getParagraphWeight } from './helpers'

const Paragraph = ({
    white,
    darkGreen,
    lightGreen,
    weight,
    variant,
    className,
    children,
    ...props
}: ParagraphProps) => {
    return (
        <p
            className={cx(
                sParagraph,
                getVariantStyle(variant),
                getParagraphWeight(weight),
                {[sParagraphWhite]: white },
                { [sParagraphDarkGreen]: darkGreen },
                { [sParagraphLightGreen]: lightGreen },
                className
            )}
            {...props}
        >
            {children}
        </p>
    )
}

export default Paragraph
