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
          <Slider changeDifficulty={this.props.changeDifficulty} />
        </nav>
      );
    }
}

export default Navbar;