
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

  // Atualiza um chamado existente pelo ID
  static async updateChamado(id, chamado) {
    const existingChamado = await ChamadoModel.findById(id);

    if (!existingChamado) {
      return null;
    }

    const { status, solucao, tecnico } = chamado;
    const dadosAtualizados = { ...chamado };

    // Busca o técnico pelo nome, caso informado
    if (tecnico) {
      const existingTecnico =
        await ChamadoModel.findByTecnico(tecnico);

      if (!existingTecnico) {
        throw new Error("Técnico não encontrado.");
      }

      dadosAtualizados.tecnico_id = existingTecnico.id_tecnico;
    }

    delete dadosAtualizados.tecnico;

    // Valida o técnico para atendimento
    if (
      status === "Em Atendimento" &&
      !(tecnico || existingChamado.tecnico)
    ) {
      throw new Error(
        "Um técnico deve ser atribuído quando o status é 'Em Atendimento'."
      );
    }

    // Valida a solução para conclusão
    if (
      status === "Concluído" &&
      !(solucao || existingChamado.solucao)
    ) {
      throw new Error(
        "Uma solução deve ser fornecida quando o status é 'Concluído'."
      );
    }

    return await ChamadoModel.update(id, dadosAtualizados);
  }

  // Exclui um chamado existente pelo ID
  static async deleteChamado(id) {
    const existingChamado = await ChamadoModel.findById(id);

    if (!existingChamado) {
      return null;
    }

    return await ChamadoModel.delete(id);
  }

  // Busca chamados por status
  static async getChamadosByStatus(status) {
    const validStatuses = [
      "Aberto",
      "Em_Atendimento",
      "Concluido",
    ];
    if (!validStatuses.includes(status)) {
      throw new Error("Status inválido.");
    }
    return await ChamadoModel.findByStatus(status);
  }

  // Busca chamados por prioridade
  static async getChamadosByPrioridade(prioridade) {
    const validPrioridades = [
      "Baixa",
      "Média",
      "Alta",
    ];
    if (!validPrioridades.includes(prioridade)) {
      throw new Error("Prioridade inválida.");
    }
    return await ChamadoModel.findByPrioridade(prioridade);
  }
}

module.exports = ChamadoService;
