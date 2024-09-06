import express from "express";
import { getPembelian, getPembelianForCekTransaksi } from "../controllers/PembelianController.js";

const router = express.Router();

router.get('/pembelian', getPembelian);
router.get('/pembelianforcektransaksi', getPembelianForCekTransaksi);

export default router;