import React from 'react';
import './Slider.css';

class Slider extends React.Component {
    state = {
        difficulty: 10
    }

    handleUpdateDifficulty = event => {
        document.getElementById('difficulty-submit-btn').setAttribute('data-ready', 'true');
        this.setState({
            difficulty: event.target.value
        }, () => {
            // btn.setAttribute('data-ready', 'true');
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const button = document.getElementById('difficulty-submit-btn');

        if (button.getAttribute('data-ready') === "false")
            return;
        
        this.props.changeDifficulty(this.state.difficulty);
        button.setAttribute('data-ready', 'false')
    }

    render () {
        return (
            <form className="difficulty-form">
                <div className="score faint">{this.state.difficulty}</div>
                <div>Characters</div>
                <div className="slider-container">
                    <input className="difficulty-slider" name="difficulty-slider" type="range" min="9" max={this.props.maxDifficulty} value={this.state.difficulty} onChange={this.handleUpdateDifficulty}/>
                </div>
                <div className="button-container">
                    <button id='difficulty-submit-btn' className="difficulty-button" onClick={this.handleSubmit} data-ready="false">Submit</button>
                </div>
            </form>
        )
    }
}

export default Slider;