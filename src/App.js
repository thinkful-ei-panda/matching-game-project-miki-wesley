import React from 'react';
import Header from './Header';
import StartPage from './StartPage';
import Game from './Game';

//Starting page:
//Title, instructions, Form with select 16,20,24 cards, themes: dogs, playing cards, cats, classmates faces, Start game button

//When selections are submitted, get assets from APIs
//Make 2x cards for each image
//Randomize order of cards

//Game page:
//load cards in rows of 4 face down, timer, menu button

//User clicks on a card: turn face up if no other card is face up else turn face up, check match. If they do match then change border color and allow for next click. If they don't match wait 2 seconds then turn both face down
//If all cards matched then display vitocy page

//Victory Page
//Display 'You Win!! , Time, Number of clicks

//Menu page:
//Restart, Go to Start




class App extends React.Component{
  state= {
    cards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  }

  handleGameSettingsSubmit= (e) =>{
    e.preventDefault();
    console.log('click',e.target.numberCards.value,e.target.themeSelect.value);
  }


  render(){
    return(
      <div className='App'>
        <Header />
        <main>
          {/* if(startPage) */}
          <StartPage handleGameSettingsSubmit={this.handleGameSettingsSubmit}/>
          <Game cards={this.state.cards}/>


        </main>
        
      </div>
    )
  }
}

export default App;
