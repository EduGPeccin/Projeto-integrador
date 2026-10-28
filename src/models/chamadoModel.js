
const db = require("../config/database");

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
      LEFT JOIN tecnicos
        ON chamados.tecnico_id = tecnicos.id_tecnico
    `);

    return rows;
  }

  // Busca um chamado pelo ID
  static async findById(id) {
    const [rows] = await db.query(
      `
      SELECT
        chamados.id_chamado,
        chamados.titulo,
        chamados.descricao,
        chamados.prioridade,
        chamados.status,
        chamados.solucao,
        chamados.solicitante_id,
        chamados.categoria_id,
        chamados.tecnico_id,
        solicitantes.nome AS solicitante,
        solicitantes.setor,
        categorias.nome AS categoria,
        tecnicos.nome AS tecnico
      FROM chamados
      INNER JOIN solicitantes
        ON chamados.solicitante_id = solicitantes.id_solicitante
      INNER JOIN categorias
        ON chamados.categoria_id = categorias.id_categoria
      LEFT JOIN tecnicos
        ON chamados.tecnico_id = tecnicos.id_tecnico
      WHERE chamados.id_chamado = ?
      `,
      [id]
    );

    return rows[0];
  }

  // Cria um chamado
  static async create(chamado) {
    const {
      titulo,
      descricao,
      prioridade,
      solicitante_id,
      categoria_id,
      tecnico_id
    } = chamado;

    const [result] = await db.query(
      `
      INSERT INTO chamados (
        titulo,
        descricao,
        prioridade,
        status,
        solicitante_id,
        categoria_id,
        tecnico_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        titulo,
        descricao,
        prioridade,
        "Aberto",
        solicitante_id,
        categoria_id,
        tecnico_id || null
      ]
    );

    return result.insertId;
  }

  // Busca solicitante pelo nome
  static async findBySolicitante(nome) {
    const [rows] = await db.query(
      "SELECT * FROM solicitantes WHERE nome = ?",
      [nome]
    );

    return rows[0];
  }

  // Busca categoria pelo nome
  static async findByCategoria(nome) {
    const [rows] = await db.query(
      "SELECT * FROM categorias WHERE nome = ?",
      [nome]
    );

    return rows[0];
  }

  // Busca técnico pelo nome
  static async findByTecnico(nome) {
    const [rows] = await db.query(
      "SELECT * FROM tecnicos WHERE nome = ?",
      [nome]
    );

    return rows[0];
  }

  // Atualiza um chamado
  static async update(id, chamado) {
    const camposPermitidos = [
      "titulo",
      "descricao",
      "prioridade",
      "status",
      "solucao",
      "tecnico_id"
    ];

    const campos = Object.keys(chamado).filter(
      (campo) => camposPermitidos.includes(campo)
    );

    if (campos.length === 0) {
      return false;
    }

    const valores = campos.map((campo) => chamado[campo]);

    const sql = `
      UPDATE chamados
      SET ${campos.map((campo) => `${campo} = ?`).join(", ")}
      WHERE id_chamado = ?
    `;

    const [result] = await db.query(sql, [...valores, id]);

    return result.affectedRows > 0;
  }

  // Exclui um chamado
  static async delete(id) {
    const [result] = await db.query(
      "DELETE FROM chamados WHERE id_chamado = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}

module.exports = ChamadoModel;
