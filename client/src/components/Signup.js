import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Title from './Title';

function Signup() {

  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const formObj = {
      'userName': userName,
      'password': password
    }

    fetch('http://127.0.0.1:5555/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj)
    })
      .then(r => {
        if (r.ok) {
          r.json()
            .then(data => {
              console.log(data)
              history.push('/login')
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
      <Title display='Signup'></Title>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Signup</button>
      </form>
    </>
  )
}

export default Signup