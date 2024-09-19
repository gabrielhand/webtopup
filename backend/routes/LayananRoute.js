import express from "express";
import { getLayanan, getPriceLayanan } from "../controllers/LayananController.js";

const router = express.Router();

router.get('/layanan', getLayanan);
router.post('/layanan/price', getPriceLayanan);

export default router;