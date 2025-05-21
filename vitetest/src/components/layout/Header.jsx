// src/components/layout/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    setRole(storedRole);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setRole(null);
    navigate('/login');
  };

  return (
    <header className="hhed-header">
      <div className="hhed-container">
        <h1 className="hhed-logo">CompCare</h1>
        <nav className="hhed-nav">
          <Link to="/" className="hhed-nav-link">Home</Link>
          <Link to="/vagas" className="hhed-nav-link">Vagas</Link>
          <Link to="/leaderboard" className="hhed-nav-link">Ranking</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hhed-nav-link">Login</Link>
              <Link to="/register" className="hhed-nav-link">Registrar</Link>
            </>
          ) : (
            <div className="hhed-menu-wrapper">
              <button
                className="hhed-menu-button"
                onClick={() => setMenuOpen(o => !o)}
              >
                ☰
              </button>
              {menuOpen && (
                <div className="hhed-dropdown-menu">
                  {role === 'admin' && (
                    <>
                      <Link to="/admin/dashboard" className="hhed-dropdown-link">Dashboard</Link>
                      <Link to="/admin/criar-vaga" className="hhed-dropdown-link">Criar Vaga</Link>
                      <Link to="/admin/usuarios" className="hhed-dropdown-link">Usuários</Link>
                    </>
                  )}
                  {role === 'volunteer' && (
                    <>
                      <Link to="/meus-pontos" className="hhed-dropdown-link">Meus Pontos</Link>
                      <Link to="/voluntario/minhas-candidaturas" className="hhed-dropdown-link">Minhas Vagas</Link>
                      <Link to="/voluntario/Mytask" className="hhed-dropdown-link">Tarefas</Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="hhed-dropdown-link hhed-logout"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
