import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../config/api";
import "./Mytask.css";

const MyTasks = () => {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [expandedVagaIds, setExpandedVagaIds] = useState([]);

  useEffect(() => {
    const fetchMinhasTarefas = async () => {
      try {
        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.id);

        const res = await fetch(`${API_BASE_URL}/tasks/minhas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setTarefas(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        setLoading(false);
      }
    };

    fetchMinhasTarefas();
  }, []);

  const toggleExpand = (vagaId) => {
    setExpandedVagaIds((prev) =>
      prev.includes(vagaId)
        ? prev.filter((id) => id !== vagaId)
        : [...prev, vagaId]
    );
  };

  const concluirTarefa = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}/concluir`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao concluir tarefa");

      // Atualiza lista de tarefas após conclusão
      const updated = await fetch(`${API_BASE_URL}/tasks/minhas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await updated.json();
      setTarefas(data);
      alert("Tarefa marcada como concluída!");
    } catch (error) {
      console.error("Erro:", error.message);
      alert("Erro ao concluir tarefa.");
    }
  };

  const tarefasPorVaga = tarefas.reduce((acc, task) => {
    const { vagaId } = task;
    if (!vagaId) return acc;

    if (!acc[vagaId._id]) {
      acc[vagaId._id] = {
        vagaInfo: vagaId,
        tarefas: [],
      };
    }

    if (task.atribuicoes.some((a) => a.userId._id === userId)) {
      acc[vagaId._id].tarefas.push(task);
    }

    return acc;
  }, {});

  return (
    <div className="mytask-container">
      <h2 className="mytask-title">Minhas Tarefas</h2>
      {loading ? (
        <p>Carregando tarefas...</p>
      ) : (
        <div className="mytask-card-list">
          {Object.entries(tarefasPorVaga).map(([vagaId, { vagaInfo, tarefas }]) => {
            const isExpanded = expandedVagaIds.includes(vagaId);
            return (
              <div key={vagaId} className="mytask-card">
                <div className="mytask-card-header">
                  <strong>{vagaInfo.titulodavaga}</strong>
                  <button onClick={() => toggleExpand(vagaId)}>
                    {isExpanded ? "Fechar" : "Ver tarefas"}
                  </button>
                </div>
                {isExpanded && (
                  <div className="mytask-card-body">
                    {tarefas.map((task) => {
                      const atribuicao = task.atribuicoes.find((a) => a.userId._id === userId);
                      return (
                        <div key={task._id} className="mytask-task-item">
                          <p><strong>Descrição:</strong> {task.descricao}</p>
                          <p><strong>Frequência:</strong> {task.frequencia}</p>
                          <p>
                            <strong>Status:</strong>{" "}
                            <span className={`mytask-status ${atribuicao?.status}`}>
                              {atribuicao?.status}
                            </span>
                          </p>
                          {atribuicao?.status === "pendente" && (
                            <button
                              className="mytask-conclude-btn"
                              onClick={() => concluirTarefa(task._id)}
                            >
                              Concluir
                            </button>
                          )}
                          <hr />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTasks;


