const db = require('../config/database');
// Importa a conexão pool com o banco de dados
class CategoriaModel {
    // Busca todos os usuários
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM categorias');
        return rows;
    }
}
module.exports = CategoriaModel;
// Exporta a classe CategoriaModel para ser usada nos services