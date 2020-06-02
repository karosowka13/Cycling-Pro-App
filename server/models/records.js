import mongoose, { Schema } from "mongoose";
const recordsSchema = new Schema({
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
  training_id: { type: Schema.Types.ObjectId, ref: "Training" },
});
module.exports = mongoose.model("Records", recordsSchema);
