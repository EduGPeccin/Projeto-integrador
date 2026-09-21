const SolicitanteService = require('../services/solicitanteService');
// Importa o serviço que contém a lógica de negócio para manipular solicitantes
class SolicitanteController {
 // Método para listar todos os solicitantes
 static async getAll(req, res) {
 try {
 const solicitantes = await SolicitanteService.getAllSolicitantes(); // Chama o service para buscar solicitantes
 res.json(solicitantes); // Retorna a lista em formato JSON
 } catch (error) {
 res.status(500).json({ error: error.message }); // Em caso de erro, retorna status 500 (erro interno)
 }
 }
 // Método para criar um novo solicitante   
 static async create(req, res) {
 try {
 const id = await SolicitanteService.createSolicitante(req.body); // Chama o service para criar solicitante
 res.status(201).json({ message: 'Solicitante criado com sucesso.', id }); // Retorna status 201 (criado) e o ID
 } catch (error) {
 res.status(400).json({ error: error.message }); // Em caso de erro de validação, retorna status 400
 }
 }
 // Método para atualizar um solicitante existente
 static async update(req, res) {
 try {
 const id = req.params.id; // Pega o ID da URL
 await SolicitanteService.updateSolicitante(id, req.body); // Chama o service para atualizar
 res.json({ message: 'Solicitante atualizado com sucesso.' });
 } catch (error) {
    res.status(400).json({ error: error.message }); // Retorna erro se não encontrar ou problema nos dados
 }
 }
 // Método para deletar um solicitante
 static async delete(req, res) {
 try {
 const id = req.params.id; // Pega o ID da URL
 await SolicitanteService.deleteSolicitante(id); // Chama o service para deletar
 res.json({ message: 'Solicitante deletado com sucesso.' });
 } catch (error) {
 res.status(400).json({ error: error.message }); // Retorna erro se solicitante não encontrado
 }
 }
}
module.exports = SolicitanteController;
// Exporta o Controller para ser usado nas rotas