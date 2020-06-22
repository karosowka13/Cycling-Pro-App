import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	loading: false,
	error: null,
	statisticsData: {},
	success: false,
	TSS: {
		date: "",
		race: { value: "", time: "" },
		study: { value: "", time: "" },
		exam: { value: "", time: "" },
		race: { value: "", time: "" },
		housework: { value: "", time: "" },
		party: { value: "", time: "" },
		concerns: { value: "", time: "" },
		journey: { value: "", time: "" },
		shopping: { value: "", time: "" },
		sickness: { value: "", time: "" },
		workout: { value: "", time: "" },
		stress: { value: "", time: "" },
		others: { value: "", time: "" },
	},
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

const addTSSSuccess = (state, action) => {
	return updateObject(state, {
		TSS: TSS,
	});
};
const fetchTSSSuccess = (state, action) => {
	return updateObject(state, {
		TSS: TSS,
	});
};
const removeTSSSuccess = (state, action) => {
	return updateObject(state, {
		TSS: TSS,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_STATISTICS_START:
			return fetchStatisticsStart(state, action);
		case actionTypes.FETCH_STATISTICS_SUCCESS:
			return fetchStatisticsSuccess(state, action);
		case actionTypes.FETCH_STATISTICS_FAIL:
			return fetchStatisticsFail(state, action);
		case actionTypes.FETCH_TSS_SUCCESS:
			return fetchTSSSuccess(state, action);
		case actionTypes.ADD_TSS_SUCCESS:
			return addTSSSuccess(state, action);
		case actionTypes.REMOVE_TSS_SUCCESS:
			return removeTSSSuccess(state, action);
		default:
			return state;
	}
};

export default reducer;
