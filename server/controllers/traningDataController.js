import multer from "multer";
import { fileFilter } from "../helpers/validation";
const FitParser = require("../node_modules/fit-file-parser/dist/fit-parser")
  .default;

export const rawTrainingData = (req, res, next) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  }).single("file");
  let trainingJSONData = upload(req, res, (err) => {
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
    delete req.file.fieldname;
    let training_data_JSON = encodeToJSON(req.file);
    res.locals.data = training_data_JSON;
    console.log("before", training_data_JSON.time, "after_return_toREQ");
    return req.file.buffer, res.status(200).send(req.file), next();
    // Everything went fine.
  });
  console.log(trainingJSONData, "data to send");
  console.log(res.locals.data, "response");
  return res.locals.data;
};

const encodeToJSON = (req) => {
  // Create a FitParser instance (options argument is optional)
  const fitParser = new FitParser({
    force: true,
    speedUnit: "km/h",
    lengthUnit: "km",
    temperatureUnit: "celsius",
    elapsedRecordField: true,
    mode: "both",
  });
  let trainingParse = null;
  // Parse your file
  fitParser.parse(req.buffer, function (error, data) {
    // Handle result of parse method
    if (error) {
      console.log(error);
    }
    trainingParse = JSON.stringify(data);
  });
  return trainingParse;
};
