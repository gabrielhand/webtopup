import express from "express";
import { getLayanan } from "../controllers/LayananController.js";

const router = express.Router();

router.get('/layanan', getLayanan);

export default router;