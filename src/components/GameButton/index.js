import React from 'react';
import './GameButton.css';

class GameButton extends React.Component {
    render() {
        const {imageLink, id, updateGuess} = this.props;

        return (
            <button onClick={() => updateGuess(id)} className="game-button">
                <img src={imageLink} alt="Game button"/>
            </button>
        )
    }
}

export default GameButton;