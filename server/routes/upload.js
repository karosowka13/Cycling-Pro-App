import express from "express";
import { createTraining, rawTrainingData } from "../controllers/upload.js";

const router = express.Router();

router.post("/", rawTrainingData, createTraining); //upload training, athlete, laps from fit file
router.delete("/"); // delete uploaded training

export default router;
