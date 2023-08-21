import React from 'react'
import '../styling/games.css'
import GameCard from './GameCard'
import { useHistory } from 'react-router-dom'

function Games() {

    const history = useHistory();

    const testGame = {
        title: 'Call of Duty: Warzone',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/2400/ac505d57a46e24dd96712263d89a150cb443af288c025ff2.jpg'
    }

    const gameArray = Array.from({ length: 15 }).map((a, i) => <GameCard key={i} game={testGame}/>)

    return (
        <div className='parentContainer'>
            {gameArray}
        </div>
    )
}

export default Games