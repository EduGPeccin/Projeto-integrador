const express = require('express');
// Importa o framework Express
const SolicitanteController = require('../controllers/solicitanteController');
// Importa o controller responsável por gerenciar as ações de solicitante
const router = express.Router();
// Cria uma nova instância de roteador do Express
// Define a rota para listar todos os solicitantes
router.get('/', SolicitanteController.getAll);
// Define a rota para criar um novo solicitante
router.post('/', SolicitanteController.create);
// Define a rota para atualizar um solicitante existente pelo ID
router.put('/:id', SolicitanteController.update);
// Define a rota para deletar um solicitante pelo ID
router.delete('/:id', SolicitanteController.delete);
module.exports = router;
// Exporta o roteador configurado para ser usado no app principal
