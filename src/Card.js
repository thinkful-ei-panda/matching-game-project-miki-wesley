import React from 'react'

const Card = (props) => {
    return (
    <div className='card-container' id={props.card.id} onClick={(e) => props.handleClickCard(e)}>

        {/* display the card image if card is face up */}
        {props.card.faceUp && <img id={props.card.id} className='card-image' src={props.card.url} alt='' />}
    </div>
    )
}

export default Card