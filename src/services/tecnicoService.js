const TecnicoModel = require("../models/tecnicoModel");
// Importa o Model responsável pelo acesso ao banco de dados (tabela técnicos)
class TecnicoService {
 // Busca todos os técnicos cadastrados
 static async getAllTecnicos() {
 return await TecnicoModel.findAll();
 }
}
module.exports = TecnicoService;
// Exporta a classe para ser utilizada pelos controllers