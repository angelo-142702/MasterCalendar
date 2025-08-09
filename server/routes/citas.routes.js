import { Router } from 'express';
import { crearCita, updateCita, getCita, deleteCita} from '../controllers/citas.controller.js';

const router = Router();

router.post('/', crearCita);
router.get('/:id', getCita);
router.put('/:id', updateCita);
router.delete('/:id', deleteCita);

export default router;