import express from "express";
import {
  addVoucherForAdmin,
  deleteVocuherForAdmin,
  getVoucher,
  getVoucherByIdForAdmin,
  getVoucherForAdmin,
  updateVoucherForAdmin,
} from "../controllers/VoucherController.js";

const router = express.Router();

router.get("/voucher", getVoucher);
router.get("/voucherforadmin", getVoucherForAdmin);
router.post("/voucherforadmin/create", addVoucherForAdmin);
router.get("/voucherforadmin/get/:id", getVoucherByIdForAdmin);
router.patch("/voucherforadmin/update/:id", updateVoucherForAdmin);
router.delete("/voucherforadmin/delete/:id", deleteVocuherForAdmin);

export default router;
