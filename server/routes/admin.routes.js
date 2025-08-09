// routes/empresaRoutes.js
import { Router } from 'express';
import upload from '../config/multer.js';
const router = Router();
import { eliminarProjects, updateProject,obtenerProjectsPorId,obtenerProjects, getProjectvyUserId, crearProjects } 
from '../controllers/Projects.caontroller.js';
router.get('/', obtenerProjects);
router.get('/:id', obtenerProjectsPorId);
router.get('/user/:id', getProjectvyUserId);
router.put('/:id', upload.single('logo'), updateProject);
router.delete('/:id', eliminarProjects);
router.post('/', upload.single('logo'), crearProjects);


//User Routes

export default router;