import React from 'react'
import { cx } from '@emotion/css'

import { HeadingProps } from './types'
import { getVariantStyle } from './helpers'
import {
    sHeading,
    sHeadingXL,
    sHeadingL,
    sHeadingM,
    sHeadingS,
    sHeadingXS,
    sHeadingWhite,
} from './styles'

const Heading = ({
    type,
    white,
    variant,
    className,
    children,
    ...props
}: HeadingProps) => {
    switch (type) {
        case 'h1':
            return (
                <h1
                    className={cx(
                        sHeading,
                        getVariantStyle(variant),
                        { [sHeadingWhite]: white },
                        className
                    )}
                    {...props}
                >
                    {children}
                </h1>
            )

        case 'h2':
            return (
                <h2
                    className={cx(
                        sHeading,
                        getVariantStyle(variant),
                        { [sHeadingWhite]: white },
                        className
                    )}
                    {...props}
                >
                    {children}
                </h2>
            )

        case 'h3':
            return (
                <h3
                    className={cx(
                        sHeading,
                        getVariantStyle(variant),
                        { [sHeadingWhite]: white },
                        className
                    )}
                    {...props}
                >
                    {children}
                </h3>
            )

        case 'h4':
            return (
                <h4
                    className={cx(
                        sHeading,
                        getVariantStyle(variant),
                        { [sHeadingWhite]: white },
                        className
                    )}
                    {...props}
                >
                    {children}
                </h4>
            )

        case 'h5':
            return (
                <h5
                    className={cx(
                        sHeading,
                        getVariantStyle(variant),
                        { [sHeadingWhite]: white },
                        className
                    )}
                    {...props}
                >
                    {children}
                </h5>
            )

        default:
            return (
                <h1
                    className={cx(
                        sHeading,
                        getVariantStyle(variant),
                        { [sHeadingWhite]: white },
                        className
                    )}
                    {...props}
                >
                    {children}
                </h1>
            )
    }
}

export default Heading
