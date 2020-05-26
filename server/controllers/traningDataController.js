import multer from ("multer")
import { fileFilter } from "../helpers/validation";
const FitParser = require("../node_modules/fit-file-parser/dist/fit-parser")
  .default.default;
const EasyFit = require("../node_modules/parse-fit/dist/easy-fit").default;
const SportsLib = require("../node_modules/@sports-alliance/sports-lib/lib/index")
  .SportsLib;

export const rawTrainingData = (req, res, next) => {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  }).single("file");

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
    return console.log(req.file), res.status(200).send(req.file);
    // Everything went fine.
  });
  next();
};

// const convertToDB = (req, res, next) => {
//   // Require the module

//   // Read a .FIT file
//   fs.readFile("../public/fitfile.fit", function (err, content) {
//     // Create a EasyFit instance (options argument is optional)
//     var easyFit = new EasyFit({
//       force: true,
//       speedUnit: "km/h",
//       lengthUnit: "km",
//       temperatureUnit: "kelvin",
//       elapsedRecordField: true,
//       mode: "cascade",
//     });

//     // Parse your file
//     easyFit.parse(content, function (error, data) {
//       // Handle result of parse method
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(JSON.stringify(data));
//       }
//     });
//   });
//   next();
// };

// const convertToDB = (req, res, next) => {
//   fs.readFile("../public/fitfile.fit", function (err, content) {
//     // Create a FitParser instance (options argument is optional)
//     var fitParser = new FitParser({
//       force: true,
//       speedUnit: "km/h",
//       lengthUnit: "km",
//       temperatureUnit: "celsius",
//       elapsedRecordField: true,
//       mode: "both",
//     });

//     // Parse your file
//     fitParser.parse(content, function (error, data) {
//       // Handle result of parse method
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(JSON.stringify(data));
//         res.status(200).send(data);
//       }
//     });
//   });
//   next();
// };

// const fit = require("fit");

export const convertToDB = (req, res, next) => {
  const fitFileBuffer = fs.readFileSync("../public/fitfile.fit");

  fit.parse(fitFileBuffer, (err, data) => {
    if (err) {
      console.log(error);
    } else {
      console.log(data);
      res.status(200).send(data);
    }
  });
  next();
};
