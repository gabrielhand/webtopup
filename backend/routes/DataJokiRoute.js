import express from "express";
import {
  updateStatusJoki,
  deleteDataJoki,
  getDataJokiForPesananJokiAdmin,
} from "../controllers/DataJokiController.js";
import { verifyUser, verifyAdminOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/datajokiforpesananjokiadmin", verifyUser ,verifyAdminOnly , getDataJokiForPesananJokiAdmin);
router.delete("/datajoki/hapus/:id", verifyUser, verifyAdminOnly, deleteDataJoki);
router.patch("/datajoki/edit/status/:order_id", verifyUser, verifyAdminOnly, updateStatusJoki);

export default router;
