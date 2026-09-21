const TecnicoService = require('../services/tecnicoService');
// Importa o serviço que contém a lógica de negócio para manipular técnicos
class TecnicoController {
 // Método para listar todos os técnicos
 static async getAll(req, res) {
 try {
 const tecnicos = await TecnicoService.getAllTecnicos(); // Chama o service para buscar técnicos
 res.json(tecnicos); // Retorna a lista em formato JSON
 } catch (error) {
 res.status(500).json({ error: error.message }); // Em caso de erro, retorna status 500 (erro interno)
 }
 }
 // Método para criar um novo técnico
 static async create(req, res) {
 try {
 const id = await TecnicoService.createTecnico(req.body); // Chama o service para criar técnico
 res.status(201).json({ message: 'Técnico criado com sucesso.', id }); // Retorna status 201 (criado) e o ID
 } catch (error) {
 res.status(400).json({ error: error.message }); // Em caso de erro de validação, retorna status 400
 }
 }
 // Método para atualizar um técnico existente
 static async update(req, res) {
 try {
 const id = req.params.id; // Pega o ID da URL
 await TecnicoService.updateTecnico(id, req.body); // Chama o service para atualizar
 res.json({ message: 'Técnico atualizado com sucesso.' });
 } catch (error) {
    res.status(400).json({ error: error.message }); // Retorna erro se não encontrar ou problema nos dados
 }
 }
 // Método para deletar um técnico
 static async delete(req, res) {
 try {
 const id = req.params.id; // Pega o ID da URL
 await TecnicoService.deleteTecnico(id); // Chama o service para deletar
 res.json({ message: 'Técnico deletado com sucesso.' });
 } catch (error) {
 res.status(400).json({ error: error.message }); // Retorna erro se técnico não encontrado
 }
 }
}
module.exports = TecnicoController;
// Exporta o Controller para ser usado nas rotas