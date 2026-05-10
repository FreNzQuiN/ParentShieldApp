import React from 'react'

import { Heading, Paragraph } from '@/typography'
import { Link, Input, Button } from '@/components'

import { RegisterViewProps } from './types'
import { sRegister, sRegisterForm, sRegisterButton } from './styles'

const RegisterView = ({
    data,
    isLoading,
    formOnSubmit,
    inputFormOnChange,
}: RegisterViewProps) => {
    return (
        <form onSubmit={formOnSubmit} className={sRegister}>
            <Heading type='h5' variant='xs' white>
                Registration
            </Heading>
            <div className={sRegisterForm}>
                <Input
                    type='text'
                    name='name'
                    label='Name'
                    value={data.name}
                    onChange={inputFormOnChange}
                    placeholder='Type your name here'
                    disabled={isLoading}
                    isLabelWhite
                    required
                />
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
                <Input
                    type='password'
                    name='confirmPassword'
                    label='Confirm Password'
                    value={data.confirmPassword}
                    onChange={inputFormOnChange}
                    placeholder='Type your confirm password here'
                    disabled={isLoading}
                    isLabelWhite
                    required
                />
            </div>
            <div className={sRegisterButton}>
                <Button type='submit' disabled={isLoading}>
                    Register
                </Button>
                <Paragraph variant='xs' white>
                    Have already account? <Link href='/auth/login'>Login</Link>
                </Paragraph>
            </div>
        </form>
    )
}

export default RegisterView
