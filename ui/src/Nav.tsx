import React from 'react'
import { Button } from 'antd'

const Nav = () => {

    return (
        <header className='header'>
            <div className='header-logo'>Maxxr</div>
            <div className='header-actions'>
                <Button href='/signin' type='text'>Sign In</Button>
                <Button href='/signup'>Sign Up</Button>
            </div>
        </header>
    )
}

export default Nav