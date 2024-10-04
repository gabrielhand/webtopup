import express from "express";
import {
  addLayananForAdmin,
  deleteLayananForAdmin,
  getKategoriForLayananAdmin,
  getLayanan,
  getLayananByIdForAdmin,
  getLayananForAdmin,
  getPriceLayanan,
  getSubKategoriForLayananAdmin,
  updateLayananByIdForAdmin,
  updateStatusLayananForAdmin,
} from "../controllers/LayananController.js";

const router = express.Router();

router.get("/layanan", getLayanan);
router.post("/layanan/price", getPriceLayanan);
router.get("/layananforadmin", getLayananForAdmin);
router.get("/layananforadmin/kategori", getKategoriForLayananAdmin);
router.get("/layananforadmin/subkategori", getSubKategoriForLayananAdmin);
router.post("/layananforadmin/create", addLayananForAdmin);
router.patch("/layananforadmin/status/update/:id", updateStatusLayananForAdmin);
router.get("/layananforadmin/get/:id", getLayananByIdForAdmin);
router.patch("/layananforadmin/update/:id", updateLayananByIdForAdmin);
router.delete("/layananforadmin/delete/:id", deleteLayananForAdmin);

export default router;
