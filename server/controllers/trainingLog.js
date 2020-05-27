import { errorMessage, successMessage, status } from "../helpers/status";
import Training from "../models/training";
import Training2 from "../models/training2";

export const createTraining = async (req, res) => {
  console.log(res.locals.data, "data in mongo schema");
  const training = res.locals.data;
  try {
    const newTraining = await training.save();
    res.send(JSON.stringify(newTraining));
  } catch (err) {
    console.log(err);
    res.status(err.response.status);
    return res.send(err.message);
    //res.send(JSON.stringify(err));
  }
};

// export const getAllTrainings = async (req, res) => {
//   try {
//     const trainings = await Training.find();
//     res.json(trainings);
//   } catch (err) {
//     res.status(status.bad).json({ errorMessage });
//   }
// };
