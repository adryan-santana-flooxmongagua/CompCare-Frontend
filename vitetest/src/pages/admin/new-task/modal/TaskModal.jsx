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

  const imagemRelativa = vaga.imageUrl
    ? `${API_BASE_IMAGE_URL}${vaga.imageUrl}`
    : getImagemPorTipo(vaga.tipo_vaga)
    ? `${API_BASE_IMAGE_URL}${getImagemPorTipo(vaga.tipo_vaga)}`
    : null;

  return (
    <div className="taskmodal-overlay" onClick={onClose}>
      <div className="taskmodal-container" onClick={(e) => e.stopPropagation()}>
        <button className="taskmodal-close-button" onClick={onClose}>
          &times;
        </button>

        <div className="taskmodal-grid">
          <div className="taskmodal-info">
            <div className="taskmodal-image-wrapper">
              {imagemRelativa ? (
                <img
                  src={imagemRelativa}
                  alt="Imagem da vaga"
                  className="taskmodal-image"
                />
              ) : (
                <div className="taskmodal-no-image">Sem imagem</div>
              )}
            </div>

            <h2>Descrição da Vaga</h2>
            <p className="taskmodal-descricao">{vaga.descricao}</p>
          </div>

          <div className="taskmodal-form-area">
            <h2>Adicionar Tarefa</h2>
            <form onSubmit={onSubmit} className="taskmodal-form">
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título da tarefa"
                required
                className="taskmodal-input"
              />

              <select
                value={frequencia}
                onChange={(e) => setFrequencia(e.target.value)}
                required
                className="taskmodal-input"
              >
                <option value="">Frequência</option>
                <option value="diaria">Diária</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
              </select>

              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição da tarefa"
                required
                className="taskmodal-input"
              />

              <button type="submit" className="taskmodal-button">
                Adicionar Tarefa
              </button>
            </form>

            <hr className="taskmodal-divider" />

            <div className="taskmodal-tarefas-list">
              <h3>Tarefas Cadastradas</h3>
              {tarefas.length > 0 ? (
                <ul>
                  {tarefas.map((tarefa) => (
                    <li key={tarefa._id}>
                      <div>
                        <strong>{tarefa.titulo}</strong> ({tarefa.frequencia})
                        <p>{tarefa.descricao}</p>
                      </div>
                      <button
                        className="taskmodal-delete-button"
                        onClick={() => onDelete(tarefa._id)}
                      >
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
    </div>
  );
};

export default TaskModal;
