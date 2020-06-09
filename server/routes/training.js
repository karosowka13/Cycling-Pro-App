import express from "express";
import {
	getAllTrainings,
	getTraining,
	createNewTraining,
	deleteTraining,
	updateTraining,
	getTrainingsInRange,
	getRecords,
} from "../controllers/training";
const router = express.Router({ mergeParams: true });

router.post("/", createNewTraining); //creat training manually
router.get("/", getAllTrainings); //get all trainings
router.get("/:trainingid", getTraining); //get one training
router.get("/:from/:to", getTrainingsInRange); //get range trainings
router.put("/:trainingid", updateTraining); //edit training
router.delete("/:trainingid", deleteTraining); // delete training

export default router;
