import express from "express";
import { getTipe, getTipeForAdmin, addTipeForAdmin, getTipeByIdForAdmin, updateTipeForAdmin, deleteTipeForAdmin } from "../controllers/TipeController.js";
import { verifyAdminOnly, verifyUser } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/tipe", getTipe);
router.get("/tipeforadmin", verifyUser, verifyAdminOnly, getTipeForAdmin);
router.post("/tipeforadmin/create", verifyUser, verifyAdminOnly, addTipeForAdmin);
router.get("/tipeforadmin/get/:id", verifyUser, verifyAdminOnly, getTipeByIdForAdmin);
router.patch("/tipeforadmin/update/:id", verifyUser, verifyAdminOnly, updateTipeForAdmin);
router.delete("/tipeforadmin/delete/:id", verifyUser, verifyAdminOnly, deleteTipeForAdmin);

export default router;
