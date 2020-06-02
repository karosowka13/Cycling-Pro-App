import Training from "../models/training";
import Athlete from "../models/athlete";
import Statistics from "../models/statistics";
import Records from "../models/records";

export const getAllTrainings = async (req, res, next) => {
	try {
		const allTrainings = await Training.find({
			athlete_id: req.params.athleteid,
		});
		res.json(allTrainings);
	} catch (err) {
		next(err);
	}
};

export const createTraining = async (req, res, next) => {
	try {
		const training = await Training.create(
			{ athlete_id: req.params.athleteid },
			req.body
		);
		res.json(training);
	} catch (err) {
		next(err);
	}
};

export const updateTraining = async (req, res, next) => {
	try {
		const training = await Training.findByIdAndUpdate(req.params.trainingid);
		res.json(training);
	} catch (err) {
		next(err);
	}
};

export const getTraining = async (req, res, next) => {
	try {
		const training = await Training.findById(req.params.trainingid);
		res.json(training);
	} catch (err) {
		next(err);
	}
};

export const getTrainingsInRange = async (req, res, next) => {
	try {
		const trainingsRange = await Training.find({
			athlete_id: req.params.athleteid,
			time_created: { $gte: req.params.from, $lte: req.params.to },
		}).sort({ time_created: 1 }); //the newest first
		res.json(trainingsRange);
	} catch (err) {
		next(err);
	}
};

export const deleteTraining = async (req, res, next) => {
	try {
		const training = await Training.find(req.params.trainingid);
		if (training) {
			await training.remove();
		}
		res.json(Training);
	} catch (err) {
		next(err);
	}
};
