const db = require('../config/database');
// Importa a conexão pool com o banco de dados
class SolicitanteModel {
    // Busca todos os solicitantes
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM solicitantes');
        return rows;
    }
    // Busca um solicitante pelo ID
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM solicitantes WHERE id = ?', [id]);
        return rows[0];
    }
    // Busca um solicitante pelo email
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM solicitantes WHERE email = ?', [email]);
        return rows[0];
    }
    //cria um novo solicitante
    static async create(solicitante) {
        const { nome, email, setor } = solicitante;
        const [result] = await db.query('INSERT INTO solicitantes (nome, email, setor) VALUES (?, ?, ?)', [nome, email, setor]);
        return result.insertId; // Retorna o ID do solicitante criado
    }
    // Atualiza um solicitante existente
    static async update(id, solicitante) {
        const { nome, email, setor } = solicitante;
        const [result] = await db.query('UPDATE solicitantes SET nome = ?, email = ?, setor = ? WHERE id = ?', [nome, email, setor, id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
    // Deleta um solicitante pelo ID
    static async delete(id) {
        const [result] = await db.query('DELETE FROM solicitantes WHERE id = ?', [id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
}
module.exports = SolicitanteModel;
// Exporta a classe SolicitanteModel para ser usada nos services