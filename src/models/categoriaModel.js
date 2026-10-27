const db = require("../config/database");
// Importa a conexão pool com o banco de dados
class CategoriaModel {
  // Busca todos as categorias no banco de dados
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM categorias");
    return rows;
  }
  //cria um novo categoria
  static async create(categoria) {
    const { nome, descricao } = categoria;
    const [result] = await db.query(
      "INSERT INTO categorias (nome, descricao) VALUES (?,?)",
      [nome, descricao],
    );
    return result.insertId; // Retorna o ID do categoria criado
  }
  // Atualiza um categoria existente
  static async update(id_categoria, categoria) {
    const { nome, descricao } = categoria;
    const [result] = await db.query(
      "UPDATE categorias SET nome = ?, descricao = ? WHERE id_categoria = ?",
      [nome, descricao, id_categoria],
    );
    return result.affectedRows; // Retorna o número de linhas afetadas
  }
  // Deleta um categoria pelo ID
  static async delete(id_categoria) {
    const [result] = await db.query("DELETE FROM categorias WHERE id_categoria = ?", [
      id_categoria,
    ]);
    return result.affectedRows; // Retorna o número de linhas afetadas
  }
}
module.exports = CategoriaModel;
// Exporta a classe CategoriaModel para ser usada nos services
