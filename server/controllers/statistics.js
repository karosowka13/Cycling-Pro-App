import Training from "../models/training";

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
const querySmall = {
	total_distance: 1,
	total_elapsed_time: 1,
	training_stress_score: 1,
	_id: 0,
};
const groupBySmall = {
	_id: null,
	total_distance: { $sum: "$total_distance" },
	total_elapsed_time: { $sum: "$total_elapsed_time" },
	training_stress_score: { $sum: "$training_stress_score" },
};
const groupBy = {
	_id: null,
	intensity_factor: { $sum: "$intensity_factor" },
	total_ascent: { $sum: "$total_ascent" },
	total_calories: { $sum: "$total_calories" },
	totat_descent: { $sum: "$totat_descent" },
	total_distance: { $sum: "$total_distance" },
	total_elapsed_time: { $sum: "$total_elapsed_time" },
	total_work: { $sum: "$total_work" },
	training_stress_score: { $sum: "$training_stress_score" },
};

export const getAllStatistics = async (req, res, next) => {
	try {
		const allStatistics = await Training.aggregate([
			{
				$match: {
					athlete_id: req.params.athleteid,
				},
			},
			{ $project: query },
			{
				$group: groupBy,
			},
		]);
		res.json(allStatistics);
	} catch (err) {
		next(err);
	}
};

export const getWeekStatistics = async (req, res, next) => {
	try {
		const Statistics = await Training.aggregate([
			{
				$match: {
					athlete_id: req.params.athleteid,
					time_created: {
						$gte: new Date(
							new Date({
								$subtract: [new Date().getTime(), 7 * 24 * 60 * 60 * 1000],
							}).setHours(0, 0, 0, 0)
						),
						$lte: new Date(),
					},
				},
			},
			{ $project: query },
			{
				$group: groupBy,
			},
		]);
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};

export const getMonthStatistics = async (req, res, next) => {
	let from = new Date();
	let last = new Date(from.getTime() - 30 * 24 * 60 * 60 * 1000);
	let last30 = new Date(last).setHours(0, 0, 0, 0);
	console.log(last30);
	try {
		const Statistics = await Training.aggregate([
			{
				$match: {
					athlete_id: req.params.athleteid,
					time_created: {
						$gte: last,
						$lte: new Date(),
					},
				},
			},
			{ $project: query },
			{
				$group: groupBy,
			},
		]);
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};

export const getYearStatistics = async (req, res, next) => {
	try {
		const Statistics = await Training.aggregate([
			{
				$match: {
					athlete_id: req.params.athleteid,
					time_created: {
						$gte: new Date(
							new Date({
								$subtract: [new Date().getTime(), 365 * 24 * 60 * 60 * 1000],
							}).setHours(0, 0, 0, 0)
						),
						$lte: new Date(),
					},
				},
			},
			{ $project: query },
			{
				$group: groupBy,
			},
		]);
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};

export const getOnloadStatistics = async (req, res, next) => {
	let from = new Date();
	let last30 = new Date(from.getTime() - 30 * 24 * 60 * 60 * 1000).setHours(
		0,
		0,
		0,
		0
	);
	last30 = new Date(last30);
	let last7 = new Date(from.getTime() - 7 * 24 * 60 * 60 * 1000).setHours(
		0,
		0,
		0,
		0
	);
	last7 = new Date(last7);

	try {
		const Week = await Training.aggregate([
			{
				$match: {
					athlete_id: req.params.athleteid,
					time_created: {
						$gte: last30,
						$lte: new Date(),
					},
				},
			},
			{ $project: querySmall },
			{
				$group: groupBySmall,
			},
		]);
		const Month = await Training.aggregate([
			{
				$match: {
					athlete_id: req.params.athleteid,
					time_created: {
						$gte: last30,
						$lte: new Date(),
					},
				},
			},
			{ $project: querySmall },
			{
				$group: groupBySmall,
			},
		]);
		const Statistics = { week: Week, month: Month };
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};
