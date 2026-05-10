import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { sLink } from './styles'
import { LinkProps } from './types'

const Link = ({ href, external, children }: LinkProps) => {
    if (!external) {
        return (
            <RouterLink to={href} className={sLink}>
                {children}
            </RouterLink>
        )
    }

    return (
        <a href={href} className={sLink} rel='noreferrer' target='_blank'>
            {children}
        </a>
    )
}

export default Link
