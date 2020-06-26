import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

import verifyToken from "./controllers/verifyToken";
import uploadRoute from "./routes/upload";
import athleteRoute from "./routes/athlete";
import trainingRoute from "./routes/training";
import statisticsRoute from "./routes/statistics";
import recordsRoute from "./routes/records";
import authRoute from "./routes/auth";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.raw());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
	return res.send("Hello Server");
});

//not secure route to login/signup
app.use("/api/auth", authRoute);
//trainingdata
app.use("/api/upload", verifyToken, uploadRoute);
//athletes
app.use("/api/athletes", verifyToken, athleteRoute);
//trainings
app.use("/api/athletes/:athleteid/trainings", verifyToken, trainingRoute);
//statistics
app.use("/api/athletes/:athleteid/statistics", verifyToken, statisticsRoute);
//records
app.use("/api/records", verifyToken, recordsRoute);

app.listen(process.env.PORT, function () {
	console.log("App running on port 8000");
});

connectDB();
mongoose.Promise = global.Promise;
