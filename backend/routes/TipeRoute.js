import express from "express";
import { addTipe, getTipe, updateTipe, getTipeById, deleteTipe } from "../controllers/TipeController.js";

const router = express.Router();

router.get("/tipe", getTipe);
router.post("/tipe/create", addTipe);
router.get("/tipe/get/:id", getTipeById);
router.patch("/tipe/update/:id", updateTipe);
router.delete("/tipe/delete/:id", deleteTipe);

export default router;
