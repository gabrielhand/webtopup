import express from "express";
import {
  getKategoriForLayananAdmin,
  getLayanan,
  getLayananForAdmin,
  getPriceLayanan,
  getSubKategoriForLayananAdmin,
} from "../controllers/LayananController.js";

const router = express.Router();

router.get("/layanan", getLayanan);
router.post("/layanan/price", getPriceLayanan);
router.get("/layananforadmin", getLayananForAdmin);
router.get("/layananforadmin/kategori", getKategoriForLayananAdmin);
router.get("/layananforadmin/subkategori", getSubKategoriForLayananAdmin);

export default router;
