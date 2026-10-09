const ChamadoService = require('../services/chamadoService');
// Importa o serviço que contém a lógica de negócio para manipular chamados
class ChamadoController {
 // Método para listar todos os chamados
 static async getAll(req, res) {
 try {
 const chamados = await ChamadoService.getAllChamados(); // Chama o service para buscar chamados
 res.json(chamados); // Retorna a lista em formato JSON
 } catch (error) {
 res.status(500).json({ error: error.message }); // Em caso de erro, retorna status 500 (erro interno)
 }
 }
 // Método para criar um novo chamado
 static async create(req, res) {
 try {
 const id = await ChamadoService.createChamado(req.body); // Chama o service para criar chamado
 res.status(201).json({ message: 'Chamado criado com sucesso.', id }); // Retorna status 201 (criado) e o ID
 } catch (error) {
 res.status(400).json({ error: error.message }); // Em caso de erro de validação, retorna status 400
 }
 }
 // Método para atualizar um chamado existente
 static async update(req, res) {
 try {
 const id = req.params.id; // Pega o ID da URL
 await ChamadoService.updateChamado(id, req.body); // Chama o service para atualizar
 res.json({ message: 'Chamado atualizado com sucesso.' });
 } catch (error) {
    res.status(400).json({ error: error.message }); // Retorna erro se não encontrar ou problema nos dados
 }
 }
 // Método para deletar um chamado
 static async delete(req, res) {
 try {
 const id = req.params.id; // Pega o ID da URL
 await ChamadoService.deleteChamado(id); // Chama o service para deletar
 res.json({ message: 'Chamado deletado com sucesso.' });
 } catch (error) {
 res.status(400).json({ error: error.message }); // Retorna erro se chamado não encontrado
 }
 }
}
module.exports = ChamadoController;
// Exporta o Controller para ser usado nas rotas