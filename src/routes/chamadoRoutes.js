const express = require('express');
// Importa o framework Express
const ChamadoController = require('../controllers/chamadoController');
// Importa o controller responsável por gerenciar as ações de chamado
const router = express.Router();
// Cria uma nova instância de roteador do Express
// Define a rota para listar todos os chamados
router.get('/', ChamadoController.getAll);
// Define a rota para criar um novo chamado
router.post('/', ChamadoController.create);
// Define a rota para atualizar um chamado existente pelo ID
router.put('/:id', ChamadoController.update);
// Define a rota para deletar um chamado pelo ID
router.delete('/:id', ChamadoController.delete);
module.exports = router;
// Exporta o roteador configurado para ser usado no app principal
