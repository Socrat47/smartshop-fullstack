import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.get("/username/:username", userController.getUserByUsername);
router.post("/create-user", userController.createUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);

export default router;
