import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-left">
          <span className="brand">k1llm31mmortal</span>
        </div>
        <div className="nav-links">
          <ul className="nav-list">
            <li><Link to="/home">HOME</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/portfolio">PORTFOLIO</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
            <li><Link to="/login">LOGIN</Link></li>
            <li><Link to="/register">REGISTER</Link></li>
          </ul>
        </div>
        <div className="nav-right">
          <span className="freelance-text">Available for freelance work 🠖</span>
          <a href="mailto:bogdan@gmail.com" className="hire-link">Hire Me</a>
        </div>
      </div>
    </nav>
  );
};

export default Menu;