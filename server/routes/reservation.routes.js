import { Router } from 'express';
const router = Router();
import {checkReservation, createReservation, getReservations , verificarHorario , deleteReservation} from '../controllers/reservation.controller.js'
router.post('/check', checkReservation);
// Crear un nuevo representante
router.post('/',createReservation);
router.post('/horario/', verificarHorario)

// Obtener un representante por ID
router.get('/:id', getReservations);
router.delete('/:id', deleteReservation);

export default router;
