import React from 'react';

class Slider extends React.Component {
    state = {
        difficulty: 10
    }

    handleUpdateDifficulty = event => {
        this.setState({
            difficulty: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.changeDifficulty(this.state.difficulty);
    }

    render () {
        return (
            <form>
                <span>{this.state.difficulty}</span>
                <input name="difficulty-slider" type="range" min="1" max="19" value={this.state.difficulty} className="difficulty-slider" onChange={this.handleUpdateDifficulty}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default Slider;