import express from "express";
import { getKategori, getKategoriPopuler, getKategoriByTipe, getKategoriForServices, getKategoriByKode } from "../controllers/KategoriController.js";

const router = express.Router();

router.get('/kategori', getKategori);
router.get('/kategori/:kode', getKategoriByKode);
router.get('/kategoripopuler', getKategoriPopuler);
router.get('/kategoribytipe', getKategoriByTipe);
router.get('/kategoriforservices', getKategoriForServices);

export default router;