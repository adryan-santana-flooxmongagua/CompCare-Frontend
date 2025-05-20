const imagensPorTipo = {
  "cuidados com idosos": "/public/images/cuidados-com-idosos.png",
  "cuidados com jovens": "/public/images/cuidados-com-jovens.png",
  "comunicação": "/public/images/comunicacao.png",
  "administração": "/public/images/administracao.png",
  "educação": "/public/images/educacao.png",
  "limpeza": "/public/images/limpeza.png",
  "alimentação": "/public/images/alimentacao.png",
};

export const getImagemPorTipo = (tipo) => {
  if (!tipo) return null;
  const chave = tipo.trim().toLowerCase();
  return imagensPorTipo[chave] || null;
};
