import express from 'express';
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Banco de dados simulado em memória
const tarefas = [
  { id: 1, titulo: 'Estudar Node', concluida: false },
  { id: 2, titulo: 'Fazer telas no Figma', concluida: true },
];

// ==================== ROTAS ====================

// GET /tarefas - Retorna todas as tarefas
app.get('/tarefas', (req, res) => {
  res.status(200).json(tarefas);
});

// POST /tarefas - Cria uma nova tarefa
app.post('/tarefas', (req, res) => {
  const { titulo } = req.body;

  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ erro: 'Título é obrigatório.' });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    concluida: false,
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

// ==================== SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

