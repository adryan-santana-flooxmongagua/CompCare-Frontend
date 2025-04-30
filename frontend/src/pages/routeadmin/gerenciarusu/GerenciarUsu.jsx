import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import AdminSidebar from '../aside/AdminSidebar';
import './GerenciarUsuarios.css';

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'usuarios'));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsuarios(lista);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      try {
        await deleteDoc(doc(db, 'usuarios', id));
        setUsuarios((prev) => prev.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <div className="usuarios-container">
          <h2>Gerenciar Usuários Cadastrados</h2>
          {usuarios.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id}>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>{user.tipo}</td>
                    <td>
                      <button className="btn-delete" onClick={() => handleExcluir(user.id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default GerenciarUsuarios;
