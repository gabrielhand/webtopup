import express from "express";
import {
  addBeritaForAdmin,
  deleteBeritaForAdmin,
  getBeritaForAdmin,
  getSwiper,
} from "../controllers/BeritaController.js";

const router = express.Router();

router.get("/berita/swiper", getSwiper);
router.get("/beritaforadmin", getBeritaForAdmin);
router.post("/beritaforadmin/create", addBeritaForAdmin);
router.delete("/beritaforadmin/delete/:id", deleteBeritaForAdmin);

export default router;
