import React from 'react'
import Card from './Card'

const Row = (props) => {
    const cards=props.cards.map((card,i)=> 
        <Card key={i} card={card}/>
    )
    
    return (
    <div className='row-container'>{cards}</div>
    )
}

export default Row