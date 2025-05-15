import React from "react";
import "./Leaderboard.css";

const mockVoluntarios = [
  { nome: "Hoier", pontos: 200 }, // Primeiro lugar
  { nome: "Larissa Martinez", pontos: 180 },
  { nome: "Larissa Andrade", pontos: 170 },
  { nome: "Gabriel Moura", pontos: 160 },
  { nome: "Kewin", pontos: 150 },
  { nome: "Isa Aguiar", pontos: 140 },
  { nome: "Adryz", pontos: 10 },
  { nome: "Guilherme Santinelli", pontos: 120 },
  { nome: "Joyce", pontos: 110 },
  { nome: "Brenda Tsutake", pontos: 100 },
  { nome: "Tigras", pontos: 90 },
  { nome: "Carlos", pontos: 80 },
  { nome: "Cachinhos", pontos: 70 },
];

const Leaderboard = () => {
  // Ordenar por pontos (opcional, se quiser garantir)
  const sorted = [...mockVoluntarios].sort((a, b) => b.pontos - a.pontos);

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
          {sorted.map((v, index) => (
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
              <td>{v.nome}</td>
              <td>{v.pontos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
