import React from 'react';
import Header from './Header';
import StartPage from './StartPage';
import Game from './Game';
import Victory from './Victory';
import SelectSettings from './SelectSettings';

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
    cards: [],
    flipped: false,
    loading:false,
    matched: 0,
    timer: 0,
    page: 'title'
  }



  //Handler for starting game
  handleStartGameClick= (e) => {
    this.setState({page:'settings'})
  }


  // after choosing settings
  handleGameSettingsSubmit= (e) =>{
    e.preventDefault();
    const numberCards = e.target.numberCards.value;
    const halfNumberCards = numberCards / 2;
    const themeSelect = e.target.themeSelect.value;
    let URL;
    let cards;

    //fetch images from API corresponding to the theme selected
    switch(themeSelect) {
      case 'Dogs':
        URL = `https://dog.ceo/api/breeds/image/random/${halfNumberCards}`;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
          //map the resulting data doubled to our cards          
          cards = ([...data.message, ...data.message]).map(url => {
            return {
              id: Math.ceil(Math.random() * 1000),
              url: url,
              faceUp: false,
              matched: false
            }
          })

          //sort the cards by id in order to randomize them after the doubling
          cards.sort((a,b ) => {
            return a.id - b.id
          })

          //update state with the cards
          this.setState({cards});
        })
        break;

      //same methodology as with Dogs API
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
    this.setState({page:'game'})
  }

  handleClickCard = (e) => {
    //if no card has been flipped, flip the selected card
    if (!this.state.flipped) {
      let newCards = this.state.cards;
      //find and remove the selected card from the list         
      const targetCard = newCards.find(card => card.id === Number(e.target.id))

      newCards = newCards.filter(card => {
        console.log(e.target)
        return card.id !== targetCard.id})

      //add that card back to the list with updated faceUp value and sort to the original order
      newCards.push({
        id: targetCard.id,
        url: targetCard.url,
        faceUp: true,
        matched: false
      })

      newCards.sort((a, b) => {
        return a.id - b.id
      })

      //update state with the card's flipped status, and that a card has been flipped
      this.setState({
        cards: newCards,
        flipped: true,
      })

    //if a card has already been flipped, flip the selected card and check for a match      
    } else {
        let newCards = this.state.cards;
        //find and remove the selected card from the list         
        const targetCard = newCards.find(card => card.id === Number(e.target.id))

        newCards = newCards.filter(card => {
          return card.id !== targetCard.id})

        //add that card back to the list with updated faceUp value and sort to the original order
        newCards.push({
          id: targetCard.id,
          url: targetCard.url,
          faceUp: true,
          matched: false
        })

        newCards.sort((a, b) => {
          return a.id - b.id
        })

        //update state
        this.setState({cards: newCards})

        //set an array with the 2 cards to match and check if they match with if else
        const matchCheck = newCards.filter(card => card.faceUp  === true && card.matched === false)        
        if (matchCheck[0].url === matchCheck[1].url) {   

          //if they match, add the non matching cards to the newCards
          newCards = newCards.filter (card => card.faceUp ===false || card.matched===true)  
          
          //set the matched values of the matched cards to true, add them to the newCards, sort
          matchCheck[0].matched=true;
          matchCheck[1].matched=true;
          newCards.push(...matchCheck);
          newCards.sort((a,b) => a.id-b.id);

          //update state
          this.setState({
            cards:newCards,
            flipped:false,
            matched: this.state.matched + 2
          })          
        } else {


          //if the flipped cards don't match set loading to true
          this.setState({loading:true})

          //wait 2 seconds
          setTimeout(()=>{

            //add all the non flipped and previously matched cards to newCards
            newCards = newCards.filter (card => card.faceUp === false || card.matched === true)

            //flip the flipped cards face down, add them to newCards, sort
            matchCheck[0].faceUp=false;
            matchCheck[1].faceUp=false;
            newCards.push(...matchCheck);
            newCards.sort((a,b) => a.id-b.id);

            //update state
            this.setState({
              cards:newCards,
              flipped:false,
              loading:false
            })
          }, 2000)        
        }        
    } 

  }

  displayTime = () => {
    this.setState({timer: this.state.timer + 1})
  }

  render(){

    if(this.state.cards.length === this.state.matched && this.state.cards.length !==0) {
      this.setState({page:'victory'})
    }


    return(
      <div className='App'>
        {/* <Header /> */}
        <main className='wrapper'>
          {this.state.page === 'title' && <StartPage handleStartGameClick={this.handleStartGameClick}/>}
          {this.state.page === 'settings' && <SelectSettings  handleGameSettingsSubmit={this.handleGameSettingsSubmit}/>}
          {this.state.page ==='game' && <Game timer={this.state.timer} displayTime={this.displayTime} loading={this.state.loading} cards={this.state.cards} handleClickCard={this.handleClickCard}/>}
          {this.state.page === 'victory' && <Victory timer={this.state.timer} />} 
        </main>        
      </div>
    )
  }
}

export default App;
