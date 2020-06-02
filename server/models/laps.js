import mongoose, { Schema } from "mongoose";

const lapsSchema = new mongoose.Schema({
  avg_cadence: Number,
  avg_heart_rate: Number,
  avg_power: Number,
  avg_speed: Number,
  end_position_lat: Number,
  end_position_long: Number,
  max_cadence: Number,
  max_heart_rate: Number,
  max_power: Number,
  max_speed: Number,
  normalized_power: Number,
  start_time: Date,
  total_ascent: Number,
  total_calories: Number,
  total_descent: Number,
  total_distance: Number,
  total_elapsed_time: Number,
  total_timer_time: Number,
  total_work: Number,
  training_id: { type: Schema.Types.ObjectId, ref: "Training" },
  records: [{ type: Schema.Types.ObjectId, ref: "Records" }],
});

module.exports = mongoose.model("Laps", lapsSchema);
