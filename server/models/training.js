import mongoose, { Schema } from "mongoose";

const trainingSchema = new mongoose.Schema(
	{
		time_created: Date,
		name: String,
		sport: String,
		avg_cadence: Number,
		avg_heart_rate: Number,
		avg_power: Number,
		avg_speed: Number,
		intensity_factor: Number,
		max_cadence: Number,
		max_heart_rate: Number,
		max_power: Number,
		max_speed: Number,
		normalized_power: Number,
		total_ascent: Number,
		total_calories: Number,
		total_cycles: Number,
		total_descent: Number,
		total_distance: Number,
		total_elapsed_time: Number,
		total_timer_time: Number,
		total_work: Number,
		training_stress_score: Number,
		athlete_id: { type: Schema.Types.ObjectId, ref: "Athlete" },
	},
	{ timestamps: { created_at: "created_at", updated_at: "updated_at" } }
);
module.exports = mongoose.model("Training", trainingSchema);
