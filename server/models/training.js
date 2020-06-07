import mongoose, { Schema } from "mongoose";

const trainingSchema = new mongoose.Schema({
	time_created: Date,
	name: String,
	sport: String,
	avg_power: Number,
	avg_speed: Number,
	avg_heart_rate: Number,
	avg_cadence: Number,
	intensity_factor: Number,
	max_cadence: Number,
	max_heart_rate: Number,
	max_power: Number,
	max_speed: Number,
	normalized_power: Number,
	total_timer_time: Number,
	total_distance: Number,
	total_ascent: Number,
	total_work: Number,
	total_calories: Number,
	total_cycles: Number,
	total_descent: Number,

	total_elapsed_time: Number,

	training_stress_score: Number,
	athlete_id: { type: String, ref: "Athlete" },
});
module.exports = mongoose.model("Training", trainingSchema);
