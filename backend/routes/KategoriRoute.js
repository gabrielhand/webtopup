import express from "express";
import {
  getKategori,
  getKategoriPopuler,
  getKategoriByTipe,
  getKategoriForServices,
  getKategoriByKode,
  getKategoriForKategoriAdmin,
  addKategoriForKategoriAdmin,
  deleteKategoriForKategoriAdmin,
  updateStatusKategoriForAdmin,
  getKategoriByIdForAdmin,
  updateKategoriForAdmin,
} from "../controllers/KategoriController.js";

const router = express.Router();

router.get("/kategori", getKategori);
router.get("/kategori/:kode", getKategoriByKode);
router.get("/kategoripopuler", getKategoriPopuler);
router.get("/kategoribytipe", getKategoriByTipe);
router.get("/kategoriforservices", getKategoriForServices);
router.get("/kategoriforadmin", getKategoriForKategoriAdmin);
router.post("/kategoriforadmin", addKategoriForKategoriAdmin);
router.delete("/kategoriforadmin/delete/:id", deleteKategoriForKategoriAdmin);
router.patch("/kategoriforadmin/status/update/:id", updateStatusKategoriForAdmin);
router.get("/kategoriforadmin/get/:id", getKategoriByIdForAdmin);
router.patch("/kategoriforadmin/update/:id", updateKategoriForAdmin);

export default router;
