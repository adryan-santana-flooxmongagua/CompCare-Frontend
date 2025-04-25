import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/vagas">Vagas</Link>
      <Link to="/leaderboard">Ranking</Link>
      <Link to="/cadastro">Cadastro Voluntário</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Registrar</Link>
    </nav>
  )
}

export default Menu
