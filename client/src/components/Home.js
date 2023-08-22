import React from 'react'
import Games from './Games'
import Title from './Title';

function Home() {
  return (
    <div>
      <Title display={'Game Reviewer'}></Title>
      <Games></Games>
    </div>
  )
}

export default Home