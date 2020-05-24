import * as actionTypes from "./actionTypes";
import axios from "axios";

export const traininglogStart = () => {
  return {
    type: actionTypes.TRAININGLOG_START,
  };
};

export const traininglogSuccess = (trainingLog) => {
  return {
    type: actionTypes.TRAININGLOG_SUCCESS,
    trainingLog: trainingLog,
  };
};

export const traininglogFail = (error) => {
  return {
    type: actionTypes.TRAININGLOG_FAIL,
    error: error,
  };
};

export const loadTraininglog = (trainingLog, userId) => {
  return (dispatch) => {
    dispatch(traininglogStart());
    const log = new FormData();
    log.append("file", trainingLog);
    console.log(log, trainingLog.name);
    axios
      .post("http://localhost:8000/upload", log, {
        headers: { user: userId },
      })
      .then((response) => {
        console.log(response);
        dispatch(traininglogSuccess(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          traininglogFail(err.response.data.error || "Unexpected error")
        );
      });
  };
};
