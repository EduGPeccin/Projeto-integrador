const CategoriaModel = require("../models/categoriaModel");
// Importa o Model responsável pelo acesso ao banco de dados (tabela categorias)
class CategoriaService {
 // Busca todos os usuários cadastrados
 static async getAllCategorias() {
 return await CategoriaModel.findAll();
 }
}
module.exports = CategoriaService;
// Exporta a classe para ser utilizada pelos controllers