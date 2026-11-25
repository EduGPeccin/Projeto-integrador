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
  
}
module.exports = CategoriaController;
// Exporta o Controller para ser usado nas rotas
