import React, { KeyboardEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button } from 'antd'

import { UserAuthInput } from '../types'

import { auth } from '../store/user'
import { RootState } from '../store'

export type AuthMethod = 'signin' | 'signup'

interface AuthState {
    method: AuthMethod,
    displayName: string,
    alternativeDisplayName: string,
    alternativeMessage: string,
    alternativeMethod: AuthMethod,
}

interface AuthProps extends AuthState { }

const Auth = (props: AuthProps) => {
    const {
        method,
        displayName,
        alternativeDisplayName,
        alternativeMessage,
        alternativeMethod,
    } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state: RootState) => state.user)

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
    }

    const handleSubmit = async (values: UserAuthInput) => {
        await dispatch(auth(method, values))
        history.push('/dashboard')
    }

    return (
        <div className='auth'>
            <Form
                layout='vertical'
                onFinish={handleSubmit}
                name={method}
            >
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
                    <Button
                        type='primary'
                        htmlType='submit'
                        loading={loading}
                    >
                        {displayName}
                    </Button>
                </Form.Item>
            </Form>


            <p>
                {alternativeMessage}{' '}
                <span>
                    <Link to={`/auth/${alternativeMethod}`}>{alternativeDisplayName}</Link>
                </span>
            </p>
        </div>
    )
}

const mapSignin = (): AuthState => ({
    method: 'signin',
    displayName: 'Sign In',
    alternativeDisplayName: 'Sign Up',
    alternativeMessage: "Don't have an account?",
    alternativeMethod: 'signup',
})

const mapSignup = (): AuthState => ({
    method: 'signup',
    displayName: 'Sign Up',
    alternativeDisplayName: 'Sign In',
    alternativeMessage: 'Already have an account?',
    alternativeMethod: 'signin',
})

export const Signin = connect(mapSignin)(Auth)
export const Signup = connect(mapSignup)(Auth)