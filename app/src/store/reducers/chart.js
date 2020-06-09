import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	loading: false,
	error: null,
	records: [],
	success: false,
};

const createChartStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const createChartSuccess = (state, action) => {
	return updateObject(state, {
		records: action.records,
		error: null,
		loading: false,
		success: true,
	});
};

const createChartFail = (state, action) => {
	return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CREATE_CHART_START:
			return createChartStart(state, action);
		case actionTypes.CREATE_CHART_SUCCESS:
			return createChartSuccess(state, action);
		case actionTypes.CREATE_CHART_FAIL:
			return createChartFail(state, action);
		default:
			return state;
	}
};

export default reducer;
