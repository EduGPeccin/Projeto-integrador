const CategoriaModel = require("../models/categoriaModel");
// Importa o Model responsável pelo acesso ao banco de dados (tabela categorias)
class CategoriaService {
  // Busca todos os usuários cadastrados
  static async getAllCategorias() {
    return await CategoriaModel.findAll();
  }
  // Cria um novo usuário após validações
  static async createCategoria(categoria) {
   const createCategoria = await CategoriaModel.create(categoria);
    return createCategoria;
  }
  // Atualiza informações de um usuário existente
  static async updateCategoria(id_categoria, categoria) {
    const updatedRows = await CategoriaModel.update(id_categoria, categoria);
    if (updatedRows === 0) {
      throw new Error("Categoria não encontrada."); // Caso nenhuma categoria tenha sido atualizada
    }
    return updatedRows;
  }
  // Deleta um usuário pelo ID
  static async deleteCategoria(id_categoria) {
    const deletedRows = await CategoriaModel.delete(id_categoria);
    if (deletedRows === 0) {
      throw new Error("Categoria não encontrada."); // Caso nenhuma categoria tenha sido deletada
    }
    return deletedRows;
  }
}
module.exports = CategoriaService;
// Exporta a classe para ser utilizada pelos controllers
