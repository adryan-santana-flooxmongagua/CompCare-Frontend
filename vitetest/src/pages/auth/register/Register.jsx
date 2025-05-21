import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from "../../../config/api";
import './Register.css';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [role, setRole] = useState('volunteer');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Por favor, preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem!');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome, email, password: senha, role })
      });

      const data = await response.json();
      if (!response.ok) {
        setErro(data.error || 'Erro ao criar conta.');
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      setErro('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-container">
      <div className="reg-box">
        <div className="reg-left-panel">
          <h2 className="reg-title">Bem-vindo de Volta!</h2>
          <p className="reg-subtitle">Para se manter conectado, entre com suas informações</p>
          <Link to="/login">
            <button className="reg-switch-button">Login</button>
          </Link>
        </div>

        <div className="reg-right-panel">
          <h2 className="reg-form-title">Crie sua conta</h2>
          <form onSubmit={handleSubmit} className="reg-form">
            <div className="reg-input-group">
              <label className="reg-label">Nome</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="reg-input"
              />
            </div>

            <div className="reg-input-group">
              <label className="reg-label">E-mail</label>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="reg-input"
              />
            </div>

            <div className="reg-input-group">
              <label className="reg-label">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="reg-input"
              />
            </div>

            <div className="reg-input-group">
              <label className="reg-label">Confirmar Senha</label>
              <input
                type="password"
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="reg-input"
              />
            </div>

            <div className="reg-input-group">
              <label className="reg-label">Tipo de Usuário</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="reg-input"
              >
                <option value="volunteer">Voluntário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            {erro && <p className="reg-error">{erro}</p>}

            <button type="submit" className="reg-submit-button" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>

            <p className="reg-footer">
              Já tem uma conta? <Link to="/login" className="reg-link">Faça login aqui</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;


