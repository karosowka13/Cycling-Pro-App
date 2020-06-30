import express from "express";
import { getRecords } from "../controllers/training";
const router = express.Router();
router.get("/:trainingid", getRecords); //get records from training

export default router;
