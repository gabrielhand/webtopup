import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  updatePasswordUser,
  getLimaPembelianByUser,
  getStatusAllPembelianByUser,
  getRiwayatPembelianByUser,
} from "../controllers/UserController.js";
import { verifyUser, verifyAdminOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/users", verifyUser, verifyAdminOnly, getUsers);
router.post("/users", createUser);
router.patch("/users/edit/:id", updateUser);
router.patch("/users/password/edit", updatePasswordUser);
router.get("/users/pembelian/lima/:username", getLimaPembelianByUser);
router.get("/users/pembelian/status/:username", getStatusAllPembelianByUser);
router.get("/users/pembelian/riwayat/:username", getRiwayatPembelianByUser);

export default router;
