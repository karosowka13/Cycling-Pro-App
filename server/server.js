import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

import uploadRoute from "./routes/upload";
import athleteRoute from "./routes/athlete";
import trainingRoute from "./routes/training";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.raw());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
	return res.send("Hello Server");
});

//trainingdata
app.use("/api/upload", uploadRoute);
//athletes
app.use("/api/athletes", athleteRoute);
//trainings
app.use("/api/athletes/:athleteid/trainings", trainingRoute);

app.listen(process.env.PORT, function () {
	console.log("App running on port 8000");
});

connectDB();
mongoose.Promise = global.Promise;
