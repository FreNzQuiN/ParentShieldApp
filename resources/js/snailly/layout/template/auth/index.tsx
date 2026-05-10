import React from 'react'

import { LogoSnaily, DodoLoginLogo } from '@/assets'

import { AuthProps } from './types'
import {
    sAuth,
    sAuthLeft,
    sAuthRight,
    sAuthLeftIcon,
    sAuthLeftText,
    sAuthRightLogo,
} from './styles'

const Auth = ({ title, caption, children }: AuthProps) => {
    return (
        <div className={sAuth}>
            <div className={sAuthLeft}>
                <div className={sAuthLeftText}>
                    <h1>{title}</h1>
                    <p>{caption}</p>
                </div>
                <div className={sAuthLeftIcon}>
                    <DodoLoginLogo />
                </div>
            </div>
            <div className={sAuthRight}>
                <div className={sAuthRightLogo}>
                    <LogoSnaily />
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Auth
