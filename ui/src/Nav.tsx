import React, { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Dropdown, Menu } from 'antd'
import { RootState } from './types'

const Nav = () => {
    const location = useLocation()
    const showActions = !location?.pathname.includes('auth')
    const isAuthenticated = useSelector((state: RootState) => !!state.user.token)

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
                        <Dropdown
                            overlay={ProfileMenu}
                            trigger={['click']}
                            placement='bottomCenter'
                            arrow
                        >
                            <Button>Profile</Button>
                        </Dropdown>
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

export const ProfileMenu = (
    <Menu>
        <Menu.Item>
            <Link to='/auth/signout'>Sign Out</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/profile'>Edit</Link>
        </Menu.Item>
    </Menu>
)

export default Nav