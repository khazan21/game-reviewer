import React from 'react'
import Games from './Games'
import Title from './Title';
import { UserContext } from '../context/user.js';
import { useContext } from 'react';

function Home() {

  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div>
      <Title display={'Game Reviewer'}></Title>
      <Games></Games>
    </div>
  )
}

export default Home