import express from "express";
import {
	getAllTrainings,
	getTraining,
	createTraining,
	deleteTraining,
	updateTraining,
	getTrainingsInRange,
} from "../controllers/training";
const router = express.Router();

router.post("/"); //creat training manually
router.get("/", getAllTrainings); //get all trainings
router.get("/:trainingid", getTraining); //get one training
router.get("/:from/:to", getTrainingsInRange); //get range trainings
router.put("/:trainingid", updateTraining); //edit training
router.delete("/:trainingid", deleteTraining); // delete training
export default router;
