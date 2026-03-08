import { Router } from "express";
import { createTask, getTask, getTaskById, updateTask, deleteTask} from "../controllers/taskContoller.js";
import protect from '../middleware/authMiddleware.js'

const router = Router();

router.post("/", protect, createTask);
router.get("/", protect, getTask);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;