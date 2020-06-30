import React from 'react'
import Row from './Row'

//Game page:
//load cards in rows of 4 face down, timer, menu button

//User clicks on a card: turn face up if no other card is face up else turn face up, check match. If they do match then change border color and allow for next click. If they don't match wait 2 seconds then turn both face down
//If all cards matched then display vitocy page

const Game = (props) => {
    let cards=[]
    for(let i=0; i<props.cards.length;i+=4){
        const arr=props.cards.slice(i,i+4)
        console.log(arr);
        cards.push(<Row key={i} cards={arr}/>)
    }

    return (
        <div>{cards}</div>
    )
}

export default Game