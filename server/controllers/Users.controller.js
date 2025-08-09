import User from "../models/user.model.js";
import Suscription from '../models/suscription.model.js'
import { Op } from "sequelize"; 
// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  console.log("holaa");
  
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// obetern ususario por coincidencias en el buscador
export const  searchUsers = async (req, res) =>  {
  const { search:searchTerm }  = req.params
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } }, // Busca coincidencias en el nombre
          { email: { [Op.like]: `%${searchTerm}%` } }, // Busca coincidencias en el email
          { phone: { [Op.like]: `%${searchTerm}%` } }, // Busca coincidencias en el teléfono
        ],
      },
    });
        return res.json(users);
  } catch (error) {
    console.error('Error buscando usuarios:', error);
    throw error;
  }
}
// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const newUser = await User.create({ name, email, phone, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

