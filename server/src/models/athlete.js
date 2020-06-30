import mongoose from "mongoose";

const athleteSchema = new mongoose.Schema({
	weight: Number,
	gender: String,
	age: Number,
	height: Number,
	resting_heart_rate: Number,
	default_max_biking_heart_rate: Number,
	default_max_heart_rate: Number,
	functional_threshold_power: Number,
	max_heart_rate: Number,
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Athlete", athleteSchema);
