import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from './components/layout/Menu'
import Home from './pages/routepublic/Home'
import VagasPublicas from './pages/routepublic/VagasPublicas'
import CadastroVoluntario from './pages/routepublic/CadastroVolunter'
import LoginPage from './pages/routepublic/LoginPage'
import RegisterPage from './pages/routepublic/RegisterPage'
import Leaderboard from './pages/routepublic/LeaderBoard'
import DashboardHospital from './pages/routeadmin/DashboardHosp'
import CriarVaga from './pages/routeadmin/CriarVaga'
import GerenciarUsuarios from './pages/routeadmin/GerenciarUsu'
import NotFound from './pages/NotFound'

import PrivateRoute from './components/private/PrivateRoute'

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/vagas" element={<VagasPublicas />} />
        <Route path="/cadastroV" element={<CadastroVoluntario />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

        {/* Rotas protegidas */}
        <Route path="/admin/dashboard" element={<PrivateRoute><DashboardHospital /></PrivateRoute>} />
        <Route path="/admin/criar-vaga" element={<PrivateRoute><CriarVaga /></PrivateRoute>} />
        <Route path="/admin/usuarios" element={<PrivateRoute><GerenciarUsuarios /></PrivateRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
