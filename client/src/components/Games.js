import React from 'react'
import '../styling/games.css'
import GameCard from './GameCard'
import { useState, useEffect } from 'react';

function Games() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/games')
            .then(r => {
                if (r.ok) {
                    r.json().then(games => {
                        setGames(games);
                    })
                }
            })
    }, [])

    const testGame = {
        title: 'Call of Duty: Warzone',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/2400/ac505d57a46e24dd96712263d89a150cb443af288c025ff2.jpg'
    }

    const gameArray = Array.from({ length: 15 }).map((a, i) => <GameCard key={i} game={testGame} />)

    return (
        <div className='parentContainer'>
            {gameArray}
        </div>
    )
}

export default Games