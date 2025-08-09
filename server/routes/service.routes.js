import { Router } from "express";
const router = Router();
import upload from '../config/multer.js';
import { createService, getAllServices, getServicesById, updateService, deleteService }
 from "../controllers/services.controller.js";

// Crear un nuevo servicio
router.post("/", upload.single('img'), createService);

// Obtener todos los servicios
router.get("/", getAllServices);

// Obtener un servicio por ID
router.get("/:id", getServicesById);

// Actualizar un servicio
router.put("/:id",upload.single('img'), updateService);

// Eliminar un servicio
router.delete("/:id", deleteService);

export default router;