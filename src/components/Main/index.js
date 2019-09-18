import React from 'react';
import './style.css'
import Jumbotron from '../Jumbotron';

class Main extends React.Component {
    state = {
      score: 0
    }

    render() {
      return (
        <main>
          <Jumbotron  />
          I'm the Main.
        </main>
      );
    }
}

export default Main;