import React from 'react';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'; // Import Link from react-router-dom
import Title from './Title';

function Signup() {
  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const formObj = {
      userName: userName,
      password: password
    };

    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj)
    }).then(r => {
      if (r.ok) {
        r.json().then(data => {
          console.log(data);
          history.push('/login');
        });
      } else {
        r.json().then(data => {
          alert(data.error);
        });
      }
    });
  }

  return (
    <>
      <Title display="Signup" />

      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          type="text"
          id="userName"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Signup</button>
      </form>

      <p className='link'>Already have an account? <Link to="/login">Login</Link></p>
    </>
  );
}

export default Signup;
