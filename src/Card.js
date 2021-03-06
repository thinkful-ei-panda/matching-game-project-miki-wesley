import React from 'react'

const Card = (props) => {
    return (
    <>
        {/* if loading display without handler */}
        {props.loading===true && <div className='card-container' id={props.card.id}>
            
            {!props.card.faceUp && <div className='face-down'/>}

            {/* display the card image if card is face up and unmatched*/}
            {props.card.faceUp && props.card.matched === false && <img id={props.card.id} className='card-image' src={props.card.url} alt='' />}
            {/* display the card image with a CLASS changed to matched if card is matched */}
            {props.card.matched && <img id={props.card.id} className='card-image-matched' src={props.card.url} alt='' />}
        </div>}
    
        {/* if not loading display with handler */}
        {props.loading===false && <div className='card-container' >

            {!props.card.faceUp && <div className='face-down' id={props.card.id} onClick={(e) => props.handleClickCard(e)}/>}

            {/* display the card image if card is face up and unmatched*/}
            {props.card.faceUp && props.card.matched === false && <img id={props.card.id} className='card-image' src={props.card.url} alt='' />}
            {/* display the card image with a CLASS changed to matched if card is matched */}
            {props.card.matched && <img id={props.card.id} className='card-image-matched' src={props.card.url} alt='' />}
        </div>}
        
    </>
    )
}

export default Card