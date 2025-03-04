import { Router } from "express";
import { register, login } from "../controllers/authController";
import { RegisterDto, LoginDto } from "../dto/auth.dto";
import { validationMiddleware } from "../middleware/validationMiddleware";

const router = Router();

router.post("/register", validationMiddleware(RegisterDto), register);
router.post("/login", validationMiddleware(LoginDto), login);

export default router;
