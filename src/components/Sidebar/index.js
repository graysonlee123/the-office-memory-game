import React from 'react';
import './Sidebar.css'
import DifficultySlider from '../DifficultySlider';

class Navbar extends React.Component {
    state = {
      score: 0
    }

    render() {
      return (
        <nav>
          <div>
            <div>
              <div>
                {this.props.score}
              </div>
              <div>
                Current Score
              </div>
            </div>
            <div>
              <div>
                {this.props.highScore}
              </div>
              <div>
                High Score
              </div>
            </div>
            <DifficultySlider maxDifficulty={this.props.maxDifficulty} changeDifficulty={this.props.changeDifficulty} />
          </div>
          <div>
            Footer text
          </div>
        </nav>
      );
    }
}

export default Navbar;