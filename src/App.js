import React from 'react';
import characters from './characters.json';
import Navbar from './components/Sidebar';
import GameButton from './components/GameButton';

class App extends React.Component {
  state = {
    score: 0,
    highScore: 0,
    difficulty: 10,
    buttonGuesses: [],
    buttonPossibilities: []
  }

  componentDidMount  = () => {
    this.initializeGame();
  }

  finishGame = (winBoolean = false) => {
    if (winBoolean) {
      console.log("Victory - show victory screen");
      this.initializeGame();
    } else {
      console.log("Defeat");
      this.initializeGame();
    }
  }

  initializeGame = () => {
    this.setState({ 
      score: 0,
      buttonPossibilities: this.randomizeOrder(characters).slice(characters.length - this.state.difficulty)
    });
  }

  updateGuess = id => {
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
      buttonPossibilities: this.randomizeOrder(this.state.buttonPossibilities),
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
  }

  randomizeOrder = arr => {
    // This is a Fisher-Yates shuffle algorithm.
    // It moves selects, from the last index, and shuffles through
    // to the beginning of the array while setting values
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;

    // this.setState({
    //   buttonPossibilities: rand
    // });
  }

  changeDifficulty = difficulty => {
    this.setState({ difficulty: difficulty }, () => {
      this.initializeGame();
    });
  }

  render() {
    return (
      <div id="page-container">
        <Navbar
          score={this.state.score}
          highScore={this.state.highScore}
          maxDifficulty={characters.length}
          changeDifficulty={this.changeDifficulty}
        />
        <main id="game-wrapper">
          <div>
            <h2 className="text-headers">The</h2>
            <h1 className="text-headers">Office</h1>
          </div>
          <div id="game-cards">
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
    );
  };
}

export default App;