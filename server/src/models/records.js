import mongoose, { Schema } from "mongoose";
const recordsSchema = new Schema({
	training_id: { type: Schema.Types.ObjectId, ref: "Training" },
	details: [
		{
			timestamp: String,
			elapsed_time: Number,
			timer_time: Number,
			position_lat: Number,
			position_long: Number,
			distance: Number,
			accumulated_power: Number,
			altitude: Number,
			speed: Number,
			power: Number,
			heart_rate: Number,
			cadence: Number,
			temperature: Number,
			power: Number,
		},
	],
});
module.exports = mongoose.model("Records", recordsSchema);
