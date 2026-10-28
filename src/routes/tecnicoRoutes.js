const express = require('express');
// Importa o framework Express
const TecnicoController = require('../controllers/tecnicoController');
// Importa o controller responsável por gerenciar as ações de técnico
const router = express.Router();
// Cria uma nova instância de roteador do Express
// Define a rota para listar todos os técnicos
router.get('/', TecnicoController.getAll);
module.exports = router;
// Exporta o roteador configurado para ser usado no app principal
