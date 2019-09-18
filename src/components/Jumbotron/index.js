import React from 'react';
import './Jumbotron.css'

class Jumbotron extends React.Component {
    render() {
      return (
        <div className="jumbotron">
          <h1>Clicky Game!</h1>
          <h2>Click on an image to earn points. Don't click on the same person twice!</h2>
        </div>
      );
    }
}

export default Jumbotron;