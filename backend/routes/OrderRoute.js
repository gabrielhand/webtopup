import express from "express";
import {
  konfirmasiOrder,
  simpanOrder,
} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/order/konfirmasi-data", konfirmasiOrder);
router.post("/order/simpan", simpanOrder);

export default router;
