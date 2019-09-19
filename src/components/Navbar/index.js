import React from 'react';
import './style.css'
import Slider from './Slider';

class Navbar extends React.Component {
    state = {
      score: 0
    }

    render() {
      return (
        <nav>
          Guesses: {this.props.score}
          High score: {this.props.highScore}
          <Slider maxDifficulty={this.props.maxDifficulty} changeDifficulty={this.props.changeDifficulty} />
        </nav>
      );
    }
}

export default Navbar;