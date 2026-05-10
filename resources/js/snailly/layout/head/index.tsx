import React, { useEffect } from 'react'

import { HeadProps } from './types'

const Head = ({ title }: HeadProps) => {
    useEffect(() => {
        document.title = title
    }, [title])

    return null
}

export default Head
