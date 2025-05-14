import React, { useEffect, useState } from 'react';
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../../config/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PublicVacancy.css';

const VagasPublicas = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [candidaturas, setCandidaturas] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem('token');

    try {
      // Buscar vagas públicas
      const vagasResponse = await fetch(`${API_BASE_URL}/vagas/vagas`);
      const vagasData = await vagasResponse.json();
      const vagasAtivas = vagasData.filter(v => v.status === 'ativa');
      setVagas(vagasAtivas);

      // Se estiver logado, buscar candidaturas
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserRole(decodedToken.role);

        const candidaturasResponse = await fetch(`${API_BASE_URL}/candidaturas/minhas`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const candidaturasData = await candidaturasResponse.json();
        const idsDasVagasCandidatadas = candidaturasData.map(c => c.vagaId);
        setCandidaturas(idsDasVagasCandidatadas);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoading(false); // Isso precisa rodar mesmo sem token
    }
  };

  fetchData();
}, []);


  const handleCandidatar = async (vagaId) => {
    if (userRole !== 'volunteer') {
      toast.warning('Você precisa ser um voluntário para se candidatar a vagas.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('Você precisa estar logado para se candidatar.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/candidaturas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vagaId }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setCandidaturas(prev => [...prev, vagaId]);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Erro ao se candidatar:", error);
      toast.error("Erro ao se candidatar.");
    }
  };

  return (
    <div className="vagas-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <h2 className="vagas-title">Vagas Disponíveis</h2>

      {loading ? (
        <p className="vagas-loading">Carregando vagas...</p>
      ) : vagas.length === 0 ? (
        <p className="vagas-empty">Não há vagas disponíveis no momento.</p>
      ) : (
        <div className="vagas-list">
          {vagas.map(vaga => (
            <div key={vaga._id} className="vaga-card">
              {vaga.imageUrl && (
                <img
                  src={`${API_BASE_IMAGE_URL}${vaga.imageUrl}`}
                  alt={vaga.titulodavaga}
                  className="vaga-image"
                />
              )}
              <div className="vaga-info">
                <h3 className="vaga-title">{vaga.titulodavaga}</h3>
                <p className="vaga-desc">{vaga.descricao}</p>
                <p className="vaga-type">Tipo: {vaga.tipo_vaga}</p>
                <p className="vaga-status">Status: {vaga.status}</p>
                <p className="vaga-points">Pontos: {vaga.vl_pontos}</p>
                <p className="vaga-quantity">Vagas: {vaga.qtd_vagas}</p>

                {candidaturas.includes(vaga._id) ? (
                  <p className="vaga-candidatado">Você já se candidatou.</p>
                ) : (
                  <button
                    className="vaga-btn"
                    onClick={() => handleCandidatar(vaga._id)}
                  >
                    Quero me candidatar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VagasPublicas;
