const TecnicoModel = require("../models/tecnicoModel");
// Importa o Model responsável pelo acesso ao banco de dados (tabela técnicos)
class TecnicoService {
  // Busca todos os técnicos cadastrados
  static async getAllTecnicos() {
    return await TecnicoModel.findAll();
  }
  // Cria um novo técnico após validações
  static async createTecnico(tecnico) {
    if (!validateEmail(tecnico.email)) {
      throw new Error("Formato de email inválido."); // Valida o formato do e-mail
    }
    const existingTecnico = await TecnicoModel.findByEmail(tecnico.email);
    if (existingTecnico) {
      throw new Error("Email já cadastrado."); // Impede cadastro de e-mails duplicados
    }
    return await TecnicoModel.create(tecnico); // Cria o novo técnico
  }
  // Atualiza informações de um técnico existente
  static async updateTecnico(id_tecnico, tecnico) {
    const updatedRows = await TecnicoModel.update(id_tecnico, tecnico);
    if (updatedRows === 0) {
      throw new Error("Técnico não encontrado."); // Caso nenhum técnico tenha sido atualizado
    }
    return updatedRows;
  }
  // Deleta um técnico pelo ID
  static async deleteTecnico(id_tecnico) {
    const deletedRows = await TecnicoModel.delete(id_tecnico);
    if (deletedRows === 0) {
      throw new Error("Técnico não encontrado."); // Caso nenhum técnico tenha sido deletado
    }
    return deletedRows;
  }
}
module.exports = TecnicoService;
// Exporta a classe para ser utilizada pelos controllers
