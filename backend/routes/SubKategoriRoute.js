import express from "express";
import {
    addSubKategoriForSubKategoriAdmin,
  deleteSubKategoriForSubKategoriAdmin,
  getKategoriForSubKategoriAdmin,
  getSubKategori,
  getSubKategoriForSubKategoriAdmin,
} from "../controllers/SubKategoriController.js";

const router = express.Router();

router.get("/subkategori", getSubKategori);
router.get("/subkategoriforadmin", getSubKategoriForSubKategoriAdmin);
router.get("/subkategoriforadmin/kategori", getKategoriForSubKategoriAdmin);
router.post("/subkategoriforadmin/create", addSubKategoriForSubKategoriAdmin);
router.delete("/subkategoriforadmin/delete/:id", deleteSubKategoriForSubKategoriAdmin
);

export default router;
