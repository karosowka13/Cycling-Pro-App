import express from "express";

import {
  rawTrainingData,
  convertToDB,
} from "../controllers/traningDataController";

var router = express.Router();
router.post("/upload", rawTrainingData);
export default router;
