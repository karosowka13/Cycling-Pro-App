import express from "express";
import {
	getAllAthletes,
	getAthlete,
	createNewAthlete,
	updateAthlete,
	deleteAthlete,
} from "../controllers/athlete";

const router = express.Router();

router.post("/", createNewAthlete); //create athlete
router.get("/", getAllAthletes); //get all athletes
router.get("/:athleteid", getAthlete); //get one athlete
router.put("/:athleteid", updateAthlete); //edit athlete athlete
router.delete("/:athleteid", deleteAthlete); // delete athlete

export default router;
