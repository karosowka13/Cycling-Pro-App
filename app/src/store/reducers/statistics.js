import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	loading: false,
	error: null,
	statisticsData: {},
	success: false,
};

const fetchStatisticsStart = (state, action) => {
	return updateObject(state, { loading: true });
};

const fetchStatisticsSuccess = (state, action) => {
	return updateObject(state, {
		statisticsData: action.statistics,
		loading: false,
		success: true,
	});
};

const fetchStatisticsFail = (state, action) => {
	return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_STATISTICS_START:
			return fetchStatisticsStart(state, action);
		case actionTypes.FETCH_STATISTICS_SUCCESS:
			return fetchStatisticsSuccess(state, action);
		case actionTypes.FETCH_STATISTICS_FAIL:
			return fetchStatisticsFail(state, action);
		default:
			return state;
	}
};

export default reducer;
