import { Router } from 'express';
const router = Router();
import * as orderController from "../controllers/orderController";
import authMiddleware from '../middleware/auth';

router.get("/", orderController.getOrders);
router.post("/create-order", authMiddleware, orderController.createOrder);
router.put("/payment-order/:id", orderController.paymentOrder);

export default router;