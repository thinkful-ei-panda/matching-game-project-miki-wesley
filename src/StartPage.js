import React from 'react'

const StartPage = (props) => {
    return (
        <div className='start-page-container'>
            <header>
                <h1>Cats vs Dogs:</h1>
                <h2>A Matching Game</h2>
            </header>
            <div className='instructions'>
                Choose how many cards you want and if you like dogs or cats.
                Match the cards as fast as you can to see how you score.            
            </div>
            <div className='start-button-container'>
                <button onClick={e=>props.handleStartGameClick(e)}type='button'>Start Game</button>        
            </div>
        </div>
    )
}

export default StartPage