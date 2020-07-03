import React from 'react'
import Row from './Row'

//Game page:
//load cards in rows of 4 face down, timer, menu button

//User clicks on a card: turn face up if no other card is face up else turn face up, check match. If they do match then change border color and allow for next click. If they don't match wait 2 seconds then turn both face down
//If all cards matched then display vitocy page

 class Game extends React.Component {
    componentDidMount () {
        this.interval = setInterval(() => {this.props.displayTime()}, 1000)
    }

    componentWillUnmount () {
        clearInterval(this.interval)
    }

    render () {
        let cards=[]
        for(let i=0; i<this.props.cards.length;i+=4){
        const row=this.props.cards.slice(i,i+4)
        cards.push(<Row loading={this.props.loading} key={i} cards={row} handleClickCard={this.props.handleClickCard}/>)
        }

        return (
            <>
                <div className='timer-container'>
                    <h2>{this.props.timer}</h2>
                </div>
                <div>{cards}</div>
            </>
        )
    }
}

export default Game