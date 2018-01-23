
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {

  render() {
    return <footer className="footer">
      <div className="footer__left">
        This is Blundit. We're at version 0.2 (Pre-Alpha).
        <br/>
        <Link to="/about">About</Link>
        <br/>
        <Link to="/about">Contact</Link>
        <br/>
        <Link to="/about">Privacy Policy</Link>
        <br/>

      </div>
      <div className="footer__center"/>
      <div className="footer__right">
        <a href="http://fb.me/blundit" target="_blank" rel="noopener noreferrer"><span className="fab fa-facebook-square"/></a>
        <a href="https://medium.com/blundit" target="_blank" rel="noopener noreferrer"><span className="fab fa-medium"/></a>
        <a href="https://twitter.com/heyblundit" target="_blank" rel="noopener noreferrer"><span className="fab fa-twitter-square"/></a>
        <a href="https://www.youtube.com/channel/UCzGxQc2HmjZHO7A-MNYNWOg" target="_blank" rel="noopener noreferrer"><span className="fab fa-youtube"/></a>
        <a href="https://trello.com/b/JMQX0OJP/blundit" target="_blank" rel="noopener noreferrer"><span className="fab fa-trello"/></a>
        <a href="https://github.com/Blundit" target="_blank" rel="noopener noreferrer"><span className="fab fa-github"/></a>
      </div>
    </footer>

  }
}

export default Footer;