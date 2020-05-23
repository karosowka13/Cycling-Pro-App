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
  return (dispatch) => {
    dispatch(traininglogStart());

    // let trainingLogData = trainingLog;
    // let arrayBuffer = [];
    // var fr = new FileReader();
    // const trainingLogObj = {};
    // fr.onload = () => {
    //   const data = fr.result;
    //   arrayBuffer = new Int8Array(data);
    //   SportsLib.importFromFit(arrayBuffer).then((event) => {
    //     let trainingLog = event.stats;
    //     for (let [key, value] of trainingLog) {
    //       trainingLogObj[key] = value;
    //     }
    //     return trainingLogObj;
    //   });
    //   callback(trainingLogObj);
    // };
    // fr.readAsArrayBuffer(trainingLogData);
    const log = new FormData();
    // log.append("file", trainingLog);
    log.append("file", trainingLog);
    console.log(log, trainingLog.name);
    axios
      .post("http://localhost:8000/upload", log)
      .then((response) => {
        console.log(response);
        dispatch(traininglogSuccess(response.data.stats));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          traininglogFail(err.response.data.error || "Unexpected error")
        );
      });
  };
};
