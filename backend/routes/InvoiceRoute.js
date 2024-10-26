import express from "express";
import { invoice } from "../controllers/InvoiceController.js";

const router = express.Router();

router.get("/invoice/:order", invoice);

export default router;
