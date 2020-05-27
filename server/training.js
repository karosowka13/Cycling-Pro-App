const FitParser = require("./node_modules/fit-file-parser/dist/fit-parser")
  .default;
fs = require("fs");

fs.readFile("./public/fitfile.fit", function (err, content) {
  // Create a FitParser instance
  const fitParser = new FitParser({
    force: true,
    speedUnit: "km/h",
    lengthUnit: "km",
    temperatureUnit: "celsius",
    elapsedRecordField: true,
    mode: "both", //gets whole training and laps
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
      fs.writeFileSync(
        "./public/fitParser.json",
        JSON.stringify(data),
        (err) => {
          if (err) {
            console.log("Error writing file", err);
          } else {
            console.log("Successfully wrote file");
          }
        }
      );
    }
  });
});
