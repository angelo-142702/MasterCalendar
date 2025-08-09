import { Router } from 'express';
const router = Router();
import { create, findAll, findOne, update, deleteSchedule } from '../controllers/schedule.controller.js';

// Rutas CRUD para horarios
router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/:id', deleteSchedule);

export default router;