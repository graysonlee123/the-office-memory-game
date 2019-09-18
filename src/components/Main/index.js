import React from 'react';
import './Main.css'
import Jumbotron from '../Jumbotron';
import GameButton from './GameButton';

class Main extends React.Component {
    state = {
      score: 0,
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
    }

    render() {
      return (
        <div>
          <Jumbotron  />
          <main>
            {this.state.buttonPossibilities.map(item => <GameButton key={item.id} imageLink={item.imageLink} />)}
          </main>
        </div>
      );
    }
}

export default Main;