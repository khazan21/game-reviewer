import React from 'react'
import '../styling/title.css'

function Title({display}) {
    return (
        <div className='titleDiv'>
            <h1 className='title'>{display}</h1>
        </div>
    )
}

export default Title