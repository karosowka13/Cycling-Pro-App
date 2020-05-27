import express from "express";

import { createAthlete, deleteAthlete } from "../controllers/athletes";
const router = express.Router();
router.post("/athletes", createAthlete);
router.post("/athletes_id", deleteAthlete);
export default router;
