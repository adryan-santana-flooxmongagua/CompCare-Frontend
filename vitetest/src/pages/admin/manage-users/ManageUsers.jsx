import React, { useEffect, useState } from "react";
import AdminSidebar from "../aside/Aside";
import { API_BASE_URL } from "../../../config/api";
import "./ManageUsers.css";

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('volunteer');
  const [cadastrando, setCadastrando] = useState(false);

  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [dadosParaCadastro, setDadosParaCadastro] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao buscar usuários");
        }

        const usuariosOrdenados = data.sort((a, b) => {
          if (a.role === "admin" && b.role !== "admin") return -1;
          if (a.role !== "admin" && b.role === "admin") return 1;
          return 0;
        });

        setUsuarios(usuariosOrdenados);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [token]);

  const confirmarExclusao = (userId) => {
    const user = usuarios.find((u) => u._id === userId);
    setUsuarioSelecionado(user);
    setModalAberto(true);
  };

  const handleExcluir = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${usuarioSelecionado._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao excluir usuário");
      }

      setUsuarios((prev) => prev.filter((user) => user._id !== usuarioSelecionado._id));
      setModalAberto(false);
      setUsuarioSelecionado(null);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setErro(error.message);
      setModalAberto(false);
    }
  };

  const confirmarCadastro = async () => {
    try {
      setCadastrando(true);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: dadosParaCadastro.nome,
          email: dadosParaCadastro.email,
          password: dadosParaCadastro.senha,
          role: dadosParaCadastro.role,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar usuário");
      }

      setUsuarios((prev) => [...prev, data]);
      setNome('');
      setEmail('');
      setSenha('');
      setRole('volunteer');
      setErro('');
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setErro(error.message);
    } finally {
      setCadastrando(false);
      setModalCadastroAberto(false);
      setDadosParaCadastro(null);
    }
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <div className="usuarios-container">
          <h2>Gerenciar Voluntários e Administradores</h2>

          {/* Formulário de Cadastro no topo */}
          <form
            className="cadastro-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!nome || !email || !senha) {
                setErro('Todos os campos são obrigatórios para cadastro!');
                return;
              }
              setDadosParaCadastro({ nome, email, senha, role });
              setModalCadastroAberto(true);
            }}
          >
            <h3>Cadastrar Novo Usuário</h3>
            {erro && <p className="error">{erro}</p>}
            <div className="form-row">
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="volunteer">Voluntário</option>
                <option value="admin">Administrador</option>
              </select>
              <button type="submit" className="btn-create" disabled={cadastrando}>
                {cadastrando ? "Cadastrando..." : "Cadastrar"}
              </button>
            </div>
          </form>

          {/* Lista de Usuários */}
          {loading ? (
            <p>Carregando usuários...</p>
          ) : erro ? (
            <p className="error">{erro}</p>
          ) : usuarios.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'admin' : 'volunteer'}`}>
                        {user.role === 'admin' ? 'Administrador' : 'Voluntário'}
                      </span>
                    </td>
                    <td>
                      <button className="btn-delete" onClick={() => confirmarExclusao(user._id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal de Confirmação de Exclusão */}
        {modalAberto && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirmar Exclusão</h3>
              <p>
                Tem certeza que deseja excluir <strong>{usuarioSelecionado?.name}</strong>?
              </p>
              <div className="modal-buttons">
                <button className="btn-cancel" onClick={() => setModalAberto(false)}>
                  Cancelar
                </button>
                <button className="btn-confirm" onClick={handleExcluir}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmação de Cadastro */}
        {modalCadastroAberto && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirmar Cadastro</h3>
              <p>
                Deseja realmente cadastrar <strong>{dadosParaCadastro?.nome}</strong> como <strong>{dadosParaCadastro?.role === 'admin' ? 'Administrador' : 'Voluntário'}</strong>?
              </p>
              <div className="modal-buttons">
                <button className="btn-cancel" onClick={() => setModalCadastroAberto(false)}>
                  Cancelar
                </button>
                <button className="btn-confirma" onClick={confirmarCadastro}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GerenciarUsuarios;
