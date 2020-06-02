import mongoose, { Schema } from "mongoose";
export const statisticsSchema = new Schema({
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
});

module.exports = mongoose.model("Statistics", statisticsSchema);
