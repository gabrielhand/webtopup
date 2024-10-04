import express from "express";
import { getTipe, getTipeForAdmin, addTipeForAdmin, getTipeByIdForAdmin, updateTipeForAdmin, deleteTipeForAdmin } from "../controllers/TipeController.js";

const router = express.Router();

router.get("/tipe", getTipe);
router.get("/tipeforadmin", getTipeForAdmin);
router.post("/tipeforadmin/create", addTipeForAdmin);
router.get("/tipeforadmin/get/:id", getTipeByIdForAdmin);
router.patch("/tipeforadmin/update/:id", updateTipeForAdmin);
router.delete("/tipeforadmin/delete/:id", deleteTipeForAdmin);

export default router;
