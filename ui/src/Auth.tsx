import React, { useState, SetStateAction, Dispatch } from 'react'
import { Link, RouteComponentProps } from '@reach/router'
import { User } from './api'
import { Form, Input, Button } from 'antd'

import { UserAuthInput, UserData } from './types'

interface AuthProps extends RouteComponentProps {
    setUser: Dispatch<SetStateAction<UserData | null>>
}

const Auth = (props: AuthProps) => {
    const { location, navigate } = props
    const signin = 'signin'
    const signup = 'signup'
    const name: string = location?.pathname.split('/').pop() || signin
    let displayName: string = ''
    let alternativeMessage: string = ''
    let alternativeName: string = ''
    let alternativeDisplayName: string = ''

    switch (name) {
        case signin:
            displayName = 'Sign In'
            alternativeDisplayName = 'Sign Up'
            alternativeMessage = "Don't have an account?"
            alternativeName = signup
            break
        case signup:
            displayName = 'Sign Up'
            alternativeDisplayName = 'Sign In'
            alternativeMessage = 'Already have an account?'
            alternativeName = signin
            break
    }

    const [error, setError] = useState<boolean>(false)

    const onSubmit = async (values: UserAuthInput) => {
        const { setUser } = props

        const user = await User[name](values)

        if (user.error) {
            setError(true)

        } else if (navigate && user.token) {
            setUser(user)
            navigate('/dashboard')
        }
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
    }

    return (
        <div className='auth'>
            <Form layout='vertical' onFinish={onSubmit}>
                <Form.Item
                    label='Email or username'
                    name='username'
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        placeholder='john@google.com'
                        size='large'
                    />
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='password'
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        size='large'
                        onPressEnter={handleEnter}
                    />
                </Form.Item>

                {error && <div className='error auth-error'>
                    Incorrect username or password. Please try again.
                </div>}

                <Form.Item>
                    <Button type='primary' htmlType='submit' >{displayName}</Button>
                </Form.Item>
            </Form>


            <p>
                {alternativeMessage}{' '}
                <span>
                    <Link to={`/auth/${alternativeName}`}>{alternativeDisplayName}</Link>
                </span>
            </p>
        </div>
    )
}

export default Auth