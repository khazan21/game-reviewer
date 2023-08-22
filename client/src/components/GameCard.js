import React from 'react'
import '../styling/games.css'
import { useHistory } from 'react-router-dom'

function GameCard({ game }) {

    const history = useHistory();

    function reviewGame() {
        history.push(`/review/${game.id}`)
    }

    return (
        <div onClick={reviewGame} className='container' title={game.game_name}>
            <h2 className='gameTitle'>{game.game_name}</h2>
            <img src={game.game_pic}></img>
        </div>
    )
}

export default GameCard