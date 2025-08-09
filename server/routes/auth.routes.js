import { Router } from "express";
import { login, register,logOut, recovery,restartPwd,verifyToken } from "../controllers/auth.controller.js";
import { validatorSchema } from "../middlewares/validator.middlewear.js";
import { loginSchema, registroSchema } from "../schemas/auth.schema.js";
const router = Router();

router.post("/register", validatorSchema(registroSchema) , register);
router.post("/login",validatorSchema(loginSchema) , login)
router.post("/recovery", recovery);
router.post("/restartPwd/:id", restartPwd);
router.post("/logout", logOut);
router.get("/verify", verifyToken)

export default router; 