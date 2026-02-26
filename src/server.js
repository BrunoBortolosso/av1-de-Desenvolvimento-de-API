const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Banco de dados simulado em memória
let usuarios = [
  { id: 1, nome: 'Bruno Bortolosso', email: 'bruno@email.com' },
  { id: 2, nome: 'João Silva', email: 'joao@email.com' },
];

// ==================== ROTAS ====================

// GET /usuarios - Retorna todos os usuários
app.get('/usuarios', (req, res) => {
  res.status(200).json({
    sucesso: true,
    dados: usuarios,
  });
});

// GET /usuarios/:id - Retorna um usuário pelo ID
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado' });
  }

  res.status(200).json({ sucesso: true, dados: usuario });
});

// POST /usuarios - Cria um novo usuário
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ sucesso: false, mensagem: 'Nome e email são obrigatórios' });
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
  };

  usuarios.push(novoUsuario);

  res.status(201).json({
    sucesso: true,
    mensagem: 'Usuário criado com sucesso',
    dados: novoUsuario,
  });
});

// ==================== SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
