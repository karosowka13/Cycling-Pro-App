import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	loading: false,
	error: null,
	statisticsData: {},
	success: false,
	TSS: {
		study: { value: 0, time: "" },
		exam: { value: 0, time: "" },
		race: { value: 0, time: "" },
		housework: { value: 0, time: "" },
		party: { value: 0, time: "" },
		journey: { value: 0, time: "" },
		shopping: { value: 0, time: "" },
		sickness: { value: 0, time: "" },
		workout: { value: 0, time: "" },
		concerns: { value: 0, time: "" },
		others: { value: 0, time: "" },
		comments: "",
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
		TSS: action.TSS,
	});
};

const fetchTSSSuccess = (state, action) => {
	return updateObject(state, {
		TSS: action.fetchedTSS,
	});
};

const removeTSSSuccess = (state, action) => {
	let updatedTSS = {
		study: { value: 0, time: "" },
		exam: { value: 0, time: "" },
		race: { value: 0, time: "" },
		housework: { value: 0, time: "" },
		party: { value: 0, time: "" },
		concerns: { value: 0, time: "" },
		journey: { value: 0, time: "" },
		shopping: { value: 0, time: "" },
		sickness: { value: 0, time: "" },
		workout: { value: 0, time: "" },
		others: { value: 0, time: "" },
	};
	return updateObject(state, {
		TSS: updatedTSS,
	});
};

const changeTSSValue = (state, action) => {
	let name = action.TSSData[0];
	let value = action.TSSData[1];
	let record = {};
	let updatedTSS = null;
	record[name] = { value: value, time: state.TSS[name].time };
	updatedTSS = updateObject(state.TSS, record);
	return updateObject(state, { TSS: updatedTSS });
};

const changeTSSTime = (state, action) => {
	let name = action.TSSData[0];
	let time = action.TSSData[1];
	let record = {};
	let updatedTSS = null;
	record[name] = { value: state.TSS[name].value, time: time };
	updatedTSS = updateObject(state.TSS, record);
	return updateObject(state, { TSS: updatedTSS });
};

const changeComment = (state, action) => {
	let updatedComments = updateObject(state.TSS, {
		comments: action.comment,
	});
	console.log(updatedComments);
	return updateObject(state, { TSS: updatedComments });
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
		case actionTypes.CHANGE_TSS_VALUE:
			return changeTSSValue(state, action);
		case actionTypes.CHANGE_TSS_TIME:
			return changeTSSTime(state, action);
		case actionTypes.CHANGE_COMMENTS:
			return changeComment(state, action);
		default:
			return state;
	}
};

export default reducer;
