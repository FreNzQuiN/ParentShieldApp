import React from 'react'

import { Heading, Paragraph } from '@/typography'
import { Link, Input, Button } from '@/components'

import { LoginViewProps } from './types'
import { sLogin, sLoginForm, sLoginButton } from './styles'

const LoginView = ({
    data,
    isLoading,
    formOnSubmit,
    inputFormOnChange,
}: LoginViewProps) => {
    return (
        <form onSubmit={formOnSubmit} className={sLogin}>
            <Heading type='h5' variant='xs' white>
                Login
            </Heading>
            <div className={sLoginForm}>
                <Input
                    type='email'
                    name='email'
                    label='Email'
                    value={data.email}
                    onChange={inputFormOnChange}
                    placeholder='Type your email here'
                    disabled={isLoading}
                    isLabelWhite
                    required
                />
                <Input
                    type='password'
                    name='password'
                    label='Password'
                    value={data.password}
                    onChange={inputFormOnChange}
                    placeholder='Type your password here'
                    disabled={isLoading}
                    isLabelWhite
                    required
                />
            </div>
            <div className={sLoginButton}>
                <Button type='submit' disabled={isLoading}>
                    Login
                </Button>
                <Paragraph variant='xs' white>
                    Don't have account?{' '}
                    <Link href='/auth/register'>Register</Link>
                </Paragraph>
            </div>
        </form>
    )
}

export default LoginView
