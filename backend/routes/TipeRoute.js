import express from "express";
import { getTipe } from "../controllers/TipeController.js";

const router = express.Router();

router.get('/tipe', getTipe);

export default router;