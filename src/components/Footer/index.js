import React from 'react';
import './Footer.css'

class Footer extends React.Component {
    state = {
      score: 0
    }

    render() {
      return (
        <footer>
          I'm the Footer.
        </footer>
      );
    }
}

export default Footer;