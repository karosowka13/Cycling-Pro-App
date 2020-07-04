import express from "express";

import {
	getWeekStatistics,
	getMonthStatistics,
	getYearStatistics,
	getAllStatistics,
	getOnloadStatistics,
	createTSS,
	deleteTSS,
	getTSS,
} from "../controllers/statistics";
const router = express.Router({ mergeParams: true });

router.get("/", getAllStatistics); //get all statistics
router.get("/onload", getOnloadStatistics); //get onload statistics
router.get("/week", getWeekStatistics); //get week statistics
router.get("/month", getMonthStatistics); //get month statistics
router.get("/year", getYearStatistics); //get year statistics
router.put("/TSS", createTSS); //create/update TSS data
router.get("/TSS/:day", getTSS); //get TSS data
router.delete("/TSS/:id", deleteTSS); //delete TSS data

export default router;
