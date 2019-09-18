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
      }
    ]
  };

  componentDidMount  = () => {
    this.randomizeOrder();
  };

  updateGuess = id => {
    if (this.state.buttonGuesses.includes(id)) {
      this.setState({
        buttonGuesses: [],
        score: 0
      });
      this.randomizeOrder();
      // Some other visual function

      const display = document.getElementById('main')

      display.classList.add('shake-animation');
      setTimeout(() => {
        display.classList.remove('shake-animation');
      }, 400);

      return;
    }

    this.setState({
      buttonGuesses: [...this.state.buttonGuesses, id],
      score: this.state.score + 1,
      highScore: this.state.score > this.state.highScore ? this.state.score : this.state.highScore
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
          {this.state.buttonPossibilities.map(({imageLink, id}) => 
            <GameButton 
              key={id}
              id={id}
              imageLink={imageLink}
              updateGuess={this.updateGuess}
            />  
          )}
        </main>
      </div>
        <Footer />
      </div>
    );
  };
};

export default App;