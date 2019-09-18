import React from 'react';
import './GameButton.css';

class GameButton extends React.Component {
    render() {
        const {imageLink, id} = this.props;

        return (
            <button onClick="" className="game-button" data-id={id}>
                <img src={imageLink} alt="Game button"/>
            </button>
        )
    }
}

export default GameButton;