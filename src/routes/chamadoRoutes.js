const express = require('express');
// Importa o framework Express
const ChamadoController = require('../controllers/chamadoController');
// Importa o controller responsável por gerenciar as ações de chamado
const router = express.Router();
// Cria uma nova instância de roteador do Express
// Define a rota para listar todos os chamados
router.get('/', ChamadoController.getAll);
// Define a rota para listar um chamado específico pelo ID
router.get('/:id', ChamadoController.getById);
// Define a rota para criar um novo chamado
router.post('/', ChamadoController.create);
module.exports = router;
// Exporta o roteador configurado para ser usado no app principal
