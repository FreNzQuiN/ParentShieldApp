import { FormEvent } from 'react'

export interface RegisterForm {
    email: string
    name: string
    password: string
    confirmPassword: string
}

export interface RegisterViewProps {
    data: RegisterForm
    inputFormOnChange: (event: FormEvent<HTMLInputElement>) => void
    isLoading: boolean
    formOnSubmit: (event: FormEvent<HTMLFormElement>) => void
}
