import React from 'react'

const Card = (props) => {
    return (
    <div className='card-container' id={props.card.id} onClick={(e) => props.handleClickCard(e)}>
        {props.card.faceUp && <img className='card-container' src={props.card.url} alt='' />}
    </div>
    )
}

export default Card