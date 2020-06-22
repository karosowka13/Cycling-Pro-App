import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Athlete from "../models/athlete";

export const checkLogin = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}
	next();
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		let athlete = await Athlete.findOne({
			email,
		});
		if (!athlete)
			return res.status(400).json({
				message: "User Not Exist",
			});

		const isMatch = await bcrypt.compare(password, athlete.password);
		if (!isMatch)
			return res.status(400).json({
				message: "Incorrect Password !",
			});
		const localId = athlete._id;
		const expiresIn = 3600;
		const payload = {
			user: {
				id: athlete._id,
			},
		};
		jwt.sign(
			payload,
			"randomString",
			{
				expiresIn: 3600,
			},
			(err, token) => {
				if (err) throw err;
				res.status(200).json({
					token,
					localId,
					expiresIn,
				});
			}
		);
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: "Server Error",
		});
	}
};

export const checkSignup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}
	next();
};

export const getmyaccount = async (req, res, next) => {
	try {
		// request.user is getting fetched from Middleware after token authentication
		const athlete = await Athlete.findById(req.user.id);
		res.json(athlete);
	} catch (e) {
		res.send({ message: "Error in Fetching user" });
	}
};

export const createNewAthlete = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		let athlete = await Athlete.findOne({
			email,
		});
		if (athlete) {
			return res.status(400).json({
				msg: "User Already Exists",
			});
		}
		const newAthlete = new Athlete({ email, password });
		const salt = await bcrypt.genSalt(10);
		newAthlete.password = await bcrypt.hash(password, salt);
		await newAthlete.save();
		const localId = athlete._id;
		const expiresIn = 3600;
		const payload = {
			user: {
				id: newAthlete._id,
			},
		};
		jwt.sign(
			payload,
			"randomString",
			{
				expiresIn: 3600,
			},
			(err, token) => {
				if (err) throw err;
				res.status(200).json({
					token,
					localId,
					expiresIn,
				});
			}
		);
		res.json(newAthlete);
		next();
	} catch (err) {
		next(err);
	}
};
