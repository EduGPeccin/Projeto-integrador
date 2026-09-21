const TecnicoModel = require("../models/tecnicoModel");
// Importa o Model responsável pelo acesso ao banco de dados (tabela técnicos)
const validateEmail = require("../utils/validateEmail");
// Importa a função utilitária que valida o formato de e-mail
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
 static async updateTecnico(id, tecnico) {
 const updatedRows = await TecnicoModel.update(id, tecnico);
 if (updatedRows === 0) {
    throw new Error("Técnico não encontrado."); // Caso nenhum técnico tenha sido atualizado
 }
 return updatedRows;
 }
 // Deleta um técnico pelo ID
 static async deleteTecnico(id) {
 const deletedRows = await TecnicoModel.delete(id);
 if (deletedRows === 0) {
 throw new Error("Técnico não encontrado."); // Caso nenhum técnico tenha sido deletado
 }
 return deletedRows;
 }
}
module.exports = TecnicoService;
// Exporta a classe para ser utilizada pelos controllers