import React, { useEffect, useState } from "react";
import AdminSidebar from "../aside/Aside";
import { API_BASE_URL } from "../../../config/api";
import "./ApproveVolunteers.css";

const AprovarVoluntarios = () => {
  const [candidaturas, setCandidaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCandidaturasPendentes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/candidaturas/pendentes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Erro ao buscar candidaturas");

        setCandidaturas(data);
      } catch (error) {
        console.error("Erro ao buscar candidaturas:", error);
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidaturasPendentes();
  }, [token]);

  const abrirModal = (id, tipo) => {
    setSelectedId(id);
    setActionType(tipo);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setSelectedId(null);
    setActionType("");
  };

  const confirmarAcao = async () => {
    if (!selectedId || !actionType) return;

    try {
      const endpoint = actionType === "aprovar" ? "aprovar" : "recusar";
      const response = await fetch(`${API_BASE_URL}/candidaturas/${endpoint}/${selectedId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || `Erro ao ${actionType} candidatura`);

      setCandidaturas((prev) => prev.filter((c) => c._id !== selectedId));
      fecharModal();
    } catch (error) {
      console.error(`Erro ao ${actionType} candidatura:`, error);
      setErro(error.message);
      fecharModal();
    }
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <div className="aprov-container">
          <h2>Candidaturas Pendentes de Aprovação</h2>

          {loading ? (
            <p>Carregando candidaturas...</p>
          ) : erro ? (
            <p className="aprov-error">{erro}</p>
          ) : candidaturas.length === 0 ? (
            <p>Nenhuma candidatura pendente.</p>
          ) : (
            <table className="aprov-table">
              <thead>
                <tr>
                  <th>Voluntário</th>
                  <th>Email</th>
                  <th>Vaga</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {candidaturas.map((c) => (
                  <tr key={c._id}>
                    <td>{c.userId?.name || "N/A"}</td>
                    <td>{c.userId?.email || "N/A"}</td>
                    <td>{c.vagaId?.titulodavaga || "Vaga desconhecida"}</td>
                    <td>
                      <button
                        onClick={() => abrirModal(c._id, "aprovar")}
                        className="aprov-btn aprov-aceitar"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => abrirModal(c._id, "recusar")}
                        className="aprov-btn aprov-recusar"
                      >
                        Recusar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {modalVisible && (
            <div className="aprov-modal-overlay">
              <div className="aprov-modal-content">
                <h3>Confirmar Ação</h3>
                <p>
                  Tem certeza que deseja <strong>{actionType}</strong> esta candidatura?
                </p>
                <div className="aprov-modal-buttons">
                  <button onClick={confirmarAcao} className="aprov-btn aprov-confirmar">
                    Confirmar
                  </button>
                  <button onClick={fecharModal} className="aprov-btn aprov-cancelar">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AprovarVoluntarios;


