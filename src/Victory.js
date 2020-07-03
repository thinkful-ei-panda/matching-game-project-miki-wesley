import React from 'react';

const Victory = (props) => {
    return (
        <div className='start-page-container'>
            <h2>Thank you for playing!</h2>
            <p>You completed the game in {props.timer} seconds.</p>
            <button className='restart-button' onClick={() => props.handleRestartButton()}>Restart</button>
        </div>
    )


}

export default Victory;