import express from "express";
import { getRating, getRatingByKategori } from "../controllers/RatingController.js";

const router = express.Router();

router.get("/rating", getRating);
router.get("/rating/kategori/:kode", getRatingByKategori);

export default router;
