import React, { useEffect, useState } from "react";
import AdminSidebar from "../aside/Aside";
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../../config/api";
import FormVaga from "./forms/VacancyForm";
import "./VacancyStatus.css";

const StatusVaga = () => {
  const [vagaEditando, setVagaEditando] = useState(null);
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vagaParaExcluir, setVagaParaExcluir] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleDeleteClick = (vagaId) => {
    setVagaParaExcluir(vagaId);
    setShowModal(true);
  };

  const confirmarExclusao = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/vagas/vagas/${vagaParaExcluir}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao deletar vaga.");
      }

      fetchVagas();
    } catch (error) {
      console.error("Erro ao deletar vaga:", error.message);
      alert("Erro ao deletar vaga.");
    } finally {
      setShowModal(false);
      setVagaParaExcluir(null);
    }
  };

  const handleEdit = (vagaId) => {
    const vagaSelecionada = vagas.find((vaga) => vaga._id === vagaId);
    setVagaEditando(vagaSelecionada);
  };

  const handleSave = () => {
    fetchVagas();
    setVagaEditando(null);
  };

  const handleCloseForm = () => {
    setVagaEditando(null);
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Deseja realmente excluir esta vaga?</h3>
            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button className="btn-confirm" onClick={confirmarExclusao}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="dashboard-content">
        {vagaEditando ? (
          <div className="form-edit-inline">
            <h2>Editando Vaga</h2>
            <FormVaga
              vagaParaEditar={vagaEditando}
              onClose={handleCloseForm}
              onSave={handleSave}
            />
          </div>
        ) : (
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
                      <p className="vaga-quantity">
                        Qtd. Vagas: {vaga.qtd_vagas}
                      </p>
                      <p className="vaga-candidatos">
                        Voluntários Alistados: {vaga.candidatos?.length || 0}
                      </p>
                      <div className="vaga-actions">
                        <button
                          onClick={() => handleEdit(vaga._id)}
                          className="edit-btn"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteClick(vaga._id)}
                          className="delete-btn"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StatusVaga;
