import { Router } from 'express'
const router = Router();
import * as categoryController from '../controllers/categoryController';

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);
router.post("/create-category", categoryController.createCategory);
router.put("/update-category/:id", categoryController.updateCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);

export default router;