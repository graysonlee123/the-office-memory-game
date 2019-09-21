import React from "react";
import characters from "./characters.json";
import Navbar from "./components/Sidebar";
import GameButton from "./components/GameButton";
import quotes from './quotes.json';
import Confetti from 'react-confetti';

function MakeConfetti() {
  return (
    <Confetti />
  )
}

class App extends React.Component {
  state = {
    score: 0,
    highScore: 0,
    difficulty: 10,
    victoryScreen: false,
    buttonGuesses: [],
    buttonPossibilities: []
  };

  renderScreen = () => {
    if (this.state.victoryScreen === true) {
      const quoteIdx =  Math.floor(Math.random() * quotes.length);


      return (
        <div className="victory-wrapper">
          <MakeConfetti initialVelocityY="10000" />
          <div className="victory-header">You win!</div>
          <button className="victory-button" onClick={this.initializeGame}>Go Again</button>
          <p className="victory-quote">"{quotes[quoteIdx].quote}"</p>
          <p className="victory-quote-character">{quotes[quoteIdx].character}</p>
        </div>
      )
    } else return (
      <main id="game-wrapper">
        <div className="game-desc">
          <div className="headers-container">
            <h2 className="text-headers">The</h2>
            <h1 className="text-headers">Office</h1>
          </div>
          <div className="desc">
            <div className="desc-header">About the Game</div>
            <div className="desc-text faint">
              The objective of the game is to click all the characters{" "}
              <i>once</i>. They shuffle around, so make sure you keep track of
              your previous guesses.
            </div>
          </div>
        </div>
        <div id="game-cards">
          {this.state.buttonPossibilities.map(({ imageLink, id }) => (
            <GameButton
              key={id}
              id={id}
              imageLink={imageLink}
              updateGuess={this.updateGuess}
            />
          ))}
        </div>
      </main>
    );
    
  }

  componentDidMount = () => {
    this.initializeGame();
  };

  finishGame = (winBoolean = false) => {
    if (winBoolean) {
      this.setState({ victoryScreen: true }, () => {
        this.render();
      });
    } else {
      console.log("Defeat");
      this.initializeGame();
    }
  };

  initializeGame = () => {
    this.setState({
      score: 0,
      victoryScreen: false,
      buttonPossibilities: this.randomizeOrder(characters).slice(
        characters.length - this.state.difficulty
      ),
      buttonGuesses: []
    });
  };

  updateGuess = id => {
    if (this.state.buttonGuesses.includes(id)) {
      this.finishGame();

      const display = document.getElementById("game-cards");

      display.classList.add("shake-animation");
      setTimeout(() => {
        display.classList.remove("shake-animation");
      }, 400);

      return;
    }

    this.setState(
      {
        buttonGuesses: [...this.state.buttonGuesses, id],
        buttonPossibilities: this.randomizeOrder(
          this.state.buttonPossibilities
        ),
        score: 1 + this.state.score,
        highScore:
          this.state.score > this.state.highScore
            ? this.state.score
            : this.state.highScore
      },
      () => {
        if (this.state.highScore < this.state.score) {
          this.setState({ highScore: this.state.score });
        }

        if (this.state.score === this.state.buttonPossibilities.length) {
          this.finishGame(true);
        }
      }
    );
  };

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
  };

  changeDifficulty = difficulty => {
    this.setState({ difficulty: difficulty }, () => {
      this.initializeGame();
    });
  };

  render() {
    return (
      <div id="page-container">
        <Navbar
          score={this.state.score}
          highScore={this.state.highScore}
          maxDifficulty={characters.length}
          changeDifficulty={this.changeDifficulty}
        />
        {this.renderScreen()}
      </div>
    );
  }
}

export default App;
