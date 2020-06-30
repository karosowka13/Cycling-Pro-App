import express from "express";
import {
	createNewAthlete,
	login,
	checkLogin,
	checkSignup,
} from "../controllers/auth";
import { check } from "../../dist/node_modules/express-validator";

const router = express.Router();

router.post(
	"/signup",
	[
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Please enter a valid password").isLength({
			min: 6,
		}),
	],
	checkSignup,
	createNewAthlete
); //sign up
router.post(
	"/login",
	[
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Please enter a valid password").isLength({
			min: 6,
		}),
	],
	checkLogin,
	login
); //log in

router.get("/myaccount"); //get account

export default router;
