// routes/formRoutes.js
import express from "express";
import { submitForm, getAllForms } from "../controllers/formController.js";
import upload from "../middleware/multer.js";


const router = express.Router();

router.post("/submit", upload.single("resume"), submitForm);
router.get("/all", adminProtect, getAllForms);

export default router;