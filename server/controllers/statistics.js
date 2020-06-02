import Training from "../models/training";
import Athlete from "../models/athlete";
import Statistics from "../models/statistics";
import Records from "../models/records";

//TOTAL TSS, IF, distance, time, ascent, work
const query = {
	intensity_factor,
	total_ascent,
	total_calories,
	totat_descent,
	total_distance,
	total_elapsed_time,
	total_work,
	training_stress_score,
};
const numberOfDaysToLookBack = null;
const today = new Date(year, month, day);

export const getAllStatistics = async (req, res, next) => {
	try {
		const allStatistics = await Training.find({
			athlete_id: req.params.athleteid,
		})
			.select(query)
			.count(query);
		res.json(allStatistics);
	} catch (err) {
		next(err);
	}
};

export const getWeekStatistics = async (req, res, next) => {
	try {
		const Statistics = await Training.find({
			athlete_id: req.params.athleteid,
			time_created: {
				$gte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
				$lte: new Date(),
			},
		}).sort({ time_created: 1 }); //the newest first
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};

export const getMonthStatistics = async (req, res, next) => {
	try {
		const Statistics = await Training.find({
			athlete_id: req.params.athleteid,
			time_created: {
				$gte: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
				$lte: new Date(),
			},
		})
			.select(query)
			.count(query); //the newest first
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};

export const getYearStatistics = async (req, res, next) => {
	try {
		const Statistics = await Training.find({
			athlete_id: req.params.athleteid,
			time_created: {
				$gte: new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000),
				$lte: new Date(),
			},
		})
			.select(query)
			.count(query);
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};
