const db = require('../config/database');
// Importa a conexão pool com o banco de dados
class TecnicoModel {
    // Busca todos os técnicos
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM tecnicos');
        return rows;
    }
    // Busca um técnico pelo email
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM tecnicos WHERE email = ?', [email]);
        return rows[0];
    }
    //cria um novo técnico
    static async create(tecnico) {
        const { name, email } = tecnico;
        const [result] = await db.query('INSERT INTO tecnicos (name, email) VALUES (?,?)', [name, email]);
        return result.insertId; // Retorna o ID do técnico criado
    }
    // Atualiza um técnico existente
    static async update(id, tecnico) {
        const { name, email } = tecnico;
        const [result] = await db.query('UPDATE tecnicos SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
    // Deleta um técnico pelo ID
    static async delete(id) {
        const [result] = await db.query('DELETE FROM tecnicos WHERE id = ?', [id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
}
module.exports = TecnicoModel;
// Exporta a classe TecnicoModel para ser usada nos services