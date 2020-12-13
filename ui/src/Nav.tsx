import React from 'react'
import { Button } from 'antd'

const Nav = ({ setView }: { setView: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <header className='header'>
            <div className='header-logo'>Maxxr</div>
            <div className='header-actions'>
                <Button
                    name='signin'
                    onClick={() => setView('signin')}
                    type='text'
                >Sign In</Button>

                <Button
                    name='signup'
                    onClick={() => setView('signup')}
                >Sign Up</Button>
            </div>
        </header>
    )
}

export default Nav