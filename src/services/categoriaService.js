const CategoriaModel = require("../models/categoriaModel");
// Importa o Model responsável pelo acesso ao banco de dados (tabela categorias)
class CategoriaService {
  // Busca todos as categorias cadastradas
  static async getAllCategorias() {
    return await CategoriaModel.findAll();
  }

}
module.exports = CategoriaService;
// Exporta a classe para ser utilizada pelos controllers
