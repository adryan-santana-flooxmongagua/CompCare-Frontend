import React, { useState } from "react";
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../../../config/api";
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
  setTarefas,
  onSubmit,
  token,
}) => {
  const [tarefaParaExcluir, setTarefaParaExcluir] = useState(null);

  if (!isOpen || !vaga) return null;

  const imagemPadrao = getImagemPorTipo(vaga.tipo_vaga);
  const imagemRelativa = vaga.imageUrl
    ? vaga.imageUrl.startsWith("http")
      ? vaga.imageUrl
      : `${API_BASE_IMAGE_URL}${vaga.imageUrl}`
    : imagemPadrao
    ? `${API_BASE_IMAGE_URL}${imagemPadrao}`
    : null;

  const confirmarExclusao = (id) => setTarefaParaExcluir(id);
  const cancelarExclusao = () => setTarefaParaExcluir(null);

  const excluirTarefa = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${tarefaParaExcluir}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao excluir tarefa");
      }

      setTarefas((prev) => prev.filter((tarefa) => tarefa._id !== tarefaParaExcluir));
      setTarefaParaExcluir(null);
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="tkm-taskmodal-overlay" onClick={onClose}>
      <div className="tkm-taskmodal-container" onClick={(e) => e.stopPropagation()}>
        <button className="tkm-taskmodal-close-button" onClick={onClose}>
          &times;
        </button>

        <div className="tkm-taskmodal-grid">
          <div className="tkm-taskmodal-info">
            <div className="tkm-taskmodal-image-wrapper">
              {imagemRelativa ? (
                <img
                  src={imagemRelativa}
                  alt="Imagem da vaga"
                  className="tkm-taskmodal-image"
                />
              ) : (
                <div className="tkm-taskmodal-no-image">Sem imagem</div>
              )}
            </div>
            <h2>Descrição da Vaga</h2>
            <p className="tkm-taskmodal-descricao">{vaga.descricao}</p>
          </div>

          <div className="tkm-taskmodal-form-area">
            <h2>Adicionar Tarefa</h2>
            <form onSubmit={onSubmit} className="tkm-taskmodal-form">
            

              <select
                value={frequencia}
                onChange={(e) => setFrequencia(e.target.value)}
                required
                className="tkm-taskmodal-input"
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
                className="tkm-taskmodal-input"
              />

              <button type="submit" className="tkm-taskmodal-button">
                Adicionar Tarefa
              </button>
            </form>

            <hr className="tkm-taskmodal-divider" />

            <div className="tkm-taskmodal-tarefas-list">
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
                        className="tkm-taskmodal-delete-button"
                        onClick={() => confirmarExclusao(tarefa._id)}
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

        {/* Modal de Confirmação de Exclusão */}
        {tarefaParaExcluir && (
          <div className="tkm-confirm-modal-overlay">
            <div className="tkm-confirm-modal">
              <h3>Confirmar Exclusão</h3>
              <p>Você tem certeza que deseja excluir esta tarefa?</p>
              <div className="tkm-confirm-modal-buttons">
                <button className="tkm-confirm-button" onClick={excluirTarefa}>
                  Sim, excluir
                </button>
                <button className="tkm-cancel-button" onClick={cancelarExclusao}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;
