import express from "express";
import {
  addMethodForAdmin,
  deleteMethodForAdmin,
  getMethod,
  getMethodByIdForAdmin,
  getMethodForAdmin,
  updateMethodForAdmin,
} from "../controllers/MethodController.js";

const router = express.Router();

router.get("/method", getMethod);
router.get("/methodforadmin", getMethodForAdmin);
router.post("/methodforadmin/create", addMethodForAdmin);
router.get("/methodforadmin/get/:id", getMethodByIdForAdmin);
router.patch("/methodforadmin/update/:id", updateMethodForAdmin);
router.delete("/methodforadmin/delete/:id", deleteMethodForAdmin);

export default router;
