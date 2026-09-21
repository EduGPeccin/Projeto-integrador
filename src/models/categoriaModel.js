const db = require('../config/database');
// Importa a conexão pool com o banco de dados
class CategoriaModel {
    // Busca todos os usuários
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM categorias');
        return rows;
    }
    // Busca um usuário pelo email
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM categorias WHERE email = ?', [email]);
        return rows[0];
    }
    //cria um novo usuário
    static async create(categoria) {
        const { name, email } = categoria;
        const [result] = await db.query('INSERT INTO categorias (name, email) VALUES (?,?)', [name, email]);
        return result.insertId; // Retorna o ID do usuário criado
    }
    // Atualiza um usuário existente
    static async update(id, categoria) {
        const { name, email } = categoria;
        const [result] = await db.query('UPDATE categorias SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
    // Deleta um usuário pelo ID
    static async delete(id) {
        const [result] = await db.query('DELETE FROM categorias WHERE id = ?', [id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
}
module.exports = CategoriaModel;
// Exporta a classe CategoriaModel para ser usada nos services