import React from 'react';
import './Pointr.css';

const PontuacaoUsuario = () => {
  // Aqui futuramente virá a lógica de buscar a pontuação via API
  const pontuacaoFicticia = 120; // valor fictício para visualização

  return (
    <div className="pontuacao-container">
      <div className="pontuacao-card">
        <div className="icone-trofeu">🏆</div>
        <h2 className="titulo">Sua Pontuação</h2>
        <p className="pontuacao">{pontuacaoFicticia} pontos</p>
      </div>
    </div>
  );
};

export default PontuacaoUsuario;
