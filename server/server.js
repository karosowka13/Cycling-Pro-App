const express = require("express");
const cors = require("cors");
const trainingData = require("./controllers/traningDataController");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const db = require("./helpers/queries");

app.use(cors());
//app.use(formData.parse());
app.use(bodyParser.raw());

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  return res.send("Hello Server");
});

app.post("/upload", trainingData.rawTrainingData);

app.listen(8000, function () {
  console.log("App running on port 8000");
});

app.get("/userid", db.getAthletId);
app.delete("/userid/:id", db.deleteAthlete);
app.post("/userid", db.createAthlete);
