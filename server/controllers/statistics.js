import Training from "../models/training";
import Athlete from "../models/athlete";
import mongoose, { Query } from "mongoose";

//TOTAL TSS, IF, distance, time, ascent, work
const query = {
	intensity_factor: 1,
	total_ascent: 1,
	total_calories: 1,
	totat_descent: 1,
	total_distance: 1,
	total_elapsed_time: 1,
	total_work: 1,
	training_stress_score: 1,
	_id: 0,
};
const groupBy = {
	_id: null,
	intensity_factor: { $sum: "$intensity_factor" },
	total_ascent: { $sum: "$total_ascent" },
	total_calories: { $sum: "$total_calories" },
	totat_descent: { $sum: "$totat_descent" },
	total_distance: { $sum: "$total_distance" },
	total_elapsed_time: { $sum: "$total_elapsed_time" },
	total_work: { $sum: "$total_work" },
	training_stress_score: { $sum: "$training_stress_score" },
};

export const getAllStatistics = async (req, res, next) => {
	try {
		const allStatistics = await Training.aggregate([
			{
				$match: {
					athlete_id: (req.params.athleteid),
				},
			},
			{ $project: query },
			{
				$group: groupBy,
			},
		]);
		res.json(allStatistics);
	} catch (err) {
		next(err);
	}
};

export const getWeekStatistics = async (req, res, next) => {
	try {
		const Statistics = await Training.aggregate([
			{
				$match: {
					athlete_id: (req.params.athleteid),
					time_created: {
						$gte: new Date(
							new Date({
								$subtract: [new Date().getTime(), 7 * 24 * 60 * 60 * 1000],
							}).setHours(0, 0, 0, 0)
						),
						$lte: new Date(),
					},
				},
			},
			{ $project: query },
			{
				$group: groupBy,
			},
		]);
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};

export const getMonthStatistics = async (req, res, next) => {
	try {
		const Statistics = await Training.aggregate([
			{
				$match: {
					athlete_id: (req.params.athleteid),
					time_created: {
						$gte: new Date(
							new Date({
								$subtract: [new Date().getTime(), 30 * 24 * 60 * 60 * 1000],
							}).setHours(0, 0, 0, 0)
						),
						$lte: new Date(),
					},
				},
			},
			{ $project: query },
			{
				$group: groupBy,
			},
		]);
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};

export const getYearStatistics = async (req, res, next) => {
	try {
		const Statistics = await Training.aggregate([
			{
				$match: {
					athlete_id: (req.params.athleteid),
					time_created: {
						$gte: new Date(
							new Date({
								$subtract: [new Date().getTime(), 365 * 24 * 60 * 60 * 1000],
							}).setHours(0, 0, 0, 0)
						),
						$lte: new Date(),
					},
				},
			},
			{ $project: query },
			{
				$group: groupBy,
			},
		]);
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};

export const getOnloadStatistics = async (req, res, next) => {
	try {

		const Week = await Training.aggregate([
			{
				$match: {
					athlete_id: (req.params.athleteid),
					time_created: {
						$gte: new Date(
							new Date({
								$subtract: [new Date().getTime(), 7 * 24 * 60 * 60 * 1000],
							}).setHours(0, 0, 0, 0)
						),
						$lte: new Date(),
					},
				},
			},
			{ $project: query },
			{
				$group: groupBy,
			},
		]);
		const Month = await Training.aggregate([
			{
				$match: {
					athlete_id: (req.params.athleteid),
					time_created: {
						$gte: new Date(
							new Date({
								$subtract: [new Date().getTime(), 30 * 24 * 60 * 60 * 1000],
							}).setHours(0, 0, 0, 0)
						),
						$lte: new Date(),
					},
				},
			},
			{ $project: query },
			{
				$group: groupBy,
			},
		]);
		const Statistics = { week: Week, month: Month };
		res.json(Statistics);
	} catch (err) {
		next(err);
	}
};
