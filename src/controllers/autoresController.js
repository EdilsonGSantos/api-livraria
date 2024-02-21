import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;

      next();
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - Falha ao listar autores.` });
    }
  };
  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);
      if (!autor) {
        next(new NaoEncontrado("ID do autor não encontrado."));
      } else {
        res.status(200).json(autor);
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      const novoAutor = await autores.create(req.body);
      res.status(201).json(novoAutor);
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorAtualizado = await autores.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!autorAtualizado) {
        next(new NaoEncontrado("ID do autor não encontrado."));
      } else {
        res.status(200).json({
          message: "Autor atualizado com sucesso",
          autor: autorAtualizado,
        });
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorExcluido = await autores.findByIdAndDelete(id);
      if (!autorExcluido) {
        next(new NaoEncontrado("ID do autor não encontrado."));
      } else {
        res.status(200).json({
          message: "Autor removido com sucesso",
          autor: autorExcluido,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;
