import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styling/style.css'
import Title from './Title';

function Authentication() {

    const history = useHistory();

    return (
        <>
            <Title display='Game Reviewer'></Title>

            <div className='wrap'>
                <div className='authenticator'>
                    <button className='button' onClick={() => history.push('/login')}>Login</button>
                    <button className='button' onClick={() => history.push('/signup')}>Signup</button>
                </div>
            </div>
        </>
    )
}

export default Authentication