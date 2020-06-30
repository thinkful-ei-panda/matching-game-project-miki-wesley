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
    cards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    flipped: false
  }

  handleGameSettingsSubmit= (e) =>{
    e.preventDefault();
    const numberCards = e.target.numberCards.value;
    const halfNumberCards = numberCards / 2;
    const themeSelect = e.target.themeSelect.value;
    let URL;
    let cards;

    switch(themeSelect) {
      case 'Dogs':
        URL = `https://dog.ceo/api/breeds/image/random/${halfNumberCards}`;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
          cards = ([...data.message, ...data.message]).map(url => {
            return {
              id: Math.ceil(Math.random() * 1000),
              url: url,
              faceUp: false,
              matched: false
            }
          })

          cards.sort((a,b ) => {
            return a.id - b.id
          })

          this.setState({cards});
        })
        break;

      case 'Cats':
        URL = `https://api.thecatapi.com/v1/images/search?api_key=59851ea6-2867-4bf7-8dbb-815ece716b6e&limit=${halfNumberCards}`;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          cards = ([...data, ...data]).map(item => {
            return {
              id: Math.ceil(Math.random() * 1000),
              url: item.url,
              faceUp: false,
              matched: false
            }
          })

          cards.sort((a,b ) => {
            return a.id - b.id
          })

          this.setState({cards});
        })

        break;
      default:
        // URL = ''
    }
  }

  handleClickCard = (e) => {
    if (!this.state.flipped) {
      const targetCardId = parseInt(e.target.id);
      let newCards = this.state.cards;
      const targetCard = newCards.find(card => card.id === targetCardId)

      newCards = newCards.filter(card => {
        return card.id !== targetCardId})

      newCards.push({
        id: targetCardId,
        url: targetCard.url,
        faceUp: true,
        matched: false
      });

      newCards.sort((a, b) => {
        return a.id - b.id
      })

      this.setState({cards: newCards, flipped: true})
      
    } else {
        const targetCardId = parseInt(e.target.id);
        let newCards = this.state.cards;
        const targetCard = newCards.find(card => card.id === targetCardId)

        newCards = newCards.filter(card => {
          return card.id !== targetCardId})

        newCards.push({
          id: targetCardId,
          url: targetCard.url,
          faceUp: true,
          matched: false
        });

        newCards.sort((a, b) => {
          return a.id - b.id
        })

        // const matchCheck = newCards.filter(card => card.faceUp  === true)
        // if (matchCheck[0].url === matchCheck[1].url) {
        // }


        this.setState({cards: newCards})

    }

    
  }


  


  render(){
    return(
      <div className='App'>
        <Header />
        <main>
          {/* if(startPage) */}
          <StartPage handleGameSettingsSubmit={this.handleGameSettingsSubmit}/>
          <Game cards={this.state.cards} handleClickCard={this.handleClickCard}/>


        </main>
        
      </div>
    )
  }
}

export default App;
