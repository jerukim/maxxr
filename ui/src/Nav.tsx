import React, { Fragment } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, Menu } from 'antd'
import { signout } from './store/user'
import { RootState } from './types'

const Nav = () => {
    const location = useLocation()
    const showActions = !location?.pathname.includes('auth')
    const isAuthenticated = useSelector((state: RootState) => !!state.user.data.token)

    const history = useHistory()
    const dispatch = useDispatch()

    const handleSignout = () => {
        dispatch(signout())
        history.push('/auth/signin')
    }

    const ProfileMenu = (
        <Menu>
            <Menu.Item>
                <Link to='/profile'>Edit</Link>
            </Menu.Item>
            <Menu.Item onClick={handleSignout} >
                Sign Out
            </Menu.Item>
        </Menu>
    )

    return (
        <header
            className='header'
            style={{ ...(!showActions && { justifyContent: 'space-around' }) }}
        >
            <div className='header-logo'>
                <Link to='/'>Maxxr</Link>
            </div>

            { showActions &&
                <div className='header-actions'>
                    {isAuthenticated ? (
                        <Fragment>
                            <Button type='text'>
                                <Link to='/dashboard'>Dashboard</Link>
                            </Button>
                            <Dropdown
                                overlay={ProfileMenu}
                                trigger={['click']}
                                placement='bottomCenter'
                                arrow
                            >
                                <Button>Profile</Button>
                            </Dropdown>
                        </Fragment>
                    ) : (<Fragment>
                        <Link to='/auth/signin'>
                            <Button type='text'>Sign In</Button>
                        </Link>

                        <Link to='/auth/signup'>
                            <Button>Sign Up</Button>
                        </Link>
                    </Fragment>)
                    }
                </div>
            }
        </header >
    )
}

export default Nav