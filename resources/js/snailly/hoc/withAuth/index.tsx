import React, { ComponentType, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { zustand } from '@/services'

const withAuth = <Props extends {}>(Component: ComponentType<Props>) => {
    return (props: Props) => {
        const navigate = useNavigate()
        const location = useLocation()

        const state = {
            user: zustand((zustandState) => zustandState.user),
            isAuthenticating: zustand((zustandState) => zustandState.isAuthenticating),
        }

        useEffect(() => {
            if (!state.isAuthenticating && !state.user) {
                navigate('/auth/login', { replace: true, state: { from: location.pathname } })
            }
        }, [state.isAuthenticating, state.user, navigate, location.pathname])

        if (state.isAuthenticating) {
            return null
        }

        return <Component {...props} />
    }
}

export default withAuth
