import React from 'react';
import './Main.css'
import Jumbotron from '../Jumbotron';
import GameButton from './GameButton';

class Main extends React.Component {
    state = {
      score: 0,
      buttonPossibilities: [
        {
          id: 1,
          imageLink: "https://via.placeholder.com/200"
        }, 
        {
          id: 2,
          imageLink: "https://via.placeholder.com/300"
        }, 
        {
          id: 3,
          imageLink: "https://via.placeholder.com/400"
        }
      ],
      buttonGuesses: []
    }

    updateGuess = id => {
      if (this.state.buttonGuesses.includes(id)) {
        return console.log("Already guessed! Game over")
      }

      this.setState({
        buttonGuesses: [...this.state.buttonGuesses, id]
      });
      console.log(this.state.buttonGuesses);
    }

    render() {
      return (
        <div>
          <Jumbotron  />
          <main>
            {this.state.buttonPossibilities.map(({imageLink, id}) => <GameButton 
              key={id}
              id={id}
              imageLink={imageLink}
              updateGuess={this.updateGuess}
            />)}
          </main>
        </div>
      );
    }
}

export default Main;