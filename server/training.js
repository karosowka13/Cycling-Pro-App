const FitParser = require("./node_modules/fit-file-parser/dist/fit-parser")
  .default;
const EasyFit = require("./node_modules/parse-fit/dist/easy-fit").default;
const SportsLib = require("./node_modules/@sports-alliance/sports-lib/lib/index")
  .SportsLib;
fs = require("fs");
//const fit = require("fit");
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

// export const convertToDB = (req, res, next) => {
//   const fitFileBuffer = fs.readFileSync("../public/fitfile.fit");

//   fit.parse(fitFileBuffer, (err, data) => {
//     if (err) {
//       console.log(error);
//     } else {
//       console.log(data);
//       res.status(200).send(data);
//     }
//   });
//   next();
// };

fs.readFile("./public/fitfile.fit", function (err, content) {
  // Create a FitParser instance (options argument is optional)
  const fitParser = new FitParser({
    force: true,
    speedUnit: "km/h",
    lengthUnit: "km",
    temperatureUnit: "celsius",
    elapsedRecordField: true,
    mode: "both",
  });

  // Parse your file
  fitParser.parse(content, function (error, data) {
    // Handle result of parse method
    if (error) {
      console.log(error);
    } else {
      // const stream = fs.createWriteStream("./public/file2.json");
      // stream.once("open", function (fd) {
      //   stream.write((data));
      //   stream.end();
      fs.writeFileSync("./public/file2.json", JSON.stringify(data), (err) => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("Successfully wrote file");
        }
      });
    }
  });
});
