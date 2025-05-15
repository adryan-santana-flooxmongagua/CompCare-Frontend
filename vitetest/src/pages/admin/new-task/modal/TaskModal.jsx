import React, { useState } from "react";
import { API_BASE_IMAGE_URL } from "../../../../config/api";
import "./TaskModal.css";

const TaskModal = ({
  isOpen,
  onClose,
  vaga,
  descricao,
  setDescricao,
  frequencia,
  setFrequencia,
  tarefas,
  onSubmit,
  onDelete,
}) => {
  if (!isOpen || !vaga) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content two-columns"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-left">
          {vaga.imageUrl && (
            <img
              src={`${API_BASE_IMAGE_URL}${vaga.imageUrl}`}
              alt="Imagem da vaga"
            />
          )}
          <h2>Descrição da Vaga</h2>
          <p className="vaga-descricao">{vaga.descricao}</p>
        </div>

        <div className="modal-right">
          <form onSubmit={onSubmit} className="tarefa-form">
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição da tarefa"
              required
            />
            <select
              value={frequencia}
              onChange={(e) => setFrequencia(e.target.value)}
            >
              <option value="diaria">Diária</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
            </select>
            <button type="submit">Adicionar Tarefa</button>
          </form>

          <hr />

          <div className="lista-tarefas">
            <h3>Tarefas cadastradas</h3>
            {tarefas.length > 0 ? (
              <ul>
                {tarefas.map((tarefa) => (
                  <li key={tarefa._id}>
                    <span>
                      <strong>{tarefa.frequencia}</strong>: {tarefa.descricao}
                    </span>
                    <button onClick={() => onDelete(tarefa._id)}>
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma tarefa cadastrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
