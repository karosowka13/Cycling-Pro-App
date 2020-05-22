import * as actionTypes from "./actionTypes";
import axios from "axios";
import { SportsLib } from "@sports-alliance/sports-lib";

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
  return (dispatch, callback) => {
    dispatch(traininglogStart());
    let trainingLogData = trainingLog;
    let arrayBuffer = [];
    var fr = new FileReader();
    const trainingLogObj = {};
    fr.onload = () => {
      const data = fr.result;
      arrayBuffer = new Int8Array(data);
      SportsLib.importFromFit(arrayBuffer).then((event) => {
        let trainingLog = event.stats;
        for (let [key, value] of trainingLog) {
          trainingLogObj[key] = value;
        }
        return trainingLogObj;
      });
      callback(trainingLogObj);
    };
    fr.readAsArrayBuffer(trainingLogData);
    let user = { userId: userId };
    Object.assign(trainingLogObj, user)
      .post(
        "https://cycling-pro-app.firebaseio.com/trainingLog.json",
        trainingLogObj
      )
      .then((response) => {
        dispatch(traininglogSuccess(response.data.stats));
      })
      .catch((err) => {
        dispatch(
          traininglogFail(err.response.data.error || "Unexpected error")
        );
      });
  };
};
