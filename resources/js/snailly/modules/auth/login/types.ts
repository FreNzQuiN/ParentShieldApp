import { FormEvent } from 'react'

export interface LoginForm {
    email: string
    password: string
}

export interface LoginViewProps {
    data: LoginForm
    isLoading: boolean
    formOnSubmit: (event: FormEvent<HTMLFormElement>) => void
    inputFormOnChange: (e: FormEvent<HTMLInputElement>) => void
}
