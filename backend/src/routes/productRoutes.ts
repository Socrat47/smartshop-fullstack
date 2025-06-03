import { Router } from "express";
const router = Router();
import * as productController from '../controllers/productController'

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct)
router.post("/create-product", productController.createProduct);
router.put("/update-product/:id", productController.updateProduct);
router.delete("/delete-product/:id", productController.deleteProduct);

export default router;