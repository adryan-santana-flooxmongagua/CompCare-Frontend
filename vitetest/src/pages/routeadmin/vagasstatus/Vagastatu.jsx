import React, { useEffect, useState } from "react";
import AdminSidebar from "../aside/Adminsidebar";
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../../config/api";
import "./Vagastate.css";

const StatusVaga = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVagas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/vagas`);
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Formato inválido da resposta de vagas.");
      }

      setVagas(data);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVagas();
  }, []);

  const handleDelete = async (vagaId) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta vaga?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/vagas/${vagaId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Vaga excluída com sucesso!");
        setVagas(vagas.filter((vaga) => vaga._id !== vagaId));
      } else {
        const result = await response.json();
        alert(result.message || "Erro ao excluir vaga.");
      }
    } catch (error) {
      console.error("Erro ao excluir vaga:", error);
      alert("Erro ao excluir vaga.");
    }
  };

  const handleEdit = (vagaId) => {
    alert(`Função de editar ainda não implementada. Vaga ID: ${vagaId}`);
  };

  return (
    <div className="dashboard-layout">
    <AdminSidebar />
    <main className="dashboard-content">
      <div className="usuarios-container">
        <h2>Status das Vagas</h2>
  
        {loading ? (
          <p>Carregando vagas...</p>
        ) : vagas.length === 0 ? (
          <p>Não há vagas disponíveis.</p>
        ) : (
          <div className="vagas-list">
            {vagas.map((vaga) => (
              <div key={vaga._id} className="vaga-card">
                {vaga.imageUrl ? (
                  <img
                    src={`${API_BASE_IMAGE_URL}${vaga.imageUrl}`}
                    alt={vaga.titulodavaga}
                    className="vaga-image"
                  />
                ) : (
                  <div className="vaga-no-image">Sem imagem</div>
                )}
                <div className="vaga-info">
                  <h3 className="vaga-title">{vaga.titulodavaga}</h3>
                  <p className="vaga-type">Tipo: {vaga.tipo_vaga}</p>
                  <p className="vaga-status">Status: {vaga.status}</p>
                  <p className="vaga-points">Pontos: {vaga.vl_pontos}</p>
                  <p className="vaga-quantity">Qtd. Vagas: {vaga.qtd_vagas}</p>
                  <p className="vaga-candidatos">Voluntários Alistados: {vaga.candidatos?.length || 0}</p>
                  <div className="vaga-actions">
                    <button onClick={() => handleEdit(vaga._id)} className="edit-btn">Editar</button>
                    <button onClick={() => handleDelete(vaga._id)} className="delete-btn">Excluir</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  </div>
  );
};

export default StatusVaga;
