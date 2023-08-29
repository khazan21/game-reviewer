import React from 'react'
import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom'
import Title from './Title';
import { UserContext } from '../context/user.js';

function Login() {

    const { setUser } = useContext(UserContext);

    const history = useHistory();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const formObj = {
            'userName': userName,
            'password': password
        }

        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formObj)
        })
            .then(r => {
                if (r.ok) {
                    r.json()
                        .then(user => {
                            setUser(user);
                            history.push('/home')
                        })
                }
                else {
                    r.json()
                        .then(data => {
                            console.log(data)
                        })
                }
            })
    }

    console.log(userName, password);

    return (
        <>
            <Title display='Login'></Title>
            <form className='form' onSubmit={handleSubmit}>
                <input
                    placeholder='Username'
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />

                <input
                    placeholder='Password'
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Click here</Link> to create one.</p>
        </>
    )
}

export default Login