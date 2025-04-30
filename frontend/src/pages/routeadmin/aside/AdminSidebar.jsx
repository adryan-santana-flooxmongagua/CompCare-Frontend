import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-sidebar__title">Admin Panel</h2>
      <ul className="admin-sidebar__nav">
        <li onClick={() => navigate('/admin/dashboard')}>Página principal</li>
        <li onClick={() => navigate('/admin/usuarios')}>Gerenciar usuários</li>
        <li onClick={() => navigate('/admin/criar-vaga')}>Criar nova vaga</li>
        <li onClick={() => navigate('/admin/dashboard')}>Ver vagas abertas</li>
        <li onClick={() => navigate('/admin/dashboard')}>Candidatos por vaga</li>
        <li onClick={() => navigate('/admin/dashboard')}>Aprovar voluntários</li>
        <li onClick={() => navigate('/admin/dashboard')}>Histórico de tarefas</li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;