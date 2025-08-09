import { Router } from 'express';
const router = Router();
import { create, findAll, findOne, deleteRepresentante ,update} from '../controllers/respresentante.controller.js';

// Crear un nuevo representante
router.post('/', create);

// Obtener todos los representantes
router.get('/', findAll);

// Obtener un representante por ID
router.get('/:id', findOne);

// Actualizar un representante por ID
router.put('/:id', update);

// Eliminar un representante por ID
router.delete('/:id', deleteRepresentante);

export default router;