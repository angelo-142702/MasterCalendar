import User from '../models/user.model.js';
import jwt from "jsonwebtoken";
import { envio } from "../libs/resend.js";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

// generar Token 
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, TOKEN_SECRET, {
    expiresIn: "1h",
  });
};
// Crear un nuevo usuario
export const register = async (req, res) => {
  try {
    const { name, email, phone, password, rol } = req.body;
    const userfound = await User.findOne({ where: { email } });
    if (userfound) {
      console.log("email repetido");
      return res.status(400).json({message: "email ya en uso"});
      
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, phone, password: passwordHash, rol });
    const token = generateToken(newUser);
    res.status(201).json({ user: newUser, token });
    res.cookie("token", token);
    console.log("usuario Registrado");
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};;


// Obtener todos los usuarios
export const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Actualizar un usuario
export  const updateUser = async (req, res) => {
  try {
    const { name, email, phone, password, rol } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.name = name;
      user.email = email;
      user.phone = phone;
      user.rol = rol;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Usuario eliminado' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
     const userFound = await User.findByPk(user.id);
      if (!userFound) return res.sendStatus(401);
      return res.json({
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        phone: userFound.phone,
      });
    });
  };
export const logOut = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}
export const restartPwd = async(req, res ) => {
    let {password} = req.body;
    try {
        // Genera un hash para la nueva contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Encuentra al usuario y actualiza la contraseña
        
        await User.update( { password: hashedPassword }, { where: { id: req.params.id } });

        res.status(200).send('Contraseña actualizada exitosamente');
    } catch (error) {
        res.status(500).send('Error al actualizar la contraseña');
    }


} 
export const recovery = async (req, res) =>{
    const userFound = await findUserBy(req.body.email);
    if (!userFound){
        res.redirect('/login');
     return res.status(400).json({ message: "usuario no encontrado" })
    }    
    console.log(userFound);
    const { name, id } = userFound;
    envio(email,username,id)
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user);
    

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const isMacth = await bcrypt.compare(password, user.password);
    if (!isMacth) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = generateToken(user);
    res.status(200).json({ user, token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


