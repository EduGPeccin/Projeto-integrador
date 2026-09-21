const express = require('express');
// Importa o framework Express
const TecnicoController = require('../controllers/tecnicoController');
// Importa o controller responsável por gerenciar as ações de técnico
const router = express.Router();
// Cria uma nova instância de roteador do Express
// Define a rota para listar todos os técnicos
router.get('/', TecnicoController.getAll);
// Define a rota para criar um novo técnico
router.post('/', TecnicoController.create);
// Define a rota para atualizar um técnico existente pelo ID
router.put('/:id', TecnicoController.update);
// Define a rota para deletar um técnico pelo ID
router.delete('/:id', TecnicoController.delete);
module.exports = router;
// Exporta o roteador configurado para ser usado no app principal
