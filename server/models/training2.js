import mongoose from "mongoose";

const trainingSchema2 = new mongoose.Schema({
  file_id: {
    time_created: { type: "Date" },
    manufacturer: { type: "Number" },
    product: { type: "Number" },
    number: { type: "Number" },
  },
  file_creator: { software_version: { type: "Number" } },
  device_settings: {
    utc_offset: { type: "Number" },
    time_offset: { type: "Number" },
    active_time_zone: { type: "Number" },
    time_zone_offset: { type: "Number" },
  },
  user_profile: {
    friendly_name: { type: "String" },
    weight: { type: "Number" },
    gender: { type: "String" },
    age: { type: "Number" },
    height: { type: "Number" },
    language: { type: "String" },
    elev_setting: { type: "String" },
    weight_setting: { type: "String" },
    resting_heart_rate: { type: "Number" },
    default_max_biking_heart_rate: { type: "Number" },
    default_max_heart_rate: { type: "Number" },
    hr_setting: { type: "String" },
    speed_setting: { type: "String" },
    dist_setting: { type: "String" },
    power_setting: { type: "String" },
    position_setting: { type: "String" },
    temperature_setting: { type: "String" },
  },
  sport: {
    name: { type: "String" },
    sport: { type: "String" },
    sub_sport: { type: "String" },
  },
  zones_target: {
    functional_threshold_power: { type: "Number" },
    max_heart_rate: { type: "Number" },
    pwr_calc_type: { type: "String" },
  },
  activity: {
    sessions: { type: "Array" },
    events: { type: ["Mixed"] },
    hrv: { type: ["Mixed"] },
  },
  sessions: { type: "Array" },
  laps: { type: "Array" },
  records: { type: ["Mixed"] },
  events: { type: ["Mixed"] },
  device_infos: { type: ["Mixed"] },
  developer_data_ids: { type: "Array" },
  field_descriptions: { type: "Array" },
  hrv: { type: ["Mixed"] },
  dive_gases: { type: "Array" },
  course_points: { type: "Array" },
});

module.exports = mongoose.model("Training2", trainingSchema2);
