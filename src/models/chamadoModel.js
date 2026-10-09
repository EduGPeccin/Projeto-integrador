const db = require('../config/database');
// Importa a conexão pool com o banco de dados
class ChamadoModel {
    // Busca todos os chamados
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM chamados');
        return rows;
    }
    // Busca um chamado pelo email
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM chamados WHERE email = ?', [email]);
        return rows[0];
    }
    //cria um novo chamado
    static async create(chamado) {
        const { name, email } = chamado;
        const [result] = await db.query('INSERT INTO chamados (name, email) VALUES (?,?)', [name, email]);
        return result.insertId; // Retorna o ID do chamado criado
    }
    // Atualiza um chamado existente
    static async update(id, chamado) {
        const { name, email } = chamado;
        const [result] = await db.query('UPDATE chamados SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
    // Deleta um chamado pelo ID
    static async delete(id) {
        const [result] = await db.query('DELETE FROM chamados WHERE id = ?', [id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
}
module.exports = ChamadoModel;
// Exporta a classe ChamadoModel para ser usada nos services