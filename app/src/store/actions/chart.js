import * as actionTypes from "./actionTypes";
import axios from "axios";

export const createChartStart = () => {
	return {
		type: actionTypes.CREATE_CHART_START,
	};
};

export const createChartSuccess = (records) => {
	return {
		type: actionTypes.CREATE_CHART_SUCCESS,
		records: records,
	};
};

export const createChartFail = (error) => {
	return {
		type: actionTypes.CREATE_CHART_FAIL,
		error: error,
	};
};

export const loadChartData = (trainingId) => {
	return (dispatch) => {
		dispatch(createChartStart());
		axios
			.get(process.env.REACT_APP_SERVER + "/api/records/" + trainingId)
			.then((response) => {
				console.log(response);
				dispatch(createChartSuccess(response.data[0].details));
			})
			.catch((err) => {
				console.log(err);
				dispatch(createChartFail(err.response.data || "Unexpected error"));
			});
	};
};