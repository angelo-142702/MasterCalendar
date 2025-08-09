// routes/empresaRoutes.js
import { Router } from 'express';
const router = Router();
import {getAllUsers, getUserById,createUser, updateUser, deleteUser, searchUsers,
} from '../controllers/Users.controller.js'

//User Routes
router.get('/', getAllUsers); // Obtener todos los usuarios
router.get('/:id', getUserById); // Obtener un usuario por ID
router.post('/', createUser); // Crear un nuevo usuario
router.put('/:id', updateUser); // Actualizar un usuario por ID
router.delete('/:id', deleteUser);
router.get('/search/:search',searchUsers)//bvuscar 

export default router