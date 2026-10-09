const express = require('express');
// Importa o framework Express
const CategoriaController = require('../controllers/categoriaController');
// Importa o controller responsável por gerenciar as ações de usuário
const categoriaRoutes = express.Router();
// Cria uma nova instância de roteador do Express
// Define a rota para listar todos os usuários
categoriaRoutes.get('/', CategoriaController.getAll);
module.exports = categoriaRoutes;
// Exporta o roteador configurado para ser usado no app principal
