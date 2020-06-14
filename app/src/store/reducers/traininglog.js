import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	loading: false,
	error: null,
	trainings: [],
	success: false,
	successFetch: false,
};

const traininglogStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const traininglogSuccess = (state, action) => {
	return updateObject(state, {
		trainings: Object.assign(state.trainings, action.trainings),
		error: null,
		loading: false,
		success: true,
	});
};

const traininglogFail = (state, action) => {
	return updateObject(state, { error: action.error, loading: false });
};

const fetchTrainingsStart = (state, action) => {
	return updateObject(state, { loading: true });
};

const fetchTrainingsSuccess = (state, action) => {
	return updateObject(state, {
		trainings: action.trainings,
		loading: false,
		successFetch: true,
	});
};

const fetchTrainingsFail = (state, action) => {
	return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TRAININGLOG_START:
			return traininglogStart(state, action);
		case actionTypes.TRAININGLOG_SUCCESS:
			return traininglogSuccess(state, action);
		case actionTypes.TRAININGLOG_FAIL:
			return traininglogFail(state, action);
		case actionTypes.FETCH_TRAININGS_START:
			return fetchTrainingsStart(state, action);
		case actionTypes.FETCH_TRAININGS_SUCCESS:
			return fetchTrainingsSuccess(state, action);
		case actionTypes.FETCH_TRAININGS_FAIL:
			return fetchTrainingsFail(state, action);
		default:
			return state;
	}
};

export default reducer;
