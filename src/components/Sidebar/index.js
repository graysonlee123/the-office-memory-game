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
            <div className="score-wrapper">
              <div className="score">
                {this.props.score}
              </div>
              <div>
                Current Score
              </div>
            </div>
            <div className="score-wrapper">
              <div className="score faint">
                {this.props.highScore}
              </div>
              <div>
                High Score
              </div>
            </div>
            <DifficultySlider maxDifficulty={this.props.maxDifficulty} changeDifficulty={this.props.changeDifficulty} />
          </div>
          <div className="footer-text">
            Made with 💜 by <a href="https://github.com/graysonlee123" target="_blank">graysonlee123</a>
          </div>
        </nav>
      );
    }
}

export default Navbar;