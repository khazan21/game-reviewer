import React from 'react'
import '../styling/games.css'
import GameCard from './GameCard'
import { useState, useEffect } from 'react';

function Games() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('/games')
            .then(r => {
                if (r.ok) {
                    r.json().then(games => {
                        setGames(games);
                    })
                }
            })
    }, [])

    const gameArray = games.map((game, i) => <GameCard key={i} game={game} />)

    return (
        <div className='parentContainer'>
            {gameArray}
        </div>
    )
}

export default Games