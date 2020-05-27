import express from "express";
import { rawTrainingData } from "../controllers/traningDataController";
import { createTraining } from "../controllers/trainingLog";

const router = express.Router();

router.post("/upload", rawTrainingData, createTraining);

export default router;
