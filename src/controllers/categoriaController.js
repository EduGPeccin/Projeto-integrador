const CategoriaService = require("../services/categoriaService");
// Importa o serviço que contém a lógica de negócio para manipular Categorias
class CategoriaController {
  // Método para listar todos os Categorias
  static async getAll(req, res) {
    try {
      const categorias = await CategoriaService.getAllCategorias(); // Chama o service para buscar Categorias
      res.json(categorias); // Retorna a lista em formato JSON
    } catch (error) {
      res.status(500).json({ error: error.message }); // Em caso de erro, retorna status 500 (erro interno)
    }
  }
  // Método para criar um novo Categoria
  static async create(req, res) {
    try {
      const id = await CategoriaService.createCategoria(req.body); // Chama o service para criar Categoria
      res.status(201).json({ message: "Categoria criada com sucesso.", id }); // Retorna status 201 (criado) e o ID
    } catch (error) {
      res.status(400).json({ error: error.message }); // Em caso de erro de validação, retorna status 400
    }
  }
  // Método para atualizar um Categoria existente
  static async update(req, res) {
    try {
      const id = req.params.id; // Pega o ID da URL
      await CategoriaService.updateCategoria(id, req.body); // Chama o service para atualizar
      res.json({ message: "Categoria atualizada com sucesso." });
    } catch (error) {
      res.status(400).json({ error: error.message }); // Retorna erro se não encontrar ou problema nos dados
    }
  }
  // Método para deletar um Categoria
  static async delete(req, res) {
    try {
      const id = req.params.id; // Pega o ID da URL
      await CategoriaService.deleteCategoria(id); // Chama o service para deletar
      res.json({ message: "Categoria deletada com sucesso." });
    } catch (error) {
      res.status(400).json({ error: error.message }); // Retorna erro se Categoria não encontrado
    }
  }
}
module.exports = CategoriaController;
// Exporta o Controller para ser usado nas rotas
