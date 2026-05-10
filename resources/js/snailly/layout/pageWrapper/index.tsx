import React from 'react'

import { Head, AuthTemplate, BaseTemplate } from '@/layout'

import { PageWrapperProps } from './types'

const PageWrapper = ({
    title,
    caption,
    children,
    layoutType,
}: PageWrapperProps) => {
    return (
        <>
            <Head title='Snailly Desktop' />
            {layoutType === 'auth' && (
                <AuthTemplate title={title} caption={caption}>
                    {children}
                </AuthTemplate>
            )}
            {layoutType === 'base' && (
                <BaseTemplate title={title}>{children}</BaseTemplate>
            )}
            {layoutType === 'plain' && <div>{children}</div>}
        </>
    )
}

export default PageWrapper
