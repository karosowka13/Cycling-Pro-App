import Training from "../models/training";
import Athlete from "../models/athlete";
import mongoose, { Query } from "mongoose";

//TOTAL TSS, IF, distance, time, ascent, work
const query = {
	intensity_factor: 1,
	total_ascent: 1,
	total_calories: 1,
	totat_descent: 1,
	total_distance: 1,
	total_elapsed_time: 1,
	total_work: 1,
	training_stress_score: 1,
	_id: 0,
};
const query2 = {
	intensity_factor: 1,
	total_ascent: 1,
	total_calories: 1,
	totat_descent: 1,
	total_distance: 1,
	total_elapsed_time: 1,
	total_work: 1,
	training_stress_score: 1,
};

const numberOfDaysToLookBack = null;
const today = new Date();

export const getAllStatistics = async (req, res, next) => {
	try {
		const allStatistics = await Training.aggregate([
			{
				$match: {
					athlete_id: mongoose.Types.ObjectId(req.params.athleteid),
				},
			},
			{ $project: query },
			{
				$group: {
					_id: null,
					intensity_factor: { $sum: "$intensity_factor" },
					total_ascent: { $sum: "$total_ascent" },
					total_calories: { $sum: "$total_calories" },
					totat_descent: { $sum: "$totat_descent" },
					total_distance: { $sum: "$total_distance" },
					total_elapsed_time: { $sum: "$total_elapsed_time" },
					total_work: { $sum: "$total_work" },
					training_stress_score: { $sum: "$training_stress_score" },
				},
			},
		]);
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
