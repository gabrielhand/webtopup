import express from "express";
import { getSubKategori } from "../controllers/SubKategoriController.js";

const router = express.Router();

router.get('/subkategori', getSubKategori);

export default router;