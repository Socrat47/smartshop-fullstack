import { Express, Router } from "express";
const router = Router();
import * as authController from '../controllers/authController';

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;