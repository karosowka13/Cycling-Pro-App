import Training from "../models/training";
import TSS from "../models/tss";

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

const queryTSS = {
	study: 1,
	exam: 1,
	race: 1,
	housework: 1,
	party: 1,
	journey: 1,
	shopping: 1,
	sickness: 1,
	workout: 1,
	concerns: 1,
	others: 1,
	_id: 0,
};

const projectValue = {
	_id: null,
	value: {
		$sum: [
			"$study.value",
			"$exam.value",
			"$race.value",
			"$housework.value",
			"$party.value",
			"$journey.value",
			"$shopping.value",
			"$sickness.value",
			"$workout.value",
			"$concerns.value",
			"$others.value",
		],
	},
};
const projectTime = {
	_id: null,
	time: {
		$sum: [
			"$study.time",
			"$exam.time",
			"$race.time",
			"$housework.time",
			"$party.time",
			"$journey.time",
			"$shopping.time",
			"$sickness.time",
			"$workout.time",
			"$concerns.time",
			"$others.time",
		],
	},
};

const groupByValue = {
	_id: null,
	"study.value": { $sum: "$study.value" },
	"exam.value": { $sum: "$exam.value" },
	"race.value": { $sum: "$race.value" },
	"housework.value": { $sum: "$housework.value" },
	"party.value": { $sum: "$party.value" },
	"journey.value": { $sum: "$journey.value" },
	"shopping.value": { $sum: "$shopping.value" },
	"sickness.value": { $sum: "$sickness.value" },
	"workout.value": { $sum: "$workout.value" },
	"concerns.value": { $sum: "$concerns.value" },
	"others.value": { $sum: "$others.value" },
};
const groupByTime = {
	_id: null,
	"study.time": { $sum: "$study.time" },
	"exam.time": { $sum: "$exam.time" },
	"race.time": { $sum: "$race.time" },
	"housework.time": { $sum: "$housework.time" },
	"party.time": { $sum: "$party.time" },
	"journey.time": { $sum: "$journey.time" },
	"shopping.time": { $sum: "$shopping.time" },
	"sickness.time": { $sum: "$sickness.time" },
	"workout.time": { $sum: "$workout.time" },
	"concerns.time": { $sum: "$concerns.time" },
	"others.time": { $sum: "$others.time" },
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
						$gte: last7,
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

		const TSSMonth = await TSS.aggregate([
			{
				$match: {
					athlete_id: req.params.athleteid,
					day_assigned: { $gte: last7, $lte: new Date() },
				},
			},
			{ $project: queryTSS },
			{
				$group: { groupByTime, groupByValue },
			},
			{ $project: projectValue, projectTime },
		]);
		console.log(TSSMonth);

		const Statistics = { week: Week, month: Month };
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};

export const createTSS = async (req, res, next) => {
	console.log(req.body, typeof new Date(req.body.day_assigned));
	try {
		const tss = await TSS.updateOne(
			{
				day_assigned: req.body.day_assigned,
				athlete_id: req.params.athleteid,
			},
			req.body,
			{
				upsert: true,
				setDefaultsOnInsert: true,
			}
		);
		res.json(tss);
	} catch (err) {
		next(err);
	}
};

export const getTSS = async (req, res, next) => {
	let day = new Date(req.params.day);
	let toDay = new Date(day.getTime() + 100800000);
	try {
		const tss = await TSS.find({
			athlete_id: req.params.athleteid,
			day_assigned: { $gte: day, $lte: toDay },
		}).sort({ time_created: 1 }); //the newest first
		res.json(tss);
	} catch (err) {
		next(err);
	}
};

export const deleteTSS = async (req, res, next) => {
	try {
		const tss = await TSS.findById(req.params.id);
		if (tss) {
			await tss.remove();
		}
		res.json(tss);
	} catch (err) {
		next(err);
	}
};
