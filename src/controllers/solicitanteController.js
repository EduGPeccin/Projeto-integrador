
const SolicitanteService = require("../services/solicitanteService");

class SolicitanteController {
  // Lista todos os solicitantes
  static async getAll(req, res) {
    try {
      const solicitantes =
        await SolicitanteService.getAllSolicitantes();

      res.json(solicitantes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Busca um solicitante pelo ID
  static async getById(req, res) {
    try {
      const id = req.params.id;
      const solicitante =
        await SolicitanteService.getSolicitanteById(id);

      if (!solicitante) {
        return res.status(404).json({
          error: "Solicitante não encontrado."
        });
      }

      res.json(solicitante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Cria um solicitante
  static async create(req, res) {
    try {
      const id =
        await SolicitanteService.createSolicitante(req.body);

      res.status(201).json({
        message: "Solicitante criado com sucesso.",
        id
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Atualiza um solicitante
  static async update(req, res) {
    try {
      const id = req.params.id;
      const atualizado =
        await SolicitanteService.updateSolicitante(id, req.body);

      if (!atualizado) {
        return res.status(404).json({
          error: "Solicitante não encontrado."
        });
      }

      res.json({
        message: "Solicitante atualizado com sucesso."
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Exclui um solicitante
  static async delete(req, res) {
    try {
      const id = req.params.id;
      const excluido =
        await SolicitanteService.deleteSolicitante(id);

      if (!excluido) {
        return res.status(404).json({
          error: "Solicitante não encontrado."
        });
      }

      res.json({
        message: "Solicitante excluído com sucesso."
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = SolicitanteController;
