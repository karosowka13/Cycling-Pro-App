import modelQuery from "../models/modelQuery";
import { errorMessage, successMessage, status } from "../helpers/status";
import { isEmpty } from "../helpers/validation";

export const createAthlete = async (req, res) => {
  console.log(req.body.athlete_id);
  const athlete_id = req.body.athlete_id;
  if (isEmpty(athlete_id)) {
    errorMessage.error = "Athlete id cannot be empty";
    return res.status(status.bad).send(errorMessage);
  }
  const creatAthletQuery =
    "INSERT INTO athletes (athlete_id) VALUES ($1) returning *";
  const values = [athlete_id];
  try {
    const { rows } = await modelQuery.query(creatAthletQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

export const deleteAthlete = async (req, res) => {
  const athlete_id = req.body.athlete_id;
  if (isEmpty(athlete_id)) {
    errorMessage.error = "No athlete id to delete";
    return res.status(status.bad).send(errorMessage);
  }
  const deleteAthletQuery =
    "DELETE FROM athletes WHERE athlete_id=($1) returning *";
  const values = [athlete_id];
  try {
    const { rows } = await modelQuery.query(deleteAthletQuery, values);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = "There is no athlete with that id";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};
