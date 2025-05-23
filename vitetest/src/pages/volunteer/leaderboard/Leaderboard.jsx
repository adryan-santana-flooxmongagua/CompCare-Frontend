import React, { useEffect, useState } from "react";
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../../config/api";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pontuacao/ranking/all`);	
        const data = await response.json();
        setVoluntarios(data);
      } catch (error) {
        console.error("Erro ao buscar ranking:", error);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Ranking de Voluntários</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          {voluntarios.map((v, index) => (
            <tr
              key={index}
              className={
                index === 0
                  ? "gold"
                  : index === 1
                  ? "silver"
                  : index === 2
                  ? "bronze"
                  : ""
              }
            >
              <td>#{index + 1}</td>
              <td>{v.name}</td>
              <td>{v.pontos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
