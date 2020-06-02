import express from "express";
import {
	getAllAthletes,
	getAthlete,
	createAthlete,
	updateAthlete,
	deleteAthlete,
} from "../controllers/athlete";
const router = express.Router();

router.post("/", createAthlete); //create athlete
router.get("/", getAllAthletes); //get all athletes
router.get("/:athleteid", getAthlete); //get one athlete
router.put("/:athleteid", updateAthlete); //edit athlete athlete
router.delete("/:athleteid", deleteAthlete); // delete athlete

export default router;
