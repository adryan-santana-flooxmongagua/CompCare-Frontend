import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from "../../../config/api";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos!');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha })
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || 'Email ou senha inválidos!');
      } else {
        const { token, user } = data;

        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('name', user.name);
        localStorage.setItem('userId', user.id);

        navigate(user.role === 'admin' ? '/admin/dashboard' : '/');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setErro('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="logg-container">
      <div className="logg-box">
        {/* Painel Esquerdo */}
        <div className="logg-left-panel">
          <h2 className="logg-title">Bem-vindo de Volta!</h2>
          <p className="logg-subtitle">Para se manter conectado, entre com suas informações</p>
          <Link to="/register">
            <button className="logg-switch-button">Criar Conta</button>
          </Link>
        </div>

        {/* Painel Direito (Formulário) */}
        <div className="logg-right-panel">
          <h2 className="logg-form-title">Entrar</h2>
        <form onSubmit={handleSubmit} className="logg-form">
  <div className="logg-input-group">
    <label className="logg-label">E-mail</label>
    <input
      type="email"
      placeholder="seuemail@exemplo.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="logg-input"
    />
  </div>

  <div className="logg-input-group">
    <label className="logg-label">Senha</label>
    <input
      type="password"
      placeholder="Digite sua senha"
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      className="logg-input"
    />
  </div>

  {erro && <p className="logg-error">{erro}</p>}

  <div className="logg-link-row">
    <Link to="/forgot-password" className="logg-link">Esqueceu sua senha?</Link>
  </div>

  <button type="submit" className="logg-submit-button" disabled={loading}>
    {loading ? 'Entrando...' : 'Entrar'}
  </button>

  <p className="logg-footer">
    Não tem uma conta? <Link to="/register" className="logg-link">Cadastre-se</Link>
  </p>
</form>

        </div>
      </div>
    </div>
  );
};

export default Login;
