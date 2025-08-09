import Representante from "../models/representantes.model.js";
import Project from "../models/admin.model.js";
import db from '../db.js'
import { where } from "sequelize";
// Crear un nuevo representante
export const create = async (req, res) => {
  try {
    const { id_project, name, email, phone } = req.body;
    const representante = await Representante.create({ id_project, name, email, phone });
    res.status(201).json(representante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los representantes con su proyecto asociado
export const findAll = async (req, res) => {
  try {
    const representantes = await Representante.findAll({
      include: [{ model: Project, attributes: ['name'] }], // Incluir la relación con Project
    });
    res.status(200).json(representantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un representante por ID con su proyecto asociado
export const findOne = async (req, res) => {
  try {
    const representante = await Representante.findAll( {
      include :[{ model: Project, attributes: ['name'] }],
      where: { id_project: req.params.id} // Incluir la relación con Project
    });
    if (representante) {
      console.log(representante);
      
      res.status(200).json(representante);
      
    } else {
      res.status(404).json({ error: 'Representante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un representante por ID
export const update = async (req, res) => {
  try {
    const { id_project, name, email, phone } = req.body;
    const [updated] = await Representante.update(
      { id_project, name, email, phone },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedRepresentante = await Representante.findByPk(req.params.id);
      res.status(200).json(updatedRepresentante);
    } else {
      res.status(404).json({ error: 'Representante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un representante por ID
export const deleteRepresentante = async (req, res) => {
  try {
    const deleted = await Representante.destroy({ where: { Id_repre: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Representante eliminado' });
    } else {
      res.status(404).json({ error: 'Representante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};