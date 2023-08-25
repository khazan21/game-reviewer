import React from 'react';
import '../styling/title.css';

function Title({ display }) {
    const letters = display.split('');

    return (
        <div className='titleDiv'>
            <h1 className='title'>
                {letters.map((letter, index) => (
                    <span key={index} className='animatedLetter'>
                        {letter}
                    </span>
                ))}
            </h1>
        </div>
    );
}

export default Title;
