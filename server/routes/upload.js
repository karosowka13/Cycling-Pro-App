import express from "express";
import {
	uploadTraining,
	rawTrainingData,
	multipleRawTrainingData,
} from "../controllers/upload.js";

const router = express.Router();

router.post("/", rawTrainingData, uploadTraining); //upload training, athlete, laps from fit file
router.post("/multi", multipleRawTrainingData);
router.delete("/"); // delete uploaded training

export default router;
