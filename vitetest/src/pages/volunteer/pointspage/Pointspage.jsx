import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Pointr.css";

const PontuacaoUsuario = () => {
  const [pontuacao, setPontuacao] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPontuacao = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.warning("Você precisa estar logado para ver sua pontuação.");
          setLoading(false);
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;

        const res = await fetch(`${API_BASE_URL}/pontuacao/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Erro ao buscar pontuação");
        }

        const data = await res.json();
        setPontuacao(data.pontuacao); // Espera-se que a API retorne { pontuacao: 123 }
      } catch (error) {
        console.error("Erro ao buscar pontuação:", error);
        toast.error("Erro ao carregar pontuação.");
      } finally {
        setLoading(false);
      }
    };

    fetchPontuacao();
  }, []);

  return (
    <div className="pontuacao-container">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="pontuacao-card">
        <div className="icone-trofeu">🏆</div>
        <h2 className="titulo">Sua Pontuação</h2>
        {loading ? (
          <p className="pontuacao">Carregando...</p>
        ) : (
          <p className="pontuacao">
            {pontuacao !== null
              ? `${pontuacao} pontos`
              : "Pontuação não disponível"}
          </p>
        )}
      </div>
    </div>
  );
};

export default PontuacaoUsuario;
