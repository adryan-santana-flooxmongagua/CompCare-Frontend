import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">CompCare</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/vagas" className="nav-link">Vagas</Link>
          <Link to="/leaderboard" className="nav-link">Ranking</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Registrar</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
