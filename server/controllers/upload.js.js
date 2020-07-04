import { errorMessage, successMessage, status } from "../helpers/status";
import Training from "../models/training";
import Athlete from "../models/athlete";
import Records from "../models/records";
import {
	createAthlete,
	createRecords,
	createTraining,
} from "../helpers/createDoc";
import multer from "multer";
import { fileFilter } from "../helpers/validation";
import mongoose from "mongoose";
const FitParser = require("../node_modules/fit-file-parser/dist/fit-parser")
	.default;

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
}).single("file");

const multiUpload = multer({
	storage: storage,
	fileFilter: fileFilter,
}).array("files", 8);

const fitParser = new FitParser({
	force: true,
	speedUnit: "km/h",
	lengthUnit: "km",
	temperatureUnit: "celsius",
	elapsedRecordField: true,
	mode: "both",
});

export const multipleRawTrainingData = (req, res, next) => {
	let lastTraining = null;
	console.log(req.files);
	multiUpload(req, res, (err) => {
		if (req.fileValidationError) {
			return res.end(res.writeHead(415, req.fileValidationError));
		} else if (!req.files) {
			return res.end(res.writeHead(404, "Please select a file to upload"));
		} else if (err instanceof multer.MulterError) {
			console.log("This is the invalid field ->", err.field);
			return res.status(500).json(err);
			// A Multer error occurred when uploading.
		} else if (err) {
			return res.status(500).json(err);
			// An unknown error occurred when uploading.
		}

		const files = req.files;
		let index, len;

		for (index = 0, len = files.length; index < len; ++index) {
			let encodedData = null;
			fitParser.parse(files[index].buffer, (err, data) => {
				// Handle result of parse method
				if (err) {
					console.log(err);
				}
				encodedData = data;
			});

			lastTraining = uploadTrainings(encodedData, req.headers.user, res);
		}
		res.json(lastTraining);
	});
};

export const rawTrainingData = (req, res, next) => {
	upload(req, res, (err) => {
		if (req.fileValidationError) {
			return res.end(res.writeHead(415, req.fileValidationError));
		} else if (!req.file) {
			return res.end(res.writeHead(404, "Please select a file to upload"));
		} else if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
			// A Multer error occurred when uploading.
		} else if (err) {
			return res.status(500).json(err);
			// An unknown error occurred when uploading.
		}
		let encodedData = null;
		fitParser.parse(req.file.buffer, (err, data) => {
			// Handle result of parse method
			if (err) {
				console.log(err);
			}
			encodedData = data;
		});
		res.locals.data = encodedData;
		next();
	});
	res.locals.athleteId = req.headers.user;
};

export const uploadTraining = async (req, res) => {
	let allData = res.locals.data;
	let athleteId = res.locals.athleteId;
	let allDataForTraining = {};
	Object.assign(
		allDataForTraining,
		allData.file_id,
		allData.sport,
		allData.sessions[0]
	);
	let allDataForAthlete = {};
	Object.assign(allDataForAthlete, allData.user_profile, allData.zones_target);

	const athlete = createAthlete(allDataForAthlete, athleteId);
	const training = createTraining(allDataForTraining, athleteId);
	const allRecords = createRecords(allData);
	try {
		let queryAthlete = { $set: athlete };
		let options = {
			useFindAndModify: false,
			upsert: true,
			new: true,
			setDefaultsOnInsert: true,
		};
		await Athlete.findByIdAndUpdate(athleteId, queryAthlete, options);
		const newTraining = await training.save();

		const record = new Records({ training_id: newTraining._id });

		const newRecord = await record.save();
		await Records.updateOne(
			{ training_id: newTraining._id },
			{ $push: { details: { $each: allRecords, $sort: -1 } } }
		);

		res.json(newTraining);
	} catch (err) {
		res.status(400).send(err);
	}
};

const uploadTrainings = async (oneFile, athleteID, res) => {
	let allData = oneFile;
	let athleteId = athleteID;
	let allDataForTraining = {};
	console.log(allData);
	Object.assign(
		allDataForTraining,
		allData.file_id,
		allData.sport,
		allData.sessions[0]
	);
	let allDataForAthlete = {};
	Object.assign(allDataForAthlete, allData.user_profile, allData.zones_target);

	const athlete = createAthlete(allDataForAthlete, athleteId);
	const training = createTraining(allDataForTraining, athleteId);
	const allRecords = createRecords(allData);
	try {
		let queryAthlete = { $set: athlete };
		await Athlete.save(athleteId, queryAthlete, options);
		const newTraining = await training.save();

		const record = new Records({ training_id: newTraining._id });

		const newRecord = await record.save();
		await Records.updateOne(
			{ training_id: newTraining._id },
			{ $push: { details: { $each: allRecords, $sort: -1 } } }
		);
		return newTraining;
	} catch (err) {
		res.status(400).send(err);
	}
};
