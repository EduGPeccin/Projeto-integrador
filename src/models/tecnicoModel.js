const db = require('../config/database');
// Importa a conexão pool com o banco de dados
class TecnicoModel {
    // Busca todos os técnicos
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM tecnicos');
        return rows;
    }
}
module.exports = TecnicoModel;
// Exporta a classe TecnicoModel para ser usada nos services