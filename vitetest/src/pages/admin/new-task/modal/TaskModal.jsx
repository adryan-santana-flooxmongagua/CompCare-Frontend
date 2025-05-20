import React from "react";
import { API_BASE_IMAGE_URL } from "../../../../config/api";
import { getImagemPorTipo } from "../../../../utils/imagemPorTipo";
import "./TaskModal.css";

const TaskModal = ({
  isOpen,
  onClose,
  vaga,
  titulo,
  setTitulo,
  descricao,
  setDescricao,
  frequencia,
  setFrequencia,
  tarefas,
  onSubmit,
  onDelete,
}) => {
  if (!isOpen || !vaga) return null;

  // Obtem imagem da vaga
  const imagemRelativa = vaga.imageUrl
    ? `${API_BASE_IMAGE_URL}${vaga.imageUrl}`
    : getImagemPorTipo(vaga.tipo_vaga)
    ? `${API_BASE_IMAGE_URL}${getImagemPorTipo(vaga.tipo_vaga)}`
    : null;

  return (
    <div className="newtaskmodal-overlay" onClick={onClose}>
      <div
        className="newtaskmodal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="newtaskmodal-close-button" onClick={onClose}>
          &times;
        </button>

        <div className="newtaskmodal-grid">
          <div className="newtaskmodal-description">
            <div className="newtaskmodal-image">
              {imagemRelativa ? (
                <img
                  src={imagemRelativa}
                  alt="Imagem da vaga"
                  className="newtaskmodal-vaga-imagem"
                />
              ) : (
                <div className="newtask-no-image">Sem imagem</div>
              )}
            </div>

            <h2>Descrição da Vaga</h2>
            <p className="newtaskmodal-vaga-descricao">{vaga.descricao}</p>
          </div>

          <div className="newtaskmodal-tasks">
            <h2>Adicionar Tarefa</h2>
            <form onSubmit={onSubmit} className="newtaskmodal-form">
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título da tarefa"
                required
                className="newtaskmodal-input"
              />

              <select
                value={frequencia}
                onChange={(e) => setFrequencia(e.target.value)}
                required
                className="newtaskmodal-input"
              >
                <option value="">Selecione o tipo</option>
                <option value="diaria">Diária</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
              </select>

              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição da tarefa"
                required
                className="newtaskmodal-input"
              />

              <button type="submit" className="newtaskmodal-button">
                Adicionar Tarefa
              </button>
            </form>

            <hr className="newtaskmodal-divider" />

            <div className="newtaskmodal-lista-tarefas">
              <h3>Tarefas cadastradas</h3>
              {tarefas.length > 0 ? (
                <ul>
                  {tarefas.map((tarefa) => (
                    <li key={tarefa._id}>
                      <span>
                        <strong>{tarefa.titulo}</strong> ({tarefa.frequencia})
                        <br />
                        {tarefa.descricao}
                      </span>
                      <button onClick={() => onDelete(tarefa._id)}>Excluir</button>
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
    </div>
  );
};

export default TaskModal;
