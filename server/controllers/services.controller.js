import { where } from "sequelize";
import Service from "../models/service.model.js";
import Project from "../models/admin.model.js";
import { __dirname } from "../config/multer.js";
import fs from 'fs'
import path from "path";
// Crear un nuevo servicio
export const createService = async (req, res) => {
  try {
    const { id_project, name, time, description, costo } = req.body;
    const imagen = req.file ? req.file.path : null;
    if (!imagen) {
      return res.status(400).json({ message: 'No se subió ningún archivo' });
  }

  // Obtener la ruta relativa de la imagen (sin la parte de 'uploads/')
  const relativeFilePath = req.file.path.replace(/^.*[\\\/]uploads[\\\/]/, 'uploads/');

    const newService = await Service.create({
      id_project,
      name,
      time,
      description,
      costo,
      img: relativeFilePath,
    });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el servicio", error });
  }
};

// Obtener todos los servicios
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({where: {}});
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los servicios", error });
  }
};

// Obtener un servicio por ID
export const getServicesById = async (req, res) => {
  try {
    const service = await Service.findAll( {
      include :[{ model: Project, attributes: ['name'] }],
      where: { id_project: req.params.id} // Incluir la relación con Project
    });
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Servicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el servicio", error });
  }
};

// Actualizar un servicio
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const newImg = req.file;
    console.log(newImg);
    
    const { id_project, name, time, description, costo } = req.body;
    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ message: 'Service no encontrado' });
    
    let relativeFilePath = newImg ? req.file.path.replace(/^.*[\\\/]uploads[\\\/]/, 'uploads/') : null;
    
    if (newImg && service.img) {
      const oldLogoPath = path.join(__dirname, '..', service.img);
      if (fs.existsSync(oldLogoPath)) {
        fs.unlinkSync(oldLogoPath);
      }
    }
    
    service.id_project = id_project;
    service.name = name;
    service.time = time;
    service.description = description;
    service.costo = costo;
    service.img = newImg ? relativeFilePath : service.img; // Corregido aquí
    
    await service.save();
    res.status(200).json(service);
    
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el servicio", error });
  }
};

// Eliminar un servicio
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (service) {
      await service.destroy();
      res.status(200).json({ message: "Servicio eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Servicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el servicio", error });
  }
};

