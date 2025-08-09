// controllers/ProjectsController.js
import Projects from "../models/admin.model.js";
import User from "../models/user.model.js";
import Category from '../models/category.model.js'
import { __dirname } from "../config/multer.js";
import fs from 'fs'
import path from "path";
export const crearProjects = async (req, res) => {
  try {
    const { name, description, address, phone, id_user, id_category } = req.body;
    const logo = req.file ? req.file.path : null;
    if (!logo) {
      return res.status(400).json({ message: 'No se subió ningún archivo' });
  }

  // Obtener la ruta relativa de la imagen (sin la parte de 'uploads/')
  const relativeFilePath = req.file.path.replace(/^.*[\\\/]uploads[\\\/]/, 'uploads/');

    console.log(req.body);
    
    const nuevaProjects = await Projects.create({
      name,
      description,
      address,
      phone,
      id_user,
      id_category: id_category ? id_category: 1,
      logo:relativeFilePath,
    });

    res.status(201).json(nuevaProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getProjectvyUserId = async (req, res) => {
  try {
    ///acomoda esto est mal 
    const user = await Projects.findOne({ where: { id_user: req.params.id}});
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const obtenerProjects = async (req, res) => {
  try {
    console.log('holas');
    
    const Projectss = await Projects.findAll({include: [
      { model: User, attributes: ['name'] }, // Incluye el nombre del usuario
      { model: Category, attributes: ['name'] }  // Incluye el nombre del plan
  ]});
  const formattedProjects = Projectss.map(sub => ({
    id: sub.id,
    name: sub.name,
    description: sub.description,
    address: sub.address,
    phone: sub.phone,
    id_user: sub.User.name,  // Nombre del Usuario
    id_category: sub.Category.name,  // Nombre de la categoria
    logo: sub.logo
}));
    res.status(200).json(formattedProjects);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 


export const obtenerProjectsPorId = async (req, res) => {
  try {
    const Projects = await Projects.findByPk(req.params.id);
    if (Projects) {
      res.status(200).json(Projects);
    } else {
      res.status(404).json({ error: 'Projects no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, address, phone } = req.body;
    const newLogo = req.file;
    const Project = await Projects.findByPk(id);
    if (!Project) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    let relativeFilePath = newLogo ? req.file.path.replace(/^.*[\\\/]uploads[\\\/]/, 'uploads/') : null;
    
    // Eliminar la imagen anterior si existe
    if (newLogo && Project.logo) {
      const oldLogoPath = path.join(__dirname, '..', Project.logo);
      if (fs.existsSync(oldLogoPath)) {
        fs.unlinkSync(oldLogoPath);
      }
    } const updatedData = {
      name,
      description,
      address,
      phone,
      logo: newLogo ? relativeFilePath : Project.logo,
    };
    console.log(updatedData);

    await Projects.update(updatedData, { where: { id: id } });
   
    // Actualizar el registro
    res.status(200).json({ message: 'Registro actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};
/* export const updateProject = async (req, res) => {
  try {
    const { name, description, address, phone, id_user, id_category } = req.body;
    const logo = req.file ? req.file.path : null;

    const Projects = await Projects.findByPk(req.params.id);
    if (Projects) {
      Projects.name = name;
      Projects.description = description;
      Projects.address = address;
      Projects.phone = phone;
      Projects.id_user = id_user;
      Projects.id_category = id_category;
      if (logo) Projects.logo = logo;

      await Projects.save();
      res.status(200).json(Projects);
    } else {
      res.status(404).json({ error: 'Projects no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; */

export const eliminarProjects = async (req, res) => {
  try {
    const project = await Projects.findByPk(req.params.id);
    if (project) {
      const imagePath = project.logo ? path.join(__dirname, '..', project.logo) : null;
      // 4. Eliminar la imagen de la carpeta uploads (si existe)
      if (imagePath && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Elimina el archivo
        console.log(`Imagen eliminada: ${imagePath}`);
      }
      
      await project.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Projects no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

