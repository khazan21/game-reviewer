import React from 'react'
import '../styling/games.css'


function GameCard({ game }) {

    const { image, title } = game;

    return (
        <div className='container' title={title}>
            <h2 className='gameTitle'>{title}</h2>
            <img src={image}></img>
        </div>
    )
}

export default GameCard