import modelQuery from "../models/modelQuery";
import { errorMessage, successMessage, status } from "../helpers/status";
import { isNumber } from "../helpers/validation";

export const createMetrics = async (req, res) => {
  const { age, gender, weight, height, athlete_id } = req.body;
  if (isEmpty(weight, height, gender, athlete_id)) {
    errorMessage.error = "Athlete and number metrics id cannot be empty";
    return res.status(status.bad).send(errorMessage);
  }
  if (!isNumber(age, weight, height)) {
    errorMessage.error = "Age, weight, height must be a number";
    return res.status(status.bad).send(errorMessage);
  }

  const createMetricsQuery =
    "INSERT INTO metrics (age, gender, weight, height)VALUES ($1, $2, $3, $4) WHERE athlete_id=$5 returning *";
  const values = [age, gender, weight, height, athlete_id];
  try {
    const { rows } = await modelQuery.query(createMetricsQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

export const updateMetrics = async (req, res) => {
  const { age, gender, weight, height, athlete_id } = req.body;
  if (!isNumber(age, weight, height)) {
    errorMessage.error = "Age, weight, height must be a number";
    return res.status(status.bad).send(errorMessage);
  }
  const findMetricsQuery = "SELECT * FROM metrics WHERE athlete_id=$5"
  const updateMetricsQuery =
    "UPDATE metrics SET (age, gender, weight, height) VALUES($1, $2, $3, $4) WHERE athlete_id=$5 returning *";
  const values = [age, gender, weight, height, athlete_id];
  try {
    const { rows } = await modelQuery.query(findMetricsQuery, [athlete_id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'Athlete cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }
    const values = [age, gender, weight, height, athlete_id];
    const response = await dbQuery.query(updateMetricsQuery, values);
    const dbResult = response.rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

export const deleteMetrics =async (req, res) => {
  const {athlete_id }= req.body;
  const deleteMetricsQuery = "DELETE * FROM metrics WHERE athlete_id=$1 returning *"
  try {
    const { rows } = await modelQuery.query(deleteMetricsQuery, [athlete_id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'Athlete cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = {}
    successMessage.data.message = "Metrics where deleted sucessfully";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

export const createPower
export const updatePower
export const deletePower

export const createHR
export const updateHR
export const deleteHR