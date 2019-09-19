import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Jumbotron from './components/Jumbotron';
import GameButton from './components/GameButton';

class App extends React.Component {
  state = {
    score: 0,
    highScore: 0,
    buttonGuesses: [],
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
      }, 
      {
        id: 4,
        imageLink: "https://via.placeholder.com/500"
      }
    ]
  };

  componentDidMount  = () => {
    this.initializeGame();
  };

  finishGame = (winBoolean = false) => {
    if (winBoolean) {
      console.log("Victory");
      this.initializeGame();
    } else {
      console.log("Defeat");
      this.initializeGame();
    }
  }

  initializeGame = () => {
    this.randomizeOrder();
    this.setState({
      score: 0,
      buttonGuesses: []
    });
  }

  updateGuess = id => {
    this.randomizeOrder();

    if (this.state.buttonGuesses.includes(id)) {
      this.finishGame();

      const display = document.getElementById('main-wrapper');

      display.classList.add('shake-animation');
      setTimeout(() => {
        display.classList.remove('shake-animation');
      }, 400);

      return;
    } 

    this.setState({
      buttonGuesses: [...this.state.buttonGuesses, id],
      score: 1 + this.state.score,
      highScore: this.state.score > this.state.highScore ? this.state.score : this.state.highScore
    }, () => {
      if (this.state.highScore < this.state.score) {
        this.setState({highScore: this.state.score})
      }

      if (this.state.score === this.state.buttonPossibilities.length) {
        this.finishGame(true);
      }
    });
  };

  randomizeOrder = () => {
    const buttons = this.state.buttonPossibilities;

    // This is a Fisher-Yates shuffle algorithm.
    // It moves selects, from the last index, and shuffles through
    // to the beginning of the array while setting values
    for (let i = buttons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
    }

    this.setState({
      buttonPossibilities: buttons
    });
  };

  render() {
    return (
      <div id="container">
        <Navbar
          score={this.state.score}
          highScore={this.state.highScore}
        />
        <div>
        <Jumbotron  />
        <main id="main">
          <div id="main-wrapper">
            {this.state.buttonPossibilities.map(({imageLink, id}) => 
              <GameButton 
                key={id}
                id={id}
                imageLink={imageLink}
                updateGuess={this.updateGuess}
              />  
            )}
          </div>
        </main>
      </div>
        <Footer />
      </div>
    );
  };
};

export default App;