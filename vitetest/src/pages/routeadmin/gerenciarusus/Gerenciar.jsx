import React, { useEffect, useState } from "react";
import AdminSidebar from "../aside/Adminsidebar";
import { API_BASE_URL } from "../../../config/api";
import "./Gerenciar.css";

const GerenciarVoluntarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [excluindoId, setExcluindoId] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") {
      alert("Acesso negado.");
      window.location.href = "/";
    }
  }, [role]);

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

  const handleExcluir = async (id) => {
    if (!window.confirm("Deseja realmente excluir este usuário?")) return;

    setExcluindoId(id);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao excluir usuário");
      }

      setUsuarios((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setErro(error.message);
    } finally {
      setExcluindoId(null);
    }
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
      <div className="gerenciar-container">
          <h2>Gerenciar Voluntários Cadastrados</h2>

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
                      <button
                        onClick={() => handleExcluir(user._id)}
                        className="btn-delete"
                        disabled={excluindoId === user._id}
                      >
                        {excluindoId === user._id ? "Excluindo..." : "Excluir"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default GerenciarVoluntarios;
