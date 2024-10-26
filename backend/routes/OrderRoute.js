import express from "express";
import { konfirmasiOrder } from "../controllers/OrderController.js";

const router = express.Router();

router.post("/order/konfirmasi-data", konfirmasiOrder);

export default router;
