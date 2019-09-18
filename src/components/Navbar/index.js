import React from 'react';
import './style.css'

class Navbar extends React.Component {
    state = {
      score: 0
    }

    render() {
      return (
        <nav>
          I'm the Navbar.
        </nav>
      );
    }
}

export default Navbar;