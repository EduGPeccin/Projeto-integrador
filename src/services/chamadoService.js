const ChamadoModel = require("../models/chamadoModel");

class ChamadoService {
  // Lista todos os chamados
  static async getAllChamados() {
    return await ChamadoModel.findAll();
  }

  // Busca um chamado pelo ID
  static async getChamadoById(id) {
    return await ChamadoModel.findById(id);
  }

  // Cria um chamado buscando solicitante e categoria pelo nome
  static async createChamado(chamado) {
    const { solicitante, categoria } = chamado;

    const existingSolicitante =
      await ChamadoModel.findBySolicitante(solicitante);

    if (!existingSolicitante) {
      throw new Error("Solicitante não encontrado.");
    }

    const existingCategoria =
      await ChamadoModel.findByCategoria(categoria);

    if (!existingCategoria) {
      throw new Error("Categoria não encontrada.");
    }

    const novoChamado = {
      ...chamado,
      solicitante_id: existingSolicitante.id_solicitante,
      categoria_id: existingCategoria.id_categoria,
    };

    delete novoChamado.solicitante;
    delete novoChamado.categoria;

    return await ChamadoModel.create(novoChamado);
  }
}

module.exports = ChamadoService;