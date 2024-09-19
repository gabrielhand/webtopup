import express from "express";
import { getVoucher } from "../controllers/VoucherController.js";

const router = express.Router();

router.get('/voucher', getVoucher);

export default router;