import React from 'react'
import '../styling/games.css'
import { useHistory } from 'react-router-dom'

function GameCard({ game }) {

    const history = useHistory();

    const { image, title } = game;

    function reviewGame() {
        history.push('/review')
    }

    return (
        <div onClick={reviewGame} className='container' title={title}>
            <h2 className='gameTitle'>{title}</h2>
            <img src={image}></img>
        </div>
    )
}

export default GameCard