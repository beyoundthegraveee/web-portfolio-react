import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { useRole } from './RoleContext';
import Cookies from 'js-cookie';

const Menu = () => {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    Cookies.remove('user');
    setRole('guest');
    navigate('/home');
  };

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
            {role === 'guest' && <li><Link to="/login">LOGIN</Link></li>}
            {role === 'guest' && <li><Link to="/register">REGISTER</Link></li>}
            {(role === 'user' || role === 'admin') && (
              <li>
                <Link to="#" onClick={handleLogout}>LOGOUT</Link>
              </li>
            )}
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