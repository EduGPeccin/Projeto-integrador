const SolicitanteModel = require("../models/solicitanteModel");
// Importa o Model responsável pelo acesso ao banco de dados (tabela solicitantes)
const validateEmail = require("../utils/validateEmail");
// Importa a função utilitária que valida o formato de e-mail
class SolicitanteService {
  // Busca todos os solicitantes cadastrados
  static async getAllSolicitantes() {
    return await SolicitanteModel.findAll();
  }
  // Busca um solicitante pelo ID
  static async getSolicitanteById(id_solicitante) {
    const solicitante = await SolicitanteModel.findById(id_solicitante);
    if (!solicitante) {
      throw new Error("Solicitante não encontrado."); // Caso o solicitante não exista
    }
    return solicitante;
  }
  // Cria um novo solicitante após validações
  static async createSolicitante(solicitante) {
    if (!validateEmail(solicitante.email)) {
      throw new Error("Formato de email inválido."); // Valida o formato do e-mail
    }
    const existingSolicitante = await SolicitanteModel.findByEmail(
      solicitante.email,
    );
    if (existingSolicitante) {
      throw new Error("Email já cadastrado."); // Impede cadastro de e-mails duplicados
    }
    return await SolicitanteModel.create(solicitante); // Cria o novo solicitante
  }
  // Atualiza informações de um solicitante existente
  static async updateSolicitante(id_solicitante, solicitante) {
    const updatedRows = await SolicitanteModel.update(id_solicitante, solicitante);
    if (updatedRows === 0) {
      throw new Error("Solicitante não encontrado."); // Caso nenhum solicitante tenha sido atualizado
    }
    return updatedRows;
  }
  // Deleta um solicitante pelo ID
  static async deleteSolicitante(id_solicitante) {
    const deletedRows = await SolicitanteModel.delete(id_solicitante);
    if (deletedRows === 0) {
      throw new Error("Solicitante não encontrado."); // Caso nenhum solicitante tenha sido deletado
    }
    return deletedRows;
  }
}
module.exports = SolicitanteService;
// Exporta a classe para ser utilizada pelos controllers
