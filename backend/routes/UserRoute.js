import express from "express";
import { getUsers, createUser, updateUser, updatePasswordUser, getPembelianByUser } from "../controllers/UserController.js";
import { verifyUser, verifyAdminOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/users", verifyUser, verifyAdminOnly ,getUsers);
router.post("/users", createUser);
router.patch("/users/edit/:id", updateUser);
router.patch("/users/password/edit", updatePasswordUser);
router.get("/users/pembelian", getPembelianByUser);

export default router;
