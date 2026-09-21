const CategoriaModel = require("../models/categoriaModel");
// Importa o Model responsável pelo acesso ao banco de dados (tabela categorias)
const validateEmail = require("../utils/validateEmail");
// Importa a função utilitária que valida o formato de e-mail
class CategoriaService {
 // Busca todos os usuários cadastrados
 static async getAllCategorias() {
 return await CategoriaModel.findAll();
 }
 // Cria um novo usuário após validações
 static async createCategoria(categoria) {
 if (!validateEmail(categoria.email)) {
 throw new Error("Formato de email inválido."); // Valida o formato do e-mail
 }
 const existingCategoria = await CategoriaModel.findByEmail(categoria.email);
 if (existingCategoria) {
 throw new Error("Email já cadastrado."); // Impede cadastro de e-mails duplicados
 }
 return await CategoriaModel.create(categoria); // Cria o novo usuário
 }
 // Atualiza informações de um usuário existente
 static async updateCategoria(id, categoria) {
 const updatedRows = await CategoriaModel.update(id, categoria);
 if (updatedRows === 0) {
    throw new Error("Usuário não encontrado."); // Caso nenhum usuário tenha sido atualizado
 }
 return updatedRows;
 }
 // Deleta um usuário pelo ID
 static async deleteCategoria(id) {
 const deletedRows = await CategoriaModel.delete(id);
 if (deletedRows === 0) {
 throw new Error("Usuário não encontrado."); // Caso nenhum usuário tenha sido deletado
 }
 return deletedRows;
 }
}
module.exports = CategoriaService;
// Exporta a classe para ser utilizada pelos controllers