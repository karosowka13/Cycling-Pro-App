import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  trainingLog: null,
  loading: false,
  error: null,
};

const traininglogStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const traininglogSuccess = (state, action) => {
  return updateObject(state, {
    trainingLog: action.trainingLogData,
    error: null,
    loading: false,
  });
};

const traininglogFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRAININGLOG_START:
      return traininglogStart(state, action);
    case actionTypes.TRAININGLOG_SUCCESS:
      return traininglogSuccess(state, action);
    case actionTypes.TRAININGLOG_FAIL:
      return traininglogFail(state, action);
    default:
      return state;
  }
};

export default reducer;
