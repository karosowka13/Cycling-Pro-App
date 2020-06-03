import express from "express";
import {
	getWeekStatistics,
	getMonthStatistics,
	getYearStatistics,
	getAllStatistics,
} from "../controllers/statistics";
const router = express.Router({ mergeParams: true });

router.get("/", getAllStatistics); //get all statistics
router.get("/week", getWeekStatistics); //get week statistics
router.get("/month", getMonthStatistics); //get month statistics
router.get("/year", getYearStatistics); //get year statistics

export default router;
