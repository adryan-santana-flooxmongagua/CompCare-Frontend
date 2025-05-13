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

        setUsuarios(data);
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

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <div className="usuarios-container">
          <h2>Gerenciar Voluntarios Cadastrados</h2>

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
                  <th>E-mail</th>
                  <th>Tipo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
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

        {/* Modal de Confirmação */}
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
      </main>
    </div>
  );
};

export default GerenciarUsuarios;
