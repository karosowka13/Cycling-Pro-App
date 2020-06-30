import express from "express";
import { uploadTraining, rawTrainingData } from "../controllers/upload.js";

const router = express.Router();

router.post("/", rawTrainingData, uploadTraining); //upload training, athlete, laps from fit file
router.delete("/"); // delete uploaded training

export default router;
