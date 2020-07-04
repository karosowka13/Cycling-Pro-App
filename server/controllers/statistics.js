import Training from "../models/training";
import TSS from "../models/tss";
import Subscription from "../models/subscription";
import webPush from "web-push";

//webPush.setGCMAPIKey(process.env.GOOGLE_API_KEY);
webPush.setVapidDetails(
	"mailto:test@example.com",
	process.env.PUBLIC_VAPID_KEY,
	process.env.PRIVATE_VAPID_KEY
);

let pushIntervalID = null;

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

const queryValue = {
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
};
const queryTime = {
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
					day_assigned: { $gte: last30, $lte: new Date() },
				},
			},

			{ $project: { time: queryTime, value: queryValue } },
			{
				$group: {
					_id: null,
					totalTime: { $sum: "$time" },
					totalValue: { $sum: "$value" },
				},
			},
		]);

		const TSSWeek = await TSS.aggregate([
			{
				$match: {
					athlete_id: req.params.athleteid,
					day_assigned: { $gte: last7, $lte: new Date() },
				},
			},

			{ $project: { time: queryTime, value: queryValue } },
			{
				$group: {
					_id: null,
					totalTime: { $sum: "$time" },
					totalValue: { $sum: "$value" },
				},
			},
		]);
		let mentalTSSWeek = 0;
		let mentalTSSMonth = 0;
		if (TSSMonth.length > 0) {
			const timeM = TSSMonth[0].totalTime;
			const valueM = TSSMonth[0].totalValue;
			mentalTSSMonth = (timeM * valueM) / (1 * 3600 * 1000);
		}

		if (TSSWeek.length > 0) {
			const timeW = TSSWeek[0].totalTime;
			const valueW = TSSWeek[0].totalValue;
			mentalTSSWeek = (timeW * valueW) / (1 * 3600 * 1000);
		}

		let physicalTSSMonth = 0;
		let physicalTSSWeek = 0;
		if (Month.length > 0) {
			physicalTSSMonth = Month[0].training_stress_score;
		}
		if (Week.length > 0) {
			physicalTSSWeek = Week[0].training_stress_score;
		}

		const totalTSSMonth = mentalTSSMonth + physicalTSSMonth;
		const totalTSSWeek = mentalTSSWeek + physicalTSSWeek;

		const Statistics = {
			week: Week,
			month: Month,
			totalTSSWeek,
			totalTSSMonth,
		};
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};

export const createTSS = async (req, res, next) => {
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

export const check3Days = async (req, res, next) => {
	const subscription = req.body;
	let newSubscription = req.body;
	Object.assign(newSubscription, { athlete_id: req.params.athleteid });
	newSubscription = new Subscription(newSubscription);
	await newSubscription.save();
	res.status(201).json({ message: "success" });
	console.log(newSubscription);
	console.log("helo");
	return await new Promise((resolve) => {
		pushIntervalID = setInterval(() => {
			const payload = JSON.stringify({
				title: "Remember why you've started!",
				body: "You haven't trained recently.",
			});
			webPush
				.sendNotification(subscription, payload)
				.catch(() => clearInterval(pushIntervalID));
		}, 60000);
	});
};

export const checkTSS = async (req, res, next) => {
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
	let last3 = new Date(from.getTime() - 3 * 24 * 60 * 60 * 1000).setHours(
		0,
		0,
		0,
		0
	);
	last3 = new Date(last3);

	const athleteId = req.params.athlete_id;
	const subscription = req.body;
	let newSubscription = req.body;
	Object.assign(newSubscription, { athlete_id: athleteId });
	newSubscription = new Subscription(newSubscription);
	await newSubscription.save();
	res.status(201).json({ message: "success" });

	pushIntervalID = setInterval(async () => {
		const Week = await Training.aggregate([
			{
				$match: {
					athlete_id: athleteId,
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
					athlete_id: athleteId,
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
					athlete_id: athleteId,
					day_assigned: { $gte: last30, $lte: new Date() },
				},
			},

			{ $project: { time: queryTime, value: queryValue } },
			{
				$group: {
					_id: null,
					totalTime: { $sum: "$time" },
					totalValue: { $sum: "$value" },
				},
			},
		]);

		const TSSWeek = await TSS.aggregate([
			{
				$match: {
					athlete_id: athleteId,
					day_assigned: { $gte: last7, $lte: new Date() },
				},
			},

			{ $project: { time: queryTime, value: queryValue } },
			{
				$group: {
					_id: null,
					totalTime: { $sum: "$time" },
					totalValue: { $sum: "$value" },
				},
			},
		]);
		let mentalTSSWeek = 0;
		let mentalTSSMonth = 0;
		if (TSSMonth.length > 0) {
			const timeM = TSSMonth[0].totalTime;
			const valueM = TSSMonth[0].totalValue;
			mentalTSSMonth = (timeM * valueM) / (1 * 3600 * 1000);
		}

		if (TSSWeek.length > 0) {
			const timeW = TSSWeek[0].totalTime;
			const valueW = TSSWeek[0].totalValue;
			mentalTSSWeek = (timeW * valueW) / (1 * 3600 * 1000);
		}

		let physicalTSSMonth = 0;
		let physicalTSSWeek = 0;
		if (Month.length > 0) {
			physicalTSSMonth = Month[0].training_stress_score;
		}
		if (Week.length > 0) {
			physicalTSSWeek = Week[0].training_stress_score;
		}

		const totalTSSMonth = mentalTSSMonth + physicalTSSMonth;
		const totalTSSWeek = mentalTSSWeek + physicalTSSWeek;

		const lastTrainingUpload = await TSS.aggregate([
			{
				$match: {
					athlete_id: athleteId,
					day_assigned: { $gte: last3, $lte: new Date() },
				},
			},
		]);
		console.log(lastTrainingUpload, totalTSSMonth, totalTSSWeek);
		let payload = [];
		if (lastTrainingUpload.length <= 0) {
			payload.push(
				JSON.stringify({
					title:
						"Ride as much or as little, as long or as short as you feel. But ride!",
					body: "Last training was done 3 days ago",
				})
			);
		}
		if (totalTSSMonth > 4920) {
			payload.push(
				JSON.stringify({
					title: "Take a rest! You have been training too hard!",
					text: `${totalTSSMonth} TSS in last 30days`,
				})
			);
		}
		if (totalTSSWeek > 1230) {
			payload.push(
				JSON.stringify({
					title: "Take a rest! You have been training too hard in last 7 days!",
					body: `${totalTSSWeek} TSS in last 7days`,
				})
			);
		}
		if (
			totalTSSWeek <= 1230 &&
			totalTSSMonth <= 4920 &&
			lastTrainingUpload.length <= 0
		) {
			payload.push(
				JSON.stringify({
					title: "Keep training!",
				})
			);
		}

		webPush
			.sendNotification(subscription, payload)
			.catch(() => clearInterval(pushIntervalID));
	}, 60000);
	//86400000
	next();
};
