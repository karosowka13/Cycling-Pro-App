import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import athletesRoute from "./routes/athlets";
import trainingDataRoute from "./routes/trainingData";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.raw());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  return res.send("Hello Server");
});

//get training data from device
app.use("/api/v1", trainingDataRoute);
//create athlete
app.use("/api/v1", athletesRoute);

app.listen(8000, function () {
  console.log("App running on port 8000");
});
