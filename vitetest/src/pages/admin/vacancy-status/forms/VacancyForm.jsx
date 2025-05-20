import React, { useEffect, useState } from "react";
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../../../config/api";
import { getImagemPorTipo } from "../../../../utils/imagemPorTipo";
import "./VacancyForm.css";

const FormVaga = ({ vagaParaEditar, onClose, onSave }) => {
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

  useEffect(() => {
    if (vagaParaEditar) {
      const imagePath = getImagemPorTipo(vagaParaEditar.tipo_vaga);
      setFormData({
        titulodavaga: vagaParaEditar.titulodavaga || "",
        descricao: vagaParaEditar.descricao || "",
        tipo_vaga: vagaParaEditar.tipo_vaga || "",
        vl_pontos: vagaParaEditar.vl_pontos || "",
        id_hospital: vagaParaEditar.id_hospital || "",
        status: vagaParaEditar.status || "ativa",
        qtd_vagas: vagaParaEditar.qtd_vagas || "",
        image: imagePath ? `${API_BASE_IMAGE_URL}${imagePath}` : null,
      });
    }
  }, [vagaParaEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tipo_vaga") {
      const imagePath = getImagemPorTipo(value);
      setFormData((prev) => ({
        ...prev,
        tipo_vaga: value,
        image: imagePath ? `${API_BASE_IMAGE_URL}${imagePath}` : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

    const payload = { ...formData, id_admin };

    const endpoint = vagaParaEditar
      ? `${API_BASE_URL}/vagas/vagas/${vagaParaEditar._id}`
      : `${API_BASE_URL}/vagas/vagas`;

    try {
      const response = await fetch(endpoint, {
        method: vagaParaEditar ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setMensagem("Vaga salva com sucesso!");
        onSave();
        onClose();
      } else {
        setMensagem(result.message || "Erro ao salvar vaga.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("Erro ao salvar vaga.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editvg-overlay">
      <div className="editvg-container">
        <h2 className="editvg-title">{vagaParaEditar ? "Editar Vaga" : "Cadastrar Vaga"}</h2>
        <form className="editvg-form" onSubmit={handleSubmit}>
          <div className="editvg-content">
            <div className="editvg-left">
              <div className="editvg-image-upload">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="editvg-image-preview"
                  />
                ) : (
                  <div className="editvg-placeholder">Imagem da vaga</div>
                )}
              </div>
            </div>

            <div className="editvg-right">
              <div className="editvg-group">
                <label>Título da vaga</label>
                <input name="titulodavaga" value={formData.titulodavaga} onChange={handleChange} required />
              </div>
              <div className="editvg-group">
                <label>Descrição</label>
                <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />
              </div>
              <div className="editvg-row">
                <div className="editvg-group half">
                  <label>Tipo</label>
                  <select name="tipo_vaga" value={formData.tipo_vaga} onChange={handleChange} required>
                    <option value="">Selecione</option>
                    <option value="cuidados com idosos">Cuidados com Idosos</option>
                    <option value="cuidados com jovens">Cuidados com Jovens</option>
                    <option value="comunicação">Comunicação</option>
                    <option value="administração">Administração</option>
                    <option value="educação">Educação</option>
                    <option value="limpeza">Limpeza</option>
                    <option value="alimentação">Alimentação</option>
                  </select>
                </div>
                <div className="editvg-group half">
                  <label>Pontos</label>
                  <input type="number" name="vl_pontos" value={formData.vl_pontos} onChange={handleChange} required />
                </div>
              </div>
              <div className="editvg-row">
                <div className="editvg-group half">
                  <label>ID do Hospital</label>
                  <input name="id_hospital" value={formData.id_hospital} onChange={handleChange} required />
                </div>
                <div className="editvg-group half">
                  <label>Quantidade de Vagas</label>
                  <input type="number" name="qtd_vagas" value={formData.qtd_vagas} onChange={handleChange} required />
                </div>
              </div>
              <div className="editvg-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="ativa">Ativa</option>
                  <option value="pendente">Pendente</option>
                  <option value="finalizado">Finalizado</option>
                </select>
              </div>
            </div>
          </div>

          <div className="editvg-actions">
            <button type="submit" className="editvg-btn primary" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Vaga"}
            </button>
            <button type="button" className="editvg-btn secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
          {mensagem && <p className="editvg-message">{mensagem}</p>}
        </form>
      </div>
    </div>
  );
};

export default FormVaga;
