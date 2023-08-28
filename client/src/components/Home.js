import React, { useContext } from 'react';
import Games from './Games';
import Title from './Title';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';

function Home() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setUser(null);
        history.push('/');
      } else {
        console.log('Error logging out:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <div className='top-right'>
        {user ? (
          <button className='logoutBtn' onClick={handleLogout}>
            Logout
          </button>
        ) : null}
      </div>
      <Title display={'Game Reviewer'}></Title>
      <Games></Games>
    </div>
  );
}

export default Home;