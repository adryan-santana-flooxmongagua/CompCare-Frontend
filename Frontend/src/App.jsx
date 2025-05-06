import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/header";
import Home from "./pages/routepublic/home/home";
import VagasPublicas from "./pages/routepublic/vagapub/vagaspublicas";
import CadastroVoluntario from "./pages/routepublic/voluntario/cadastrovolunter";
import LoginPage from "./pages/routepublic/loginpage";
import RegisterPage from "./pages/routepublic/registerpage";
import Leaderboard from "./pages/routepublic/voluntario/leaderboard";

import DashboardHospital from "./pages/routeadmin/hospage/dashboardhosp";
import CriarVaga from "./pages/routeadmin/criarvaga/criarvaga";
import GerenciarUsuarios from "./pages/routeadmin/gerenciarusu/gerenciarusu";
import AprovarVoluntarios from "./pages/routeadmin/aprov/aprovarvoluntarios";

import VagasCandidatas from "./pages/routepublic/voluntario/vagascandidatadas";

import NotFound from "./pages/notfound";
import PrivateRoute from "./components/private/privateroute";

const App = () => (
  <Router>
    <Header />
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/vagas" element={<VagasPublicas />} />
      <Route path="/cadastroV" element={<CadastroVoluntario />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      {/* Rotas de admin (precisam de token + role="admin") */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute requiredRole="admin">
            <DashboardHospital />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/criar-vaga"
        element={
          <PrivateRoute requiredRole="admin">
            <CriarVaga />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          <PrivateRoute requiredRole="admin">
            <GerenciarUsuarios />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/aprovar-voluntarios"
        element={
          <PrivateRoute requiredRole="admin">
            <AprovarVoluntarios />
          </PrivateRoute>
        }
      />
      {/* Rotas de voluntário (precisam de token + role="volunteer")*/}
      <Route
        path="/voluntario/minhas-candidaturas"
        element={
          <PrivateRoute requiredRole="volunteer">
            <VagasCandidatas />
          </PrivateRoute>
        }
      />
      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
