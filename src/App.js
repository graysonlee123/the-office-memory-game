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
        imageLink: "https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png"
      }, 
      {
        id: 2,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Dwight_Schrute.jpg/220px-Dwight_Schrute.jpg"
      }, 
      {
        id: 3,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Jim-halpert.jpg/220px-Jim-halpert.jpg"
      }, 
      {
        id: 4,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Pam_Beesley.jpg/220px-Pam_Beesley.jpg"
      }, 
      {
        id: 5,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Ryan_Howard_%28The_Office%29.jpg/235px-Ryan_Howard_%28The_Office%29.jpg"
      }, 
      {
        id: 6,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Angela_Martin.jpg/230px-Angela_Martin.jpg"
      }, 
      {
        id: 7,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Office-1200-baumgartner1.jpg/260px-Office-1200-baumgartner1.jpg"
      }, 
      {
        id: 8,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Oscar_Martinez_of_The_Office.jpg/250px-Oscar_Martinez_of_The_Office.jpg"
      }, 
      {
        id: 9,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Stanley_Hudson.jpg/245px-Stanley_Hudson.jpg"
      }, 
      {
        id: 10,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/CreedBratton%28TheOffice%29.jpg/220px-CreedBratton%28TheOffice%29.jpg"
      }, 
      {
        id: 11,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Phyllis_Lapin-Vance.jpg/220px-Phyllis_Lapin-Vance.jpg"
      }, 
      {
        id: 12,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Andy_Bernard_photoshot.jpg/250px-Andy_Bernard_photoshot.jpg"
      }, 
      {
        id: 13,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/Kelly_Kapoor.jpg/240px-Kelly_Kapoor.jpg"
      }, 
      {
        id: 14,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Meredith_Palmer.jpg/255px-Meredith_Palmer.jpg"
      }, 
      {
        id: 15,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Toby_Flenderson_promo_picture.jpg/220px-Toby_Flenderson_promo_picture.jpg"
      }, 
      {
        id: 16,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/6/65/DarrylPhilbin.jpg"
      }, 
      {
        id: 17,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Erin_Hannon.jpg/250px-Erin_Hannon.jpg"
      }, 
      {
        id: 18,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Hollytheoffice.jpg/220px-Hollytheoffice.jpg"
      }, 
      {
        id: 19,
        imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Gabe_profile_picture.jpg/240px-Gabe_profile_picture.jpg"
      }
    ]
  };

  componentDidMount  = () => {
    this.initializeGame();
  }

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
  }

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
  }

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
}

export default App;