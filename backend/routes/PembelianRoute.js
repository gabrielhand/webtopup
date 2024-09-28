import express from "express";
import {
  getPembelian,
  getPembelianForCekTransaksi,
  getPembelianForDashboardAdmin,
  getPembelianForSemuaPesananAdmin,
  updateStatusPembelianForSemuaPesananAdmin,
  getPembelianForPesananGiftSkinAdmin,
  updateStatusPembelianForPesananGiftSkinAdmin,
  deletePembelianForPesananGiftSkinAdmin,
  getPembelianForPesananDmVilogAdmin,
  deletePembelianForPesananDmVilogAdmin,
  updateStatusPembelianForPesananDmVilogAdmin
} from "../controllers/PembelianController.js";
import { verifyUser, verifyAdminOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/pembelian", getPembelian);
router.get("/pembelianforcektransaksi", getPembelianForCekTransaksi);
router.get("/pembelianfordashboardadmin", verifyUser, verifyAdminOnly, getPembelianForDashboardAdmin);
router.get("/pembelianforsemuapesananadmin", verifyUser, verifyAdminOnly, getPembelianForSemuaPesananAdmin);
router.patch("/pembelian/edit/status/:order_id", verifyUser, verifyAdminOnly, updateStatusPembelianForSemuaPesananAdmin);
router.get("/pembelian/giftskin", verifyUser, verifyAdminOnly, getPembelianForPesananGiftSkinAdmin);
router.patch("/pembelian/giftskin/edit/status/:order_id", verifyUser, verifyAdminOnly, updateStatusPembelianForPesananGiftSkinAdmin);
router.delete("/pembelian/giftskin/hapus/:id", verifyUser, verifyAdminOnly, deletePembelianForPesananGiftSkinAdmin);
router.get("/pembelian/dmvilog", verifyUser, verifyAdminOnly, getPembelianForPesananDmVilogAdmin);
router.patch("/pembelian/dmvilog/edit/status/:order_id", verifyUser, verifyAdminOnly, updateStatusPembelianForPesananDmVilogAdmin);
router.delete("/pembelian/dmvilog/hapus/:id", verifyUser, verifyAdminOnly, deletePembelianForPesananDmVilogAdmin);

export default router;
