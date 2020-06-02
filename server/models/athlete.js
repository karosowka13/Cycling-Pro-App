import mongoose from "mongoose";

const athleteSchema = new mongoose.Schema({
  _id: String,
  weight: Number,
  gender: String,
  age: Number,
  height: Number,
  resting_heart_rate: Number,
  default_max_biking_heart_rate: Number,
  default_max_heart_rate: Number,
  functional_treshold_power: Number,
  max_heart_rate: Number,
});

module.exports = mongoose.model("Athlete", athleteSchema);
