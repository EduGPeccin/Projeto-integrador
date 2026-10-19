const ChamadoModel = require("../models/chamadoModel");
// Importa o Model responsável pelo acesso ao banco de dados (tabela users)
const validateEmail = require("../utils/validateEmail");
// Importa a função utilitária que valida o formato de e-mail
class ChamadoService {
  // Busca todos os chamados cadastrados
  static async getAllChamados() {
    return await ChamadoModel.findAll();
  }
  // Busca um chamado específico pelo ID
  static async getChamadoById(id) {
    return await ChamadoModel.findById(id);
  }
  // Cria um novo chamado após validações
  static async createChamado(chamado) {
    const existingSolicitante = await ChamadoModel.findBySolicitante(chamado.solicitante);
    if (!existingSolicitante) {
      throw new Error("Solicitante não encontrado."); // Impede criação de chamado se o solicitante não existir
    }
    const existingCategoria = await ChamadoModel.findByCategoria(chamado.categoria);
    if (!existingCategoria) {
      throw new Error("Categoria não encontrada."); // Impede criação de chamado se a categoria não existir
    }
    return await ChamadoModel.create(chamado); // Cria o novo chamado
  }
}
module.exports = ChamadoService;
// Exporta a classe para ser utilizada pelos controllers
