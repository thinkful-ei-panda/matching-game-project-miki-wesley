import React from 'react'
import Card from './Card'

const Row = (props) => {
    const cards=props.cards.map((card,i)=> 
        <Card loading={props.loading} key={i} card={card} handleClickCard={props.handleClickCard}/>
    )
    
    return (
    <div className='row-container'>{cards}</div>
    )
}

export default Row