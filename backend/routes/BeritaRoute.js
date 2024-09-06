import express from "express";
import { getSwiper } from "../controllers/BeritaController.js";

const router = express.Router();

router.get('/berita/swiper', getSwiper);

export default router;