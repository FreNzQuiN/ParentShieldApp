import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import React, { ChangeEvent, useState, FormEvent } from 'react'

import { zustand } from '@/services'
import { axiosGet, axiosPost, displayErrorMessage } from '@/utils'

import LoginView from './views'
import { LoginForm } from './types'

const LoginModule = () => {
    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar()

    const state = {
        setUser: zustand((zustandState) => zustandState.setUser),
        setChildrenList: zustand(
            (zustandState) => zustandState.setChildrenList
        ),
        fcmToken: zustand((zustandState) => zustandState.fcmToken),
    }

    const defaultLoginData: LoginForm = {
        email: '',
        password: '',
    }

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<LoginForm>({
        ...defaultLoginData,
    })

    const inputFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setData({ ...data, [name]: value })
    }

    const formOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsLoading(true)

        const { setUser, setChildrenList } = state

        enqueueSnackbar('Logging you in', { variant: 'info' })

        try {
            const responseLogin = await axiosPost(
                '/auth/login',
                { ...data, registrationToken: state.fcmToken },
                {}
            )

            const responseLoginData = await responseLogin.data
            const user = await responseLoginData.data

            const responseChildrenList = await axiosGet('/child', {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            })

            const responseChildrenListData = await responseChildrenList.data
            const childrenList = await responseChildrenListData.data

            enqueueSnackbar(responseLoginData.message, { variant: 'success' })

            setUser(user)
            setChildrenList(childrenList)
            navigate('/dashboard')
        } catch (error) {
             displayErrorMessage(error, enqueueSnackbar);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <LoginView
            data={data}
            formOnSubmit={formOnSubmit}
            isLoading={isLoading}
            inputFormOnChange={inputFormOnChange}
        />
    )
}

export default LoginModule
