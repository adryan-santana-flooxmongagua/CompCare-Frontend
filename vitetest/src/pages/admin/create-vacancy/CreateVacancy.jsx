import React, { useState } from "react";
import AdminSidebar from "../aside/Aside";
import { API_BASE_URL } from "../../../config/api";
import "./CreateVacancy.css";

const CriarVaga = () => {
  const [formData, setFormData] = useState({
    titulodavaga: "",
    descricao: "",
    tipo_vaga: "",
    vl_pontos: "",
    id_hospital: "",
    status: "ativa",
    qtd_vagas: "",
    image: null,
  });

  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id_admin = localStorage.getItem("userId");

    if (!id_admin) {
      setMensagem("Erro: ID do administrador não encontrado.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    Object.entries({ ...formData, id_admin }).forEach(
      ([key, val]) => val && data.append(key, val)
    );

    try {
      const response = await fetch(`${API_BASE_URL}/vagas/vagas`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setMensagem("Vaga cadastrada com sucesso!");
        setFormData({
          titulodavaga: "",
          descricao: "",
          tipo_vaga: "",
          vl_pontos: "",
          id_hospital: "",
          status: "ativa",
          qtd_vagas: "",
          image: null,
        });
      } else {
        setMensagem(`Erro: ${result.message || "Falha ao cadastrar vaga"}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <div className="vaga-container-modern">
          <h2 className="title">Cadastrar Nova Vaga</h2>
          <form className="vaga-form-modern" onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="image-box">
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="preview-img"
                  />
                ) : (
                  <div className="placeholder-image">Pré-visualização</div>
                )}
                <label htmlFor="fileUpload" className="file-upload-label">
                  Upload da Imagem
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  hidden
                />
              </div>

              <div className="input-fields">
                <div className="field-group">
                  <label>Título da Vaga</label>
                  <input
                    name="titulodavaga"
                    value={formData.titulodavaga}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label>Descrição</label>
                  <textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label>Tipo de Vaga</label>
                    <select
                      name="tipo_vaga"
                      value={formData.tipo_vaga}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="cuidados com idosos">Idosos</option>
                      <option value="cuidados com jovens">Jovens</option>
                      <option value="comunicação">Comunicação</option>
                      <option value="administração">Administração</option>
                      <option value="educação">Educação</option>
                      <option value="limpeza">Limpeza</option>
                      <option value="alimentação">Alimentação</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label>Valor em Pontos</label>
                    <input
                      type="number"
                      name="vl_pontos"
                      value={formData.vl_pontos}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label>ID do Hospital</label>
                  <input
                    name="id_hospital"
                    value={formData.id_hospital}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="ativa">Ativa</option>
                      <option value="pendente">Pendente</option>
                      <option value="finalizado">Finalizado</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label>Qtd. de Vagas</label>
                    <input
                      type="number"
                      name="qtd_vagas"
                      value={formData.qtd_vagas}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Salvando..." : "Cadastrar Vaga"}
            </button>
          </form>

          {mensagem && <div className="feedback-msg">{mensagem}</div>}
        </div>
      </main>
    </div>
  );
};

export default CriarVaga;

