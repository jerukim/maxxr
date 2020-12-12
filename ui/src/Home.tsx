import React from 'react'
import { Button, Divider } from 'antd'

function Home() {
    return (
        <div className='home'>
            <header className='header'>
                <div className='header-logo'>Maxxr</div>
                <div className='header-actions'>
                    <Button type='text'>Sign In</Button>
                    <Button>Sign Up</Button>
                </div>
            </header>

            <div className='home-container'>
                <div className='home-content home-description'>
                    <h2>Maximize your credit card rewards in 3 easy steps!</h2>
                </div>

                <div className='home-content home-steps'>
                    <div className='home-step'>
                        <Divider>1</Divider>
                        <p>Add your credit cards...</p>
                    </div>
                    <div className='home-step'>
                        <Divider>2</Divider>
                        <p>Browse or search spending categories</p>
                    </div>
                    <div className='home-step'>
                        <Divider>3</Divider>
                        <p>Use the recommended card!</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home