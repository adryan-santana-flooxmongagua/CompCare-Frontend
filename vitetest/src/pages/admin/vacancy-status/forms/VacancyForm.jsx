import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../config/api";
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

  const [previewImage, setPreviewImage] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vagaParaEditar) {
      setFormData({
        titulodavaga: vagaParaEditar.titulodavaga || "",
        descricao: vagaParaEditar.descricao || "",
        tipo_vaga: vagaParaEditar.tipo_vaga || "",
        vl_pontos: vagaParaEditar.vl_pontos || "",
        id_hospital: vagaParaEditar.id_hospital || "",
        status: vagaParaEditar.status || "ativa",
        qtd_vagas: vagaParaEditar.qtd_vagas || "",
        image: null,
      });

      // Usa a imagem existente como preview
      setPreviewImage(vagaParaEditar.imageUrl || null);
    }
  }, [vagaParaEditar]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id_admin = localStorage.getItem("userId");
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    data.append("id_admin", id_admin);

    const endpoint = vagaParaEditar
      ? `${API_BASE_URL}/vagas/vagas/${vagaParaEditar._id}`
      : `${API_BASE_URL}/vagas/vagas`;

    try {
      const response = await fetch(endpoint, {
        method: vagaParaEditar ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
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
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="editvg-image-preview"
                  />
                ) : (
                  <div className="editvg-placeholder">Imagem da vaga</div>
                )}
              </div>
              <label htmlFor="editvg-image-input" className="editvg-upload-button">
                Selecionar imagem
              </label>
              <input
                id="editvg-image-input"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                hidden
              />
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
                  <input name="tipo_vaga" value={formData.tipo_vaga} onChange={handleChange} required />
                </div>
                <div className="editvg-group half">
                  <label>Pontos</label>
                  <input type="number" name="vl_pontos" value={formData.vl_pontos} onChange={handleChange} required />
                </div>
              </div>
              <div className="editvg-row">
                <div className="editvg-group half">
                  <label>Hospital ID</label>
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
                  <option value="inativa">Inativa</option>
                </select>
              </div>
            </div>
          </div>

          <div className="editvg-actions">
            <button type="submit" className="editvg-btn primary" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Vaga"}
            </button>
            <button type="button" className="editvg-btn secondary" onClick={onClose}>
              Fechar
            </button>
          </div>
          {mensagem && <p className="editvg-message">{mensagem}</p>}
        </form>
      </div>
    </div>
  );
};

export default FormVaga;
