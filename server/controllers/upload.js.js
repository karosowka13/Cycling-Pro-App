import { errorMessage, successMessage, status } from "../helpers/status";
import Training from "../models/training";
import Athlete from "../models/athlete";
import Statistics from "../models/statistics";
import Records from "../models/records";
import multer from "multer";
import { fileFilter } from "../helpers/validation";

const FitParser = require("../node_modules/fit-file-parser/dist/fit-parser")
  .default;

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("file");

const fitParser = new FitParser({
  force: true,
  speedUnit: "km/h",
  lengthUnit: "km",
  temperatureUnit: "celsius",
  elapsedRecordField: true,
  mode: "both",
});

export const rawTrainingData = (req, res, next) => {
  upload(req, res, (err) => {
    if (req.fileValidationError) {
      return res.end(res.writeHead(415, req.fileValidationError));
    } else if (!req.file) {
      return res.end(res.writeHead(404, "Please select a file to upload"));
    } else if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
      // A Multer error occurred when uploading.
    } else if (err) {
      return res.status(500).json(err);
      // An unknown error occurred when uploading.
    }
    let encodedData = null;
    fitParser.parse(req.file.buffer, (err, data) => {
      // Handle result of parse method
      if (err) {
        console.log(err);
      }
      encodedData = data;
    });
    res.locals.data = encodedData;
    next();
  });
  res.locals.athleteId = req.headers.user;
};

export const createTraining = async (req, res) => {
  let allData = res.locals.data;
  let athleteId = { _id: res.locals.athleteId };

  let neededForAthlete = [
    "age",
    "gender",
    "height",
    "weight",
    "default_max_heart_rate",
    "default_max_biking_heart_rate",
    "resting_heart_rate",
    "max_heart_rate",
    "functional_threshold_power",
  ];
  let userData = {};
  Object.keys(allData.user_profile)
    .filter((key) => !neededForAthlete.includes(key))
    .forEach((key) => delete allData.user_profile[key]);

  Object.keys(allData.zones_target)
    .filter((key) => !neededForAthlete.includes(key))
    .forEach((key) => delete allData.zones_target[key]);

  Object.assign(
    userData,
    athleteId,
    allData.user_profile,
    allData.zones_target
  );
  const athlete = new Athlete(userData);

  let statisticsData = {};
  let neededForStatistics = [
    "avg_cadence",
    "avg_heart_rate",
    "avg_power",
    "avg_speed",
    "intensity_factor",
    "max_cadence",
    "max_heart_rate",
    "max_power",
    "max_speed",
    "normalized_power",
    "total_ascent",
    "total_calories",
    "total_cycles",
    "total_descent",
    "total_distance",
    "total_elapsed_time",
    "total_timer_time",
    "total_work",
    "training_stress_score",
  ];
  Object.keys(allData.sessions[0])
    .filter((key) => !neededForStatistics.includes(key))
    .forEach((key) => delete allData.sessions[0][key]);
  Object.assign(statisticsData, allData.sessions[0]);
  const statistics = new Statistics(statisticsData);

  let neededForTraining = ["time_created", "name", "sport", "created_at"];
  let trainingData = {};
  Object.keys(allData.sport)
    .filter((key) => !neededForTraining.includes(key))
    .forEach((key) => delete allData.sport[key]);

  Object.keys(allData.file_id)
    .filter((key) => !neededForTraining.includes(key))
    .forEach((key) => delete allData.file_id[key]);
  Object.assign(
    trainingData,
    { athleteId: athlete._id },
    allData.sport,
    allData.file_id
  );
  const training = new Training(trainingData);

  let neededForRecords = [
    "timestamp",
    "elapsed_time",
    "timer_time",
    "position_lat",
    "position_long",
    "distance",
    "accumulated_power",
    "altitude",
    "speed",
    "power",
    "heart_rate",
    "cadence",
    "temperature",
  ];

  allData.records.forEach((record) => {
    Object.keys(record)
      .filter((key) => !neededForRecords.includes(key))
      .forEach((key) => delete record[key]);
    Object.assign(record, { statistics: training._id });
  });
  let recordsData = allData.records;

  // let lapRecords ={}
  // allData.laps.records.forEach((record) => {
  //   Object.keys(record)
  //     .filter((key) => !neededForRecords.includes(key))
  //     .forEach((key) => delete record[key]);
  //   Object.assign(record, { statistics: training._id });
  // });

  // let laps = {};
  // let neededForLaps = [
  //   "avg_cadence",
  //   "avg_heart_rate",
  //   "avg_power",
  //   "avg_speed",
  //   "end_position_lat",
  //   "end_position_long",
  //   "max_cadence",
  //   "max_heart_rate",
  //   "max_power",
  //   "max_speed",
  //   "normalized_power",
  //   "start_time",
  //   "total_ascent",
  //   "total_calories",
  //   "total_descent",
  //   "total_distance",
  //   "total_elapsed_time",
  //   "total_timer_time",
  //   "total_work",
  // ];
  // allData.laps.forEach((lap) => {
  //   Object.keys(key)
  //     .filter((key) => !neededForLaps.includes(key))
  //     .forEach((key) => delete lap[key]);
  //   Object.assign(laps, { training_id: training._id });
  // });

  try {
    let queryAthlete = { $set: athlete };
    let options = {
      useFindAndModify: false,
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };
    await Athlete.findByIdAndUpdate(athleteId, queryAthlete, options);

    await training.save();

    const newStatistics = await Training.findByIdAndUpdate(
      training._id,
      { $push: { statistics: statisticsData } },
      { new: true, useFindAndModify: false }
    );

    await Records.insertMany(recordsData);

    res.send(JSON.stringify(newStatistics));
  } catch (err) {
    res.status(400).send(err);
  }
};