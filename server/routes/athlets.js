import express from "express";

import { createAthlete } from "../controllers/athletes";

var router = express.Router();
router.post("/athlet", createAthlete);
export default router;
