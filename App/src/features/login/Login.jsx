import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples do formulário
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos!');
      return;
    }

    //adicionar a lógica para autenticar com Firebase ou API
    // Exemplo de chamada fictícia:
    loginUser(email, senha);
  };

  const loginUser = (email, senha) => {
    //integrar com o seu backend ou Firebase
    console.log('Autenticando usuário:', email);

    // Simulação de sucesso de login
    if (email === 'test@example.com' && senha === 'senha123') {
      console.log('Login bem-sucedido!');
      setErro(''); // Limpa a mensagem de erro
    } else {
      setErro('Credenciais inválidas');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Digite seu email" 
          />
        </div>
        
        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            placeholder="Digite sua senha" 
          />
        </div>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
