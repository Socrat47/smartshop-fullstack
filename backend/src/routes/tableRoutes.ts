import { Router } from "express";
const router = Router();
import * as tableController from "../controllers/tableController";

router.get("/", tableController.getTables);
router.get("/:id", tableController.getTable);
router.post("/create-table", tableController.createTable);
router.put("/update-table/:id", tableController.updateTable);
router.delete("/delete-table/:id", tableController.deleteTable);

export default router;