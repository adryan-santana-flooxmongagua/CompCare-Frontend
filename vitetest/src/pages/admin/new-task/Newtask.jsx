import React, { useState, useEffect } from "react";
import AdminSidebar from "../aside/Aside";
import TaskModal from "./modal/TaskModal";
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../../config/api";
import "./NewTask.css";

const NewTask = () => {
  const [vagas, setVagas] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [frequencia, setFrequencia] = useState("diaria");
  const [tarefas, setTarefas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVagas();
  }, []);

  const fetchVagas = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/vagas/vagas`);
      const data = await res.json();
      setVagas(data);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    }
  };

  const openModal = async (vaga) => {
    setVagaSelecionada(vaga);
    setIsModalOpen(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/tasks/vaga/${vaga._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTarefas(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/tasks/criar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vagaId: vagaSelecionada._id,
          descricao,
          frequencia,
        }),
      });

      if (!res.ok) {
        const erro = await res.json();
        throw new Error(erro.message || "Erro ao criar tarefa");
      }

      setDescricao("");
      setFrequencia("diaria");

      const atualizadas = await fetch(`${API_BASE_URL}/tasks/vaga/${vagaSelecionada._id}`);
      const data = await atualizadas.json();
      setTarefas(data);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error.message);
      alert(`Erro: ${error.message}`);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao excluir tarefa");

      const atualizadas = await fetch(`${API_BASE_URL}/tasks/vaga/${vagaSelecionada._id}`);
      const data = await atualizadas.json();
      setTarefas(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir tarefa.");
    }
  };

  return (
    <div className="newtask-layout">
      <AdminSidebar />
      <main className="newtask-content">
        <div className="newtask-grid">
          {vagas.map((vaga) => (
            <div key={vaga._id} className="newtask-card">
              {vaga.imageUrl ? (
                <img
                  src={`${API_BASE_IMAGE_URL}${vaga.imageUrl}`}
                  alt={vaga.titulodavaga}
                  className="newtask-card-img"
                />
              ) : (
                <div className="newtask-no-image">Sem imagem</div>
              )}
              <h3>{vaga.titulodavaga}</h3>
              <button className="newtask-button" onClick={() => openModal(vaga)}>
                Criar Tarefa
              </button>
            </div>
          ))}
        </div>

        {isModalOpen && vagaSelecionada && (
          <TaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            vaga={vagaSelecionada}
            descricao={descricao}
            setDescricao={setDescricao}
            frequencia={frequencia}
            setFrequencia={setFrequencia}
            tarefas={tarefas}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
};

export default NewTask;
