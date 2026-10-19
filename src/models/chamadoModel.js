const db = require("../config/database");
// Importa a conexão pool com o banco de dados
class ChamadoModel {
  // Busca todos os chamados
  static async findAll() {
    const [rows] = await db.query(`
        SELECT
            chamados.id_chamado,
            chamados.titulo,
            chamados.descricao,
            chamados.prioridade,
            chamados.status,
            solicitantes.nome AS solicitante,
            solicitantes.setor,
            categorias.nome AS categoria,
            tecnicos.nome AS tecnico
        FROM chamados
        INNER JOIN solicitantes
            ON chamados.solicitante_id = solicitantes.id_solicitante
        INNER JOIN categorias
            ON chamados.categoria_id = categorias.id_categoria
        INNER JOIN tecnicos
            ON chamados.tecnico_id = tecnicos.id_tecnico
    `);

    return rows;
  }
  // Busca um chamado pelo ID
  static async findById(id) {
    const [rows] = await db.query(
      `SELECT
            chamados.id_chamado,
            chamados.titulo,
            chamados.descricao,
            chamados.prioridade,
            chamados.status,
            chamados.solucao,
            solicitantes.nome AS solicitante,
            solicitantes.setor,
            categorias.nome AS categoria,
            tecnicos.nome AS tecnico
        FROM chamados
        INNER JOIN solicitantes
            ON chamados.solicitante_id = solicitantes.id_solicitante
        INNER JOIN categorias
            ON chamados.categoria_id = categorias.id_categoria
        INNER JOIN tecnicos
            ON chamados.tecnico_id = tecnicos.id_tecnico
        WHERE chamados.id_chamado = ?`,
      [id],
    );

    return rows[0];
  }
  // Cria um novo chamado
  static async create(chamado) {
    const {
      titulo,
      descricao,
      prioridade,
      solicitante_id,
      categoria_id,
      tecnico_id,
    } = chamado;

    const [result] = await db.query(
      `INSERT INTO chamados (
            titulo,
            descricao,
            prioridade,
            status,
            solicitante_id,
            categoria_id,
            tecnico_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        descricao,
        prioridade,
        "Aberto",
        solicitante_id,
        categoria_id,
        tecnico_id,
      ],
    );

    return result.insertId;
  }
  // Busca um solicitante pelo nome
static async findBySolicitante(solicitanteName) {
    const [rows] = await db.query(
        "SELECT * FROM solicitantes WHERE nome = ?",
        [solicitanteName]
    );

    return rows[0];
}

// Busca uma categoria pelo nome
static async findByCategoria(categoriaName) {
    const [rows] = await db.query(
        "SELECT * FROM categorias WHERE nome = ?",
        [categoriaName]
    );

    return rows[0];
}
}
module.exports = ChamadoModel;
// Exporta a classe ChamadoModel para ser usada nos services
