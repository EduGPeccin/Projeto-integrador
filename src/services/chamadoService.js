const ChamadoModel = require("../models/chamadoModel");
// Importa o Model responsável pelo acesso ao banco de dados (tabela users)
const validateEmail = require("../utils/validateEmail");
// Importa a função utilitária que valida o formato de e-mail
class ChamadoService {
 // Busca todos os chamados cadastrados
 static async getAllChamados() {
 return await ChamadoModel.findAll();
 }
 // Cria um novo chamado após validações
 static async createChamado(chamado) {
 if (!validateEmail(chamado.email)) {
 throw new Error("Formato de email inválido."); // Valida o formato do e-mail
 }
 const existingChamado = await ChamadoModel.findByEmail(chamado.email);
 if (existingChamado) {
 throw new Error("Email já cadastrado."); // Impede cadastro de e-mails duplicados
 }
 return await ChamadoModel.create(chamado); // Cria o novo chamado
 }
 // Atualiza informações de um chamado existente
 static async updateChamado(id, chamado) {
 const updatedRows = await ChamadoModel.update(id, chamado);
 if (updatedRows === 0) {
    throw new Error("Chamado não encontrado."); // Caso nenhum chamado tenha sido atualizado
 }
 return updatedRows;
 }
 // Deleta um chamado pelo ID
 static async deleteChamado(id) {
 const deletedRows = await ChamadoModel.delete(id);
 if (deletedRows === 0) {
 throw new Error("Chamado não encontrado."); // Caso nenhum chamado tenha sido deletado
 }
 return deletedRows;
 }
}
module.exports = ChamadoService;
// Exporta a classe para ser utilizada pelos controllers