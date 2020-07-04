import mongoose, { Schema } from "mongoose";

const valueTimeSchema = {
	value: Number,
	time: Number,
};

const tssSchema = new mongoose.Schema({
	athlete_id: { type: String, ref: "Athlete" },
	day_assigned: Date,
	study: valueTimeSchema,
	exam: valueTimeSchema,
	race: valueTimeSchema,
	housework: valueTimeSchema,
	party: valueTimeSchema,
	journey: valueTimeSchema,
	shopping: valueTimeSchema,
	sickness: valueTimeSchema,
	workout: valueTimeSchema,
	concerns: valueTimeSchema,
	others: valueTimeSchema,
	comments: String,
});

module.exports = mongoose.model("TSS", tssSchema);
